import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PageViewsBarChart from "../../components/Portfolio/PageViewsBarChart";
import StatCard from "../../components/Portfolio/StatCard";
import PortfolioTable from "../../components/Portfolio/PortfolioTable";
import apiClient from "../../services/apiClient";
import { getUserDetails } from "../../api/quizApi";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

const MotionBox = motion(Box);

const Portfolio = () => {
  const theme = useTheme();
  const [balance, setBalance] = useState(0);
  const [rank, setRank] = useState(0);
  const [portfolioData, setPortfolioData] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await getUserDetails();
        setBalance(Number(response.data.balance).toFixed(2));
        setRank(response.data.userRank);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    }

    async function fetchPortfolioData() {
      try {
        const response = await apiClient.get("/portfolio/portfolio");
        const portfolioData = response.data.map((item, index) => ({
          id: index + 1,
          stockName: item.stockName,
          totalQuantity: item.totalQuantity,
          avgPurchasePrice: item.avgPurchasePrice,
          currentStockPrice: item.currentStockPrice,
          gainLossPercentage: item.gainLossPercentage,
          totalPortfolioValue: item.totalPortfolioValue,
          totalInvested: item.totalInvested, 
        }));
        setPortfolioData(portfolioData);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    }

    fetchUserData();
    fetchPortfolioData();
  }, []);


  const totalInvested = portfolioData.reduce(
    (sum, item) => sum + (item.totalInvested || 0),
    0
  );

  const totalCurrentValue = portfolioData.reduce(
    (sum, item) => sum + item.totalPortfolioValue,
    0
  );

  const netProfitLoss = (totalCurrentValue - totalInvested).toFixed(2);

  // For displaying total portfolio
  const overallPortfolioValue = totalCurrentValue.toFixed(2);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
        padding: 2,
      }}
    >
      {/* Heading */}
      <Box mb={3}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            align="center"
            sx={{
              color: theme.palette.primary.main,
              letterSpacing: 1,
            }}
          >
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 220 }}
            >
              📈 Overview
            </motion.span>
          </Typography>
        </motion.div>
      </Box>

      {/* Cards */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {/* Total Portfolio */}
        <Grid item xs={12} sm={6} md={4}>
          <MotionBox
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            sx={{
              p: 1,
              background: theme.palette.background.alt,
              border: `2px solid ${theme.palette.primary.main}`,
            }}
          >
            <StatCard
              title="💰 Total Portfolio"
              value={`$${overallPortfolioValue}`}
            />
          </MotionBox>
        </Grid>

        {/* Net Profit / Loss */}
        <Grid item xs={12} sm={6} md={4}>
          <MotionBox
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            sx={{
              p: 1,
              background: theme.palette.background.alt,
              border: `2px solid ${netProfitLoss >= 0 ? "#4caf50" : "#f44336"}`,
            }}
          >
            <StatCard
              title={netProfitLoss >= 0 ? "📊 Net Profit" : "📉 Net Loss"}
              value={`$${netProfitLoss}`}
            />
          </MotionBox>
        </Grid>

        {/* Balance */}
        <Grid item xs={12} sm={6} md={4}>
          <MotionBox
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            sx={{
              p: 1,
              background: theme.palette.background.alt,
              border: `2px solid ${theme.palette.primary.main}`,
            }}
          >
            <StatCard title="🏦 Available Balance" value={`$${balance}`} />
          </MotionBox>
        </Grid>
      </Grid>

      {/* Chart */}
      <PageViewsBarChart rows={portfolioData} />

      {/* Table */}
      <Box sx={{ mt: 4 }}>
        <PortfolioTable rows={portfolioData} />
      </Box>
    </Box>
  );
};

export default Portfolio;
