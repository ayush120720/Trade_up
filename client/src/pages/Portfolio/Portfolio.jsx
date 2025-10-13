import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Grid,
  Typography,
  Stack,
} from "@mui/material";

import UserStockshare from "../../components/Portfolio/UserStockshare";
import PageViewsBarChart from "../../components/Portfolio/PageViewsBarChart";
import StatCard from "../../components/Portfolio/StatCard";
import PortfolioTable from "../../components/Portfolio/PortfolioTable";
import apiClient from "../../services/apiClient";

const MotionBox = motion(Box);

const Portfolio = () => {
  const theme = useTheme();
  const [balance, setBalance] = useState(0);
  const [portfolioData, setPortfolioData] = useState([]);

  // ✅ Fetch user balance
  async function fetchUserBalance() {
    try {
      const response = await apiClient.get("/auth/profile");
      setBalance(response.data.balance || 0);
    } catch (error) {
      console.error("Error fetching user balance:", error);
    }
  }

  // ✅ Fetch portfolio data
  async function fetchPortfolioData() {
    try {
      const response = await apiClient.get("/portfolio/portfolio");
      const formattedData = response.data.map((item, index) => ({
        id: index + 1,
        stockName: item.stockName,
        totalQuantity: item.totalQuantity,
        avgPurchasePrice: item.avgPurchasePrice,
        currentStockPrice: item.currentStockPrice,
        gainLossPercentage: item.gainLossPercentage,
        totalPortfolioValue: item.totalPortfolioValue,
      }));
      setPortfolioData(formattedData);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  }

  useEffect(() => {
    fetchPortfolioData();
    fetchUserBalance();
  }, []);

  // ✅ Calculations
  const gainLoss = (balance - 10000).toFixed(2);
  const overallPortfolioValue = portfolioData
    .reduce((acc, item) => acc + item.totalPortfolioValue, 0)
    .toFixed(2);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
        padding: 2,
      }}
    >
      {/* 🔥 Overview Heading */}
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

      {/* 💰 Stats Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 2,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {/* 💰 Total Portfolio */}
            <Grid item xs={12} sm={6}>
              <MotionBox
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                }}
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
                  valueColor={theme.palette.text.primary}
                />
              </MotionBox>
            </Grid>

            {/* 📊 Profit / Loss */}
            <Grid item xs={12} sm={6}>
              <MotionBox
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                }}
                transition={{ type: "spring", stiffness: 200 }}
                sx={{
                  p: 1,
                  background: theme.palette.background.alt,
                  border: `2px solid ${gainLoss >= 0 ? "#4caf50" : "#f44336"}`,
                }}
              >
                <StatCard
                  title={gainLoss >= 0 ? "📊 Net Profit" : "📉 Net Loss"}
                  value={`$${gainLoss}`}
                  valueColor={theme.palette.text.primary}
                />
              </MotionBox>
            </Grid>
          </Grid>

          {/* 📊 Portfolio Charts */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1, minWidth: "0" }}>
              <PageViewsBarChart rows={portfolioData} />
            </Box>
          </Box>
        </Box>

        {/* 🧩 Side Section */}
        <Box sx={{ maxWidth: { xs: "100%", lg: "400px" } }}>
          <Stack direction="column" spacing={2}>
            <UserStockshare portfolioData={portfolioData} />
          </Stack>
        </Box>
      </Box>

      {/* 🔥 Portfolio Table Heading */}
      <Box mt={4} mb={2}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h4"
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
              transition={{ delay: 0.3, type: "spring", stiffness: 220 }}
            >
              📊 Portfolio Table
            </motion.span>
          </Typography>
        </motion.div>
      </Box>

      {/* 📋 Portfolio Table */}
      <Box sx={{ mt: 2 }}>
        <PortfolioTable rows={portfolioData} />
      </Box>
    </Box>
  );
};

export default Portfolio;
