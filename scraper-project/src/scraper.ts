import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { scraperApiBaseUrl, coinbaseBlogBaseUrl, coinbaseBaseUrl } from './config';

puppeteer.use(StealthPlugin());

export const scrapeCoinbaseBlog = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  try {
    console.log('Navigating to target URL...');
    const targetUrl = `${scraperApiBaseUrl}${encodeURIComponent(coinbaseBlogBaseUrl)}`;
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    console.log('Page loaded. Waiting for selector...');

    await page.waitForSelector('[data-qa^="Wayfinding-Child"]', { timeout: 10000 });
    console.log('Selector found. Extracting articles...');

    // Scrape articles and append the correct base URL
    const articles = await page.evaluate((baseUrl) => {
      return Array.from(document.querySelectorAll('[data-qa^="Wayfinding-Child"]')).map((el) => {
        const anchor = el as HTMLAnchorElement;
        const relativeUrl = anchor.getAttribute('href');
        // Ensure the URL is absolute
        return relativeUrl ? `${baseUrl}${relativeUrl}` : '';
      });
    }, coinbaseBaseUrl); // Pass coinbaseBaseUrl (e.g., "https://www.coinbase.com")

    // Remove duplicates by converting to a Set and back to an array
    const uniqueArticles = Array.from(new Set(articles));

    console.log('Unique Scraped Articles:', uniqueArticles);
    return uniqueArticles;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error during scraping:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
    return [];
  } finally {
    await browser.close();
  }
};
