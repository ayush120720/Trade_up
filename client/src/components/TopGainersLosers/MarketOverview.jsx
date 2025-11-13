import React, { useEffect, useState } from "react";
import GainersLosersList from "./GainersLosersList";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { fetchGainersAndLosers } from "../../api/homeApi";
import { motion } from "framer-motion";

const MarketOverview = () => {
  const theme = useTheme();
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchGainersAndLosers();
        if (!data || Object.keys(data).length === 0) {
          throw new Error("No data available");
        }
        setStockData(data);
      } catch (error) {
        console.error("Error in fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <Box sx={{ width: "100%", px: { xs: 2, md: 6 }, mt: 2 }}>
      {/* Content */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" p={3}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GainersLosersList data={stockData} />
        </motion.div>
      )}
    </Box>
  );
};

export default MarketOverview;