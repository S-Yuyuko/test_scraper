import { scrapeCoinbaseBlog } from '../scraper';

describe('Coinbase Blog Scraper', () => {
  jest.setTimeout(30000); // Increase timeout for Puppeteer

  it('should scrape articles from Coinbase Blog', async () => {
    const articles = await scrapeCoinbaseBlog();
    expect(articles).toBeInstanceOf(Array);
    expect(articles.length).toBeGreaterThan(0);
  });
});
