import React from "react";
import News from "../../components/News/News";
import MarketOverview from "../../components/TopGainersLosers/MarketOverview";
import { motion } from "framer-motion";
import { Box, Typography, useTheme } from "@mui/material";

const Home = () => {
  const theme = useTheme();

  return (
    <motion.div
      style={{ overflowX: "hidden", maxWidth: "100%" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >

      {/* 📈 Market Overview */}
      <MarketOverview />

      {/* 📰 News Section */}
      <Box mt={4}>
        <News />
      </Box>
    </motion.div>
  );
};

export default Home;
