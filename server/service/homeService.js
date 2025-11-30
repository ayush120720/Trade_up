const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

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

        return {
            top_gainers: response.data.top_gainers || [],
            top_losers: response.data.top_losers || [],
            most_actively_traded: response.data.most_actively_traded || []
        };
    } catch (error) {
        console.error("GAINERS/LOSERS FETCH ERROR:", error.message);
        return {
            top_gainers: [],
            top_losers: [],
            most_actively_traded: []
        };
    }
};

module.exports = { fetchNews, fetchGainersAndLosers };
