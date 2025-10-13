import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Chip, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { getTransactions } from "../../api/transactionApi";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const Transaction = () => {
  const theme = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    {
      field: "transactionId",
      headerName: "Transaction ID",
      flex: 1,
      minWidth: 110,
    },
    { field: "stockName", headerName: "Stock Name", flex: 1, minWidth: 170 },
    {
      field: "transactionType",
      headerName: "Type",
      flex: 1,
      minWidth: 130,
      renderCell: (params) =>
        params.value === "Buy" ? (
          <Chip
            icon={<TrendingUpIcon sx={{ color: "white !important" }} />}
            label="BUY"
            sx={{
              fontWeight: "bold",
              color: "white",
              background: "linear-gradient(90deg, #43a047, #66bb6a)",
            }}
          />
        ) : (
          <Chip
            icon={<TrendingDownIcon sx={{ color: "white !important" }} />}
            label="SELL"
            sx={{
              fontWeight: "bold",
              color: "white",
              background: "linear-gradient(90deg, #e53935, #ef5350)",
            }}
          />
        ),
    },
    { field: "quantity", headerName: "Qty", flex: 1, minWidth: 75 },
    {
      field: "pricePerShare",
      headerName: "Price/Share",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "totalTransactionValue",
      headerName: "Total Value",
      flex: 1,
      minWidth: 170,
    },
    { field: "dateTime", headerName: "Date & Time", flex: 1, minWidth: 180 },
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const data = await getTransactions();
        if (data) {
          setTransactions(data.transactions);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <motion.div
      style={{ width: "100%" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* 🔥 Animated Header */}
      <Box mb={4}>
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            align="center"
            sx={{
              mb: 2,
              color: theme.palette.primary.main,
              letterSpacing: 1,
            }}
          >
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 220 }}
            >
              📊 Transaction
            </motion.span>{" "}
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 220 }}
            >
              History
            </motion.span>
          </Typography>
        </motion.div>
      </Box>

      {/* ✅ Full-width animated table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <Box sx={{ width: "100%" }}>
          <DataGrid
            autoHeight
            loading={isLoading}
            rows={transactions}
            getRowId={(row) => row._id}
            columns={columns}
            disableSelectionOnClick
            initialState={{
              pagination: { paginationModel: { pageSize: 20 } },
            }}
            pageSizeOptions={[10, 20, 30]}
            density="comfortable"
            sx={{
              "& .MuiDataGrid-row:hover": {
                backgroundColor: theme.palette.action.hover,
                transform: "scale(1.01)",
                transition: "all 0.2s ease-in-out",
              },
              "& .MuiDataGrid-columnHeaders": {
                fontWeight: "bold",
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.grey[100],
                fontSize: "1rem",
              },
              "& .MuiDataGrid-cell": {
                fontSize: "0.95rem",
              },
            }}
          />
        </Box>
      </motion.div>
    </motion.div>
  );
};

export default Transaction;