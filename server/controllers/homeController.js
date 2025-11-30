const { fetchNews, fetchGainersAndLosers } = require('../service/homeService');

const CACHE_EXPIRY_ONE_HOUR = 60 * 60 * 1000;
const CACHE_EXPIRY_ONE_DAY = 24 * 60 * 60 * 1000;

let newsCache = { lastFetchTime: null, articles: [] };
let marketCache = { lastFetchTime: null, data: null };

const isCacheExpired = (lastFetchTime, expiryTime) => {
    if (!lastFetchTime) return true;
    const now = Date.now();
    const expired = now - lastFetchTime > expiryTime;


    const dayChanged = new Date(now).getDate() !== new Date(lastFetchTime).getDate();

    return expired || dayChanged;
};

const getNews = async (req, res) => {
    try {
        if (!newsCache.articles.length || isCacheExpired(newsCache.lastFetchTime, CACHE_EXPIRY_ONE_HOUR)) {
            const articles = await fetchNews();
            newsCache = {
                lastFetchTime: Date.now(),
                articles: (articles || []).slice(0, 6)
            };
        }

        return res.json(newsCache.articles);
    } catch (error) {
        console.error("NEWS ERROR:", error.message);
        return res.json([]);   
    }
};


const getTopGainersLosers = async (req, res) => {
    try {
        if (!marketCache.data || isCacheExpired(marketCache.lastFetchTime, CACHE_EXPIRY_ONE_DAY)) {
            const apiData = await fetchGainersAndLosers();

            marketCache = {
                lastFetchTime: Date.now(),
                data: {
                    top_gainers: apiData.top_gainers || [],
                    top_losers: apiData.top_losers || [],
                    most_actively_traded: apiData.most_actively_traded || []
                }
            };
        }

        return res.json({
            top_gainers: marketCache.data.top_gainers.slice(0, 5),
            top_losers: marketCache.data.top_losers.slice(0, 5),
            most_actively_traded: marketCache.data.most_actively_traded.slice(0, 5)
        });
    } catch (error) {
        console.error("GAINERS/LOSERS ERROR:", error.message);

        return res.json({
            top_gainers: [],
            top_losers: [],
            most_actively_traded: []
        });
    }
};

module.exports = { getNews, getTopGainersLosers };
