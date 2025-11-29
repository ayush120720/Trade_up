import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  IconButton,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import apiClient from "../../services/apiClient";
import { motion } from "framer-motion";

export default function Modal({
  open,
  onClose,
  selectedStock,
  balance,
  stockPrice,
  transactionType,
  availableQuantity,
}) {
  const theme = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const totalCost = quantity * stockPrice;

  useEffect(() => {
    setQuantity(1);
  }, [open, transactionType]);

  const handleIncreaseQuantity = () => {
    const newQuantity = quantity + 1;
    if (transactionType === "Buy" && newQuantity * stockPrice <= balance) {
      setQuantity(newQuantity);
    } else if (transactionType === "Sell" && newQuantity <= availableQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    if (transactionType === "Buy" && value * stockPrice <= balance) {
      setQuantity(value);
    } else if (transactionType === "Sell" && value <= availableQuantity) {
      setQuantity(value);
    }
  };

  const handleTransaction = async () => {
    const transactionData = {
      stockName: selectedStock.symbol,
      transactionType: transactionType,
      quantity: quantity,
      pricePerShare: stockPrice,
    };

    try {
      const response = await apiClient.put(
        "/transaction/add-transaction",
        transactionData
      );

      console.log(`${transactionType} transaction successful:`, response.data);
      setSnackbarOpen(true);
      onClose();
    } catch (error) {
      console.error(`Error adding ${transactionType} transaction:`, error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
          },
        }}
      >
        {/* Green Header */}
        <DialogTitle
          sx={{
            backgroundColor: "#fff",
            color: theme.palette.primary.main,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.6rem",
            py: 2,
          }}
        >
          {transactionType} {selectedStock?.symbol}
        </DialogTitle>

        {/* Content */}
        <DialogContent
          sx={{
            backgroundColor: theme.palette.background.default,
            padding: "24px",
            width: "420px",
            height: "360px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: "1.2rem", fontWeight: 500, mb: 2 }}>
            {transactionType === "Buy"
              ? `Available Balance: $${balance.toFixed(2)}`
              : `Available to Sell: ${availableQuantity} shares`}
          </Typography>

          <Typography sx={{ fontSize: "1.2rem", fontWeight: 500, mb: 3 }}>
            Stock Price: ${stockPrice.toFixed(2)}
          </Typography>

          {/* Centered Quantity Controls */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ mb: 3 }}
          >
            <IconButton
              onClick={handleDecreaseQuantity}
              sx={{
                backgroundColor: theme.palette.error.light,
                color: "#fff",
                "&:hover": { backgroundColor: theme.palette.error.main },
              }}
            >
              <RemoveIcon />
            </IconButton>
            <TextField
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{
                min: 1,
                max:
                  transactionType === "Buy"
                    ? Math.floor(balance / stockPrice)
                    : availableQuantity,
                type: "number",
                style: { textAlign: "center" },
              }}
              sx={{
                "& .MuiInputBase-root": {
                  textAlign: "center",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: "8px",
                },
                width: "90px",
              }}
            />
            <IconButton
              onClick={handleIncreaseQuantity}
              sx={{
                backgroundColor: theme.palette.success.light,
                color: "#fff",
                "&:hover": { backgroundColor: theme.palette.success.main },
              }}
            >
              <AddIcon />
            </IconButton>
          </Stack>

          <Typography sx={{ fontSize: "1.2rem", fontWeight: 600, mb: 3 }}>
            Total {transactionType === "Buy" ? "Cost" : "Proceeds"}: $
            {totalCost.toFixed(2)}
          </Typography>

          {/* Buttons */}
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              onClick={onClose}
              sx={{
                backgroundColor: theme.palette.error.main,
                color: "#fff",
                fontSize: "1rem",
                textTransform: "none",
                px: 3,
                "&:hover": { backgroundColor: theme.palette.error.dark },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleTransaction}
              disabled={
                transactionType === "Buy"
                  ? totalCost > balance
                  : quantity > availableQuantity
              }
              sx={{
                backgroundColor: theme.palette.success.main,
                color: "#fff",
                fontSize: "1rem",
                textTransform: "none",
                px: 3,
                "&:hover": { backgroundColor: theme.palette.success.dark },
              }}
            >
              Confirm {transactionType}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          ✅ Transaction Completed successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
