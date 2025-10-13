import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const columns = [
  { field: "stockName", headerName: "Stock Name", flex: 1.5, minWidth: 170 },
  { field: "totalQuantity", headerName: "Quantity", flex: 1, minWidth: 75 },
  {
    field: "avgPurchasePrice",
    headerName: "Avg Purchase Price",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "currentStockPrice",
    headerName: "Current Stock Price",
    flex: 1,
    minWidth: 130,
  },
  {
    field: "gainLossPercentage",
    headerName: "Gain/Loss %",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "totalPortfolioValue",
    headerName: "Total Value",
    flex: 1,
    minWidth: 140,
  },
];

export default function PortfolioTable({ rows }) {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box sx={{ width: "100%" }}>
        {/* <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          disableSelectionOnClick
          getRowId={(row) => row.id}
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          pageSizeOptions={[10, 20, 30]}
          density="comfortable"
          sx={{
            border: 2px solid ${theme.palette.primary.main},
            borderRadius: 0,
            backgroundColor: "#fff",
            "& .MuiDataGrid-columnHeaders": {
              fontWeight: "bold",
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.grey[100],
            },
            "& .MuiDataGrid-cell": {
              fontSize: "0.95rem",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: theme.palette.action.hover,
              transform: "scale(1.01)",
              transition: "all 0.2s ease-in-out",
            },
          }}
        /> */}
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          disableSelectionOnClick
          getRowId={(row) => row.id}
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          pageSizeOptions={[10, 20, 30]}
          density="comfortable"
          sx={{
            border: 2px solid ${theme.palette.primary.main},
            borderRadius: 0,
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.text.primary,
            "& .MuiDataGrid-columnHeaders": {
              fontWeight: "bold",
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.default,
            },
            "& .MuiDataGrid-cell": {
              fontSize: "0.95rem",
              color: theme.palette.text.primary,
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: theme.palette.action.hover,
              transform: "scale(1.01)",
              transition: "all 0.2s ease-in-out",
            },
          }}
        />
      </Box>
    </motion.div>
  );
}
