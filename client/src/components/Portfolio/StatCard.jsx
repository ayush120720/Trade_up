import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Stack, useTheme } from "@mui/material";

function StatCard({ title, value }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: "100%",
        flexGrow: 1,
        boxShadow: "none",
        border: "none",
        background: theme.palette.background.alt,
      }}
    >
      <CardContent>
        <Typography
          component="h2"
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
        >
          {title}
        </Typography>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography
            variant="h4"
            component="p"
            fontWeight="bold"
            sx={{ color: theme.palette.text.primary }}
          >
            {value}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default StatCard;
