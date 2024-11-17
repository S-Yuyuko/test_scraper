export const apiKey = "2ad7886933eb376bcfb5cf9c5cc44098"; // Your ScraperAPI key

// Base URL for ScraperAPI
export const scraperApiBaseUrl = `http://api.scraperapi.com?api_key=${apiKey}&url=`;

// Base URL for Coinbase Blog
export const coinbaseBlogBaseUrl = "https://www.coinbase.com/blog";

export const coinbaseBaseUrl = "https://www.coinbase.com";

// Function to generate full ScraperAPI URLs
export const getScraperApiUrl = (url: string): string => {
  return `${scraperApiBaseUrl}${encodeURIComponent(url)}`;
};
