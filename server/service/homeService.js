const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

console.log("ALPHA KEY:", apiKey ? "LOADED" : "NOT FOUND");

const fetchNews = async () => {
    try {
        const response = await axios.get('https://www.alphavantage.co/query', {
            params: {
                function: "NEWS_SENTIMENT",
                sort: "RELEVANCE",
                topics: "financial_markets",
                limit: 8,
                apikey: apiKey,
            }
        });

        return response.data.feed || [];
    } catch (error) {
        console.error("NEWS FETCH ERROR:", error.message);
        return [];
    }
};

const fetchGainersAndLosers = async () => {
    const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`;

    try {
        const response = await axios.get(url);

        const gainers = response.data.top_gainers || [];
        const losers = response.data.top_losers || [];
        const actives = response.data.most_actively_traded || [];

        if (gainers.length && losers.length && actives.length) {
            console.log("✔ Valid market data received");
            return {
                top_gainers: gainers,
                top_losers: losers,
                most_actively_traded: actives
            };
        }

        console.log("❌ AlphaVantage returned empty or partial market data — keeping old cache");
        return null; 
    } catch (error) {
        console.error("GAINERS/LOSERS FETCH ERROR:", error.message);
        return null; 
    }
};

module.exports = { fetchNews, fetchGainersAndLosers };
