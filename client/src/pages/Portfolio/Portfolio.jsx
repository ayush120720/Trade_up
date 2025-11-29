import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import UserStockshare from "../../components/Portfolio/UserStockshare";
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
        }));
        setPortfolioData(portfolioData);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    }

    fetchUserData();
    fetchPortfolioData();
  }, []);

  // Calculate User Gain/Loss based on initial 10000 points
  const gainLoss = (balance - 10000).toFixed(2);

  // Calculate Overall Portfolio Value
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
      {/* 🔥 Animated Overview Heading */}
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

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 2,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {/* 🎯 Animated Stat Cards */}
            <Grid item xs={12} sm={6} md={4}>
              <MotionBox
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                }}
                transition={{ type: "spring", stiffness: 200 }}
                sx={{
                  // borderRadius: 3,
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

            <Grid item xs={12} sm={6} md={4}>
              <MotionBox
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                }}
                transition={{ type: "spring", stiffness: 200 }}
                sx={{
                  // borderRadius: 3,
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

            <Grid item xs={12} sm={6} md={4}>
              <MotionBox
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                }}
                transition={{ type: "spring", stiffness: 200 }}
                sx={{
                  p: 1,
                  border: `2px solid ${theme.palette.primary.main}`,
                  background: theme.palette.background.alt, // ✅ theme-aware
                }}
              >
                <StatCard
                  title="💰 Total Portfolio"
                  value={`$${overallPortfolioValue}`}
                  valueColor={theme.palette.text.primary} // ✅ ensure number text visible
                />
              </MotionBox>
            </Grid>
          </Grid>

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

        <Box sx={{ maxWidth: { xs: "100%", lg: "400px" } }}>
          <Stack direction="column" spacing={2}>
            <UserStockshare portfolioData={portfolioData} />
          </Stack>
        </Box>
      </Box>

      {/* 🔥 Animated Portfolio Table Heading */}
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

      <Box sx={{ mt: 2 }}>
        <PortfolioTable rows={portfolioData} />
      </Box>
    </Box>
  );
};

export default Portfolio;
