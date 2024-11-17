"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = require("../scraper");
describe('Coinbase Blog Scraper', () => {
    jest.setTimeout(30000); // Increase timeout for Puppeteer
    it('should scrape articles from Coinbase Blog', async () => {
        const articles = await (0, scraper_1.scrapeCoinbaseBlog)();
        expect(articles).toBeInstanceOf(Array);
        expect(articles.length).toBeGreaterThan(0);
    });
});
