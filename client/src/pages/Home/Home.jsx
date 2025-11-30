import React from "react";
import MarketOverview from "../../components/TopGainersLosers/MarketOverview";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material";

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

    </motion.div>
  );
};

export default Home;
