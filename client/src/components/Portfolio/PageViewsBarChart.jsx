import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

export default function PageViewsBarChart({ rows }) {
  const theme = useTheme();
  const colorPalette = [
    theme.palette.primary.dark,
    theme.palette.primary.main,
    theme.palette.primary.light,
  ];

  const stockNames = rows.map((row) => row.stockName);
  const portfolioValues = rows.map((row) => row.totalPortfolioValue);

  return (
    <motion.div whileHover={{ scale: 1.01 }}>
      <Card
        // variant="outlined"
        sx={{
          width: "100%",
          border: 2px solid ${theme.palette.primary.main},
          borderRadius: 0,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: theme.palette.primary.main,
            }}
          >
            📈 Stock Performance
          </Typography>
          <Stack sx={{ justifyContent: "space-between" }}>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Growth/Loss of each stock
            </Typography>
          </Stack>
          <BarChart
            colors={colorPalette}
            xAxis={[
              { scaleType: "band", categoryGapRatio: 0.5, data: stockNames },
            ]}
            series={[
              {
                id: "totalPortfolioValue",
                label: "Portfolio Value",
                data: portfolioValues,
              },
            ]}
            height={250}
            margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
            grid={{ horizontal: true }}
            slotProps={{ legend: { hidden: true } }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
