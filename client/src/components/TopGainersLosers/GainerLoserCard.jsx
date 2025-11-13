import React from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RemoveIcon from "@mui/icons-material/Remove";
import { motion } from "framer-motion";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ type }) => {
  const isLoss = type === "loss";

  return {
    border: `2px solid ${isLoss ? "#f44336" : "#4caf50"}`,
    backgroundColor: "#fff",
    boxShadow: isLoss
      ? "0 6px 20px rgba(244,67,54,0.2)"
      : "0 6px 20px rgba(0,128,0,0.2)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      boxShadow: isLoss
        ? "0 12px 35px rgba(244,67,54,0.45)"
        : "0 12px 35px rgba(0,128,0,0.35)",
      transform: "translateY(-5px)",
    },
    "& .MuiTypography-root": {
      color: "#000", 
    },
    "& .MuiChip-label": {
      color: "#000",
    },
  };
});

const GainerLoserCard = ({ stock, delay }) => {
  const change_amount = parseFloat(stock.change_amount).toFixed(2);
  const price = parseFloat(stock.price).toFixed(2);

  const getChipColor = () => {
    if (change_amount > 0) return "success";
    if (change_amount < 0) return "error";
    return "default";
  };

  const getChipIcon = () => {
    if (change_amount > 0) return <ArrowUpwardIcon fontSize="small" />;
    if (change_amount < 0) return <ArrowDownwardIcon fontSize="small" />;
    return <RemoveIcon fontSize="small" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <StyledCard variant="outlined" type={change_amount < 0 ? "loss" : "gain"}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Box>
            <Typography variant="h6" color="text.primary">
              {stock.ticker}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${price}
            </Typography>
          </Box>

          <Chip
            label={`${change_amount}%`}
            color={getChipColor()}
            icon={getChipIcon()}
            sx={{
              fontWeight: "bold",
              minWidth: "3rem",
            }}
          />
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

export default GainerLoserCard;
