const Transaction = require("../models/transaction");
const axios = require("axios");

const getPortfolioData = async (req, res) => {
  try {
    const userId = req.user._id;
    const transactions = await Transaction.find({ userId });

    const portfolio = {};

    for (const tx of transactions) {
      const { stockName, quantity, pricePerShare, transactionType } = tx;

      if (!portfolio[stockName]) {
        portfolio[stockName] = {
          stockName,
          totalQuantity: 0,
          totalInvested: 0,
          avgPurchasePrice: 0,
          gainLossPercentage: 0,
          currentStockPrice: 0,
          totalPortfolioValue: 0
        };
      }

      if (transactionType === "Buy") {
        const cost = quantity * pricePerShare;
        portfolio[stockName].totalQuantity += quantity;
        portfolio[stockName].totalInvested += cost;

        portfolio[stockName].avgPurchasePrice = parseFloat(
          (
            portfolio[stockName].totalInvested /
            portfolio[stockName].totalQuantity
          ).toFixed(2)
        );
      }

      if (transactionType === "Sell") {
        if (portfolio[stockName].totalQuantity >= quantity) {
          portfolio[stockName].totalQuantity -= quantity;
          const costBasis = portfolio[stockName].avgPurchasePrice * quantity;
          portfolio[stockName].totalInvested -= costBasis;
        } else {
          console.warn(
            `Warning: Sell quantity exceeds available quantity for ${stockName}`
          );
          portfolio[stockName].totalQuantity = 0;
          portfolio[stockName].totalInvested = 0;
        }
      }
    }

    for (const stockName in portfolio) {
      const stock = portfolio[stockName];

      const currentPrice = await getCurrentStockPrice(stockName);

      if (!currentPrice) {
        stock.currentStockPrice = stock.avgPurchasePrice;
        stock.totalPortfolioValue = stock.totalInvested;
        stock.gainLossPercentage = 0;
        continue;
      }

      stock.currentStockPrice = parseFloat(currentPrice.toFixed(2));
      stock.totalPortfolioValue = parseFloat(
        (stock.currentStockPrice * stock.totalQuantity).toFixed(2)
      );

   
      if (currentPrice === stock.avgPurchasePrice) {
        stock.gainLossPercentage = 0;
      } else {
        stock.gainLossPercentage = parseFloat(
          (
            ((currentPrice - stock.avgPurchasePrice) /
              stock.avgPurchasePrice) *
            100
          ).toFixed(2)
        );
      }
    }

    res.json(Object.values(portfolio));
  } catch (err) {
    console.error("Error fetching portfolio:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

async function getCurrentStockPrice(stockName) {
  try {
    const apiKey = process.env.API_KEY;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockName}&interval=5min&apikey=${apiKey}`;

    const response = await axios.get(url);
    const ts = response.data["Time Series (5min)"];
    if (!ts) return null;

    const latest = Object.keys(ts)[0];
    return parseFloat(ts[latest]["4. close"]);
  } catch (err) {
    console.error(`Price fetch failed for ${stockName}: ${err.message}`);
    return null;
  }
}

module.exports = { getPortfolioData };
