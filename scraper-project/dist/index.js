"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const scraper_1 = require("./scraper");
const app = (0, express_1.default)();
const port = 4000;
app.use((0, cors_1.default)());
// Store previously fetched articles
let previousArticles = new Set();
let scrapedData = { landingPages: [], otherPages: [] };
app.get('/scraped-content', async (req, res, next) => {
    try {
        // Perform scraping
        const articles = await (0, scraper_1.scrapeCoinbaseBlog)();
        // If `previousArticles` is empty, treat all articles as new
        if (previousArticles.size === 0) {
            articles.forEach((article) => previousArticles.add(article));
            scrapedData = {
                landingPages: articles.filter((article) => article.includes('/landing/')),
                otherPages: articles.filter((article) => !article.includes('/landing/')),
            };
            res.json({
                message: 'Initial run: All articles added.',
                newArticles: scrapedData,
                previousData: scrapedData,
            });
            return; // Explicitly exit the function after responding
        }
        // Separate new articles
        const newArticles = articles.filter((article) => !previousArticles.has(article));
        newArticles.forEach((article) => previousArticles.add(article)); // Update previousArticles set
        // Separate new articles into landing and other pages
        const landingPages = newArticles.filter((article) => article.includes('/landing/'));
        const otherPages = newArticles.filter((article) => !article.includes('/landing/'));
        // Update scrapedData with both new and previous articles
        const previousLandingPages = scrapedData.landingPages;
        const previousOtherPages = scrapedData.otherPages;
        scrapedData = {
            landingPages: [...previousLandingPages, ...landingPages],
            otherPages: [...previousOtherPages, ...otherPages],
        };
        res.json({
            message: newArticles.length > 0 ? 'New articles found' : 'No new articles found',
            newArticles: { landingPages, otherPages },
            previousData: scrapedData,
        });
    }
    catch (error) {
        console.error('Error scraping data:', error);
        next(error); // Pass the error to the error-handling middleware
    }
});
// Error-handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});
app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
