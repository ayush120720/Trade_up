import React, { useState } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";

const TickerSearch = ({ onSelectStock }) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const theme = useTheme();

  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchTickers = async () => {
    if (!inputValue.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://www.alphavantage.co/query`, {
        params: {
          function: "SYMBOL_SEARCH",
          keywords: inputValue,
          apikey: apiKey,
        },
      });
      const results = response.data.bestMatches || [];
      const tickers = results.map((item) => ({
        symbol: item["1. symbol"],
        name: item["2. name"],
      }));
      setOptions(tickers);
    } catch (error) {
      console.error("Error fetching ticker data:", error);
    }
    setLoading(false);
  };

  const handleSelect = (option) => {
    onSelectStock(option);
    setOptions([]);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchTickers();
  };

  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: "30vh",
        backgroundColor: theme.palette.background.default,
        px: 0,
      }}
      spacing={3}
    >
      {/* 🔥 Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          align="center"
          sx={{
            color: theme.palette.primary.main,
          }}
        >
          📊 Stock Ticker Search
        </Typography>
      </motion.div>

      {/* 🔎 Full-width Search Row */}
      <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
        <TextField
          label="Enter Stock Symbol or Name"
          placeholder="e.g. AAPL, Tesla"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: "8px",
          }}
        />
        <Button
          variant="contained"
          onClick={fetchTickers}
          disabled={loading || !inputValue}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            px: 4,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          startIcon={<SearchIcon />}
        >
          {loading ? <CircularProgress color="inherit" size={24} /> : "Search"}
        </Button>
      </Stack>

      {/* 📜 Full-width Results */}
      {options.length > 0 && (
        <List sx={{ width: "100%" }}>
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ListItem
                button
                onClick={() => handleSelect(option)}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 2,
                  mb: 2,
                  px: 3,
                  py: 2,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                  width: "100%",
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      fontWeight="600"
                      sx={{ color: theme.palette.text.primary }}
                    >
                      {option.symbol}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary, opacity: 0.7 }}
                    >
                      {option.name}
                    </Typography>
                  }
                />
              </ListItem>
            </motion.div>
          ))}
        </List>
      )}
    </Stack>
  );
};

export default TickerSearch;
