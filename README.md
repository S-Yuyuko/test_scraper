Coinbase Blog Scraper
A full-stack application to scrape and display articles from the Coinbase Blog. The project includes:

Backend: A Node.js API that scrapes blog articles using Puppeteer and serves the data.
Frontend: A React app to display the scraped articles, categorized into landing pages and other pages.
Features
Backend
Scrapes the Coinbase blog for articles.
Differentiates between landing pages and other pages.
Stores previously scraped articles and identifies new ones.
API endpoint to retrieve scraped data.
Automated tests for stability and continuous integration.
Frontend
Displays scraped articles categorized into landing pages and other pages.
Shows both new and previously scraped articles.
Allows refreshing the data via the backend.
Handles errors and loading states gracefully.

![image](https://github.com/user-attachments/assets/77eb1d15-bb20-46e6-9b4a-ced9ce0d00ed)

![image](https://github.com/user-attachments/assets/4074da99-9e4b-4ebd-a979-bce6ea8813aa)

Frontend: npm install, then npm start
Back: npx tsc, then node dist/index.js
