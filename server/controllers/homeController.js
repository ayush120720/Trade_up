const { fetchNews, fetchGainersAndLosers } = require('../service/homeService');

const CACHE_EXPIRY_ONE_HOUR = 60 * 60 * 1000;
const CACHE_EXPIRY_ONE_DAY = 24 * 60 * 60 * 1000;


let newsCache = {
    lastFetchTime: null,
    articles: []
};

let marketCache = {
    lastFetchTime: null,
    data: null
};


const isCacheExpired = (lastFetchTime, expiryTime) => {
    const now = Date.now();
    return (
        !lastFetchTime ||
        now - lastFetchTime > expiryTime ||
        new Date(now).getDate() !== new Date(lastFetchTime).getDate()
    );
};


const getNews = async (req, res) => {
    try {
        if (isCacheExpired(newsCache.lastFetchTime, CACHE_EXPIRY_ONE_HOUR)) {
            const articles = await fetchNews();
            newsCache = {
                lastFetchTime: Date.now(),
                articles: articles.slice(0, 6)
            };
        }
        res.json(newsCache.articles);
    } catch (err) {
        console.error("NEWS ERROR:", err.message);
        res.status(500).json({ error: "Failed to fetch news" });
    }
};


const getTopGainersLosers = async (req, res) => {
    try {
        if (isCacheExpired(marketCache.lastFetchTime, CACHE_EXPIRY_ONE_DAY)) {
            const data = await fetchGainersAndLosers();

            marketCache = {
                lastFetchTime: Date.now(),
                data
            };
        }

        res.json({
            top_gainers: marketCache.data.top_gainers.slice(0, 5),
            top_losers: marketCache.data.top_losers.slice(0, 5),
            most_actively_traded: marketCache.data.most_actively_traded.slice(0, 5)
        });

    } catch (err) {
        console.error("MARKET ERROR:", err.message);
        res.status(500).json({ error: "Failed to fetch market data" });
    }
};

module.exports = { getNews, getTopGainersLosers };
