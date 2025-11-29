import React from "react";
import { Button, Typography, Box, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import { styled, useTheme } from "@mui/material/styles";

const MotionTypography = motion(Typography);

const QuizRules = ({ onStart }) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card
        sx={{
          height: "100%",
          borderRadius: 5,
          boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
          // background: "#fff",
          p: 4,
          background: theme.palette.background.alt,
        }}
      >
        {/* Header */}
        <MotionTypography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          // color="primary"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          color={theme.palette.text.primary}
          gutterBottom
        >
          Quiz Rules
        </MotionTypography>

        {/* Rules list */}
        <CardContent sx={{ textAlign: "center" }}>
          {[
            "Each quiz has 10 questions.",
            "You have 15 seconds per question.",
            "Correct answer = +10 points.",
            "Wrong answer = -5 points.",
          ].map((rule, i) => (
            <MotionTypography
              key={i}
              variant="body1"
              fontSize={15}
              fontWeight="500"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              gutterBottom
              color={theme.palette.text.primary}
            >
              {rule}
            </MotionTypography>
          ))}
        </CardContent>

        {/* Start button */}
        <Box textAlign="center" mt={3}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 4, py: 1.5, borderRadius: 3 }}
              onClick={onStart}
            >
              Start Quiz
            </Button>
          </motion.div>
        </Box>
      </Card>
    </motion.div>
  );
};

export default QuizRules;
