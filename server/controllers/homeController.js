const { fetchNews, fetchGainersAndLosers } = require('../service/homeService');

const CACHE_EXPIRY_ONE_HOUR = 60 * 60 * 1000;
const CACHE_EXPIRY_ONE_DAY = 24 * 60 * 60 * 1000;

let newsCache = { lastFetchTime: null, articles: [] };
let marketCache = { lastFetchTime: null, data: null };

const FALLBACK_MARKET_DATA = {
    top_gainers: [
        { ticker: "AAPL", price: 194.12, change_percentage: "+3.15%" },
        { ticker: "TSLA", price: 212.54, change_percentage: "+2.88%" },
        { ticker: "NVDA", price: 795.44, change_percentage: "+2.55%" },
        { ticker: "META", price: 485.22, change_percentage: "+2.31%" },
        { ticker: "GOOGL", price: 152.72, change_percentage: "+1.95%" }
    ],
    top_losers: [
        { ticker: "AMZN", price: 155.22, change_percentage: "-2.10%" },
        { ticker: "NFLX", price: 565.41, change_percentage: "-1.80%" },
        { ticker: "INTC", price: 44.25, change_percentage: "-1.55%" },
        { ticker: "ORCL", price: 109.32, change_percentage: "-1.22%" },
        { ticker: "PYPL", price: 60.11, change_percentage: "-1.10%" }
    ],
    most_actively_traded: [
        { ticker: "AAPL", volume: 102458112, price: 194.12 },
        { ticker: "TSLA", volume: 54804332, price: 212.54 },
        { ticker: "MSFT", volume: 45344556, price: 415.64 },
        { ticker: "NVDA", volume: 39888411, price: 795.44 },
        { ticker: "AMZN", volume: 35411241, price: 155.22 }
    ]
};

const isCacheExpired = (lastFetchTime, expiryTime) =>
    !lastFetchTime || (Date.now() - lastFetchTime) > expiryTime;



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
    console.log("📌 Market request received");

    if (!marketCache.data || isCacheExpired(marketCache.lastFetchTime, CACHE_EXPIRY_ONE_DAY)) {
        console.log("⏳ Cache empty/expired — fetching new data...");

        const data = await fetchGainersAndLosers();

        if (!data.top_gainers.length) {
            console.log("⚠ API failed — returning fallback market data");
            return res.json(FALLBACK_MARKET_DATA);
        }

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
};
module.exports = { getNews, getTopGainersLosers };
