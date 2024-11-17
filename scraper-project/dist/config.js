"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScraperApiUrl = exports.coinbaseBaseUrl = exports.coinbaseBlogBaseUrl = exports.scraperApiBaseUrl = exports.apiKey = void 0;
exports.apiKey = "2ad7886933eb376bcfb5cf9c5cc44098"; // Your ScraperAPI key
// Base URL for ScraperAPI
exports.scraperApiBaseUrl = `http://api.scraperapi.com?api_key=${exports.apiKey}&url=`;
// Base URL for Coinbase Blog
exports.coinbaseBlogBaseUrl = "https://www.coinbase.com/blog";
exports.coinbaseBaseUrl = "https://www.coinbase.com";
// Function to generate full ScraperAPI URLs
const getScraperApiUrl = (url) => {
    return `${exports.scraperApiBaseUrl}${encodeURIComponent(url)}`;
};
exports.getScraperApiUrl = getScraperApiUrl;
