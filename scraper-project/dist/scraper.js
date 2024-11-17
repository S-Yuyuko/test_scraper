"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeCoinbaseBlog = void 0;
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
const config_1 = require("./config");
puppeteer_extra_1.default.use((0, puppeteer_extra_plugin_stealth_1.default)());
const scrapeCoinbaseBlog = async () => {
    const browser = await puppeteer_extra_1.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    try {
        console.log('Navigating to target URL...');
        const targetUrl = `${config_1.scraperApiBaseUrl}${encodeURIComponent(config_1.coinbaseBlogBaseUrl)}`;
        await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });
        console.log('Page loaded. Waiting for selector...');
        await page.waitForSelector('[data-qa^="Wayfinding-Child"]', { timeout: 10000 });
        console.log('Selector found. Extracting articles...');
        // Scrape articles and append the correct base URL
        const articles = await page.evaluate((baseUrl) => {
            return Array.from(document.querySelectorAll('[data-qa^="Wayfinding-Child"]')).map((el) => {
                const anchor = el;
                const relativeUrl = anchor.getAttribute('href');
                // Ensure the URL is absolute
                return relativeUrl ? `${baseUrl}${relativeUrl}` : '';
            });
        }, config_1.coinbaseBaseUrl); // Pass coinbaseBaseUrl (e.g., "https://www.coinbase.com")
        // Remove duplicates by converting to a Set and back to an array
        const uniqueArticles = Array.from(new Set(articles));
        console.log('Unique Scraped Articles:', uniqueArticles);
        return uniqueArticles;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error during scraping:', error.message);
        }
        else {
            console.error('Unknown error occurred:', error);
        }
        return [];
    }
    finally {
        await browser.close();
    }
};
exports.scrapeCoinbaseBlog = scrapeCoinbaseBlog;
