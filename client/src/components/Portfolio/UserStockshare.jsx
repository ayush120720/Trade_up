import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTheme } from "@mui/material";
import { motion } from "framer-motion";

const colors = [
  "#36A2EB",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#FF6384",
  "#FFCE56",
];

export default function UserStockshare({ portfolioData }) {
  const [data, setData] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [totalValue, setTotalValue] = useState("0");
  const theme = useTheme();

  useEffect(() => {
    let total = 0;
    const chartData = portfolioData.map((stock, index) => {
      total += stock.totalQuantity * stock.avgPurchasePrice;
      return {
        label: stock.stockName,
        value: stock.totalQuantity * stock.avgPurchasePrice,
      };
    });

    const stockDetails = portfolioData.map((stock, index) => ({
      name: stock.stockName,
      percentage:
        ((stock.totalQuantity * stock.avgPurchasePrice) / total) * 100,
      color: colors[index % colors.length],
    }));

    setData(chartData);
    setStocks(stockDetails);
    setTotalValue(total.toFixed(2));
  }, [portfolioData]);

  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Card
        // variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          flexGrow: 1,
          overflowY: "auto",
          border: `2px solid ${theme.palette.primary.main}`,
          borderRadius: 0,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: theme.palette.primary.main,
            }}
          >
            📊 Stock Share
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <PieChart
                colors={colors}
                margin={{ left: 100, right: 100, top: 100, bottom: 100 }}
                series={[
                  {
                    data,
                    innerRadius: 75,
                    outerRadius: 100,
                    highlightScope: { faded: "global", highlighted: "item" },
                  },
                ]}
                height={360}
                width={260}
                slotProps={{ legend: { hidden: true } }}
              />
              <Typography
                component="div"
                variant="h6"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: theme.palette.primary.main,
                }}
              >
                ${totalValue}
              </Typography>
            </Box>
            <KeyboardArrowDownIcon
              sx={{
                fontSize: 35,
                display: { xs: "none", lg: "block" },
                mb: 1,
                color: theme.palette.primary.main,
              }}
            />
          </Box>
          <Box>
            {stocks.map((stock, index) => (
              <Stack
                key={index}
                direction="row"
                sx={{ alignItems: "center", gap: 2, pb: 2 }}
              >
                <Stack sx={{ gap: 1, flexGrow: 1 }}>
                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: "600" }}>
                      {stock.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {stock.percentage.toFixed(1)}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={stock.percentage}
                    sx={{
                      [`& .${linearProgressClasses.bar}`]: {
                        backgroundColor: stock.color,
                      },
                      height: 6,
                      borderRadius: 3,
                    }}
                  />
                </Stack>
              </Stack>
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}
