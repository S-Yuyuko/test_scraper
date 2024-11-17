import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { scrapeCoinbaseBlog } from './scraper';

const app = express();
const port = 4000;

app.use(cors());

interface ScrapedData {
  landingPages: string[];
  otherPages: string[];
}

// Store previously fetched articles
let previousArticles: Set<string> = new Set();
let scrapedData: ScrapedData = { landingPages: [], otherPages: [] };

app.get('/scraped-content', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Perform scraping
    const articles = await scrapeCoinbaseBlog();

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
  } catch (error) {
    console.error('Error scraping data:', error);
    next(error); // Pass the error to the error-handling middleware
  }
});

// Error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
