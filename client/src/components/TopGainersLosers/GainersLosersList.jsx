import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import GainerLoserCard from "./GainerLoserCard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useTheme } from "@mui/material/styles";

const GainersLosersList = ({ data }) => {
  const [value, setValue] = useState("gainers");
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {/* Tabs */}
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="primary"
        aria-label="Gainers Losers Tabs"
        centered
        sx={{
          mb: 3,
          "& .MuiTab-root": {
            fontWeight: "bold",
          },
          "& .Mui-selected": {
            color: theme.palette.primary.main,
          },
        }}
      >
        <Tab
          icon={<TrendingUpIcon />}
          iconPosition="start"
          value="gainers"
          label="Top Gainers"
        />
        <Tab
          icon={<TrendingDownIcon />}
          iconPosition="start"
          value="losers"
          label="Top Losers"
        />
        <Tab
          icon={<BarChartIcon />}
          iconPosition="start"
          value="active"
          label="Most Active"
        />
      </Tabs>

      {/* Content wrapper with shadows */}
      <Box
        sx={{
          width: "100%",
          px: { xs: 0, md: 4 },
          py: 2,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        {value === "gainers" &&
          data?.top_gainers?.map((stock, index) => (
            <Box key={index} mb={2}>
              <GainerLoserCard stock={stock} delay={index * 0.1} />
            </Box>
          ))}

        {value === "losers" &&
          data?.top_losers?.map((stock, index) => (
            <Box key={index} mb={2}>
              <GainerLoserCard stock={stock} delay={index * 0.1} />
            </Box>
          ))}

        {value === "active" &&
          data?.most_actively_traded?.map((stock, index) => (
            <Box key={index} mb={2}>
              <GainerLoserCard stock={stock} delay={index * 0.1} />
            </Box>
          ))}
      </Box>
    </>
  );
};

export default GainersLosersList;