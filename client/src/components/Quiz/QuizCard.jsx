import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  LinearProgress,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const QuizCard = ({ questions, score, setScore, setShowScore }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [previousSelections, setPreviousSelections] = useState([]);
  const theme = useTheme();

  const handleOptionClick = (index) => {
    setSelectedOption(index);

    setPreviousSelections((prev) => {
      const updatedSelections = [...prev];
      updatedSelections[currentQuestion] = index;
      return updatedSelections;
    });
  };

  const handleNextQuestion = () => {
    if (
      previousSelections[currentQuestion] === questions[currentQuestion].answer
    ) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(previousSelections[currentQuestion + 1] || null);
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(previousSelections[currentQuestion - 1] || null);
    }
  };

  return (
    <Box
      sx={{
        width: "70vw", // full viewport width
        minHeight: "40vh", // full viewport height
        p: 0, // no padding
        mt: -10, // no margin
      }}
    >
      <MotionCard
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          width: "100%",
          maxWidth: "100%", 
          minHeight: "100vh",
          borderRadius: 0,
          padding: 4,
          boxShadow: "none",
          background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.grey[100]})`,
        }}
      >
        <CardContent>
          {/* Question Header */}
          <MotionBox
            key={currentQuestion}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                fontWeight: "bold",
                color: theme.palette.primary.main,
              }}
            >
              Question {currentQuestion + 1}/{questions.length}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, fontSize: 18 }}>
              {questions[currentQuestion].question}
            </Typography>
          </MotionBox>

          {/* Progress Bar */}
          <LinearProgress
            variant="determinate"
            value={((currentQuestion + 1) / questions.length) * 100}
            sx={{
              mb: 4,
              height: 10,
              borderRadius: 5,
              backgroundColor: theme.palette.grey[300],
              "& .MuiLinearProgress-bar": {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: 5,
              },
            }}
          />

          {/* Options */}
          <Stack direction="column" spacing={2}>
            {questions[currentQuestion].options.map((choice, index) => {
              const isSelected = selectedOption === index;
              const isCorrect =
                previousSelections[currentQuestion] ===
                  questions[currentQuestion].answer && isSelected;
              const isWrong =
                previousSelections[currentQuestion] !==
                  questions[currentQuestion].answer && isSelected;

              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
  fullWidth
  variant="contained"
  onClick={() => handleOptionClick(index)}
  sx={{
    textTransform: "none",
    justifyContent: "flex-start",
    px: 3,
    py: 1.5,
    borderRadius: 3,
    fontSize: 16,
    fontWeight: 500,
    backgroundColor: isSelected
      ? theme.palette.primary.light
      : theme.palette.grey[200],
    color: isSelected ? "#fff" : theme.palette.text.primary,
    boxShadow: isSelected ? "0px 4px 12px rgba(0,0,0,0.2)" : "none",
    "&:hover": {
      backgroundColor: isSelected
        ? theme.palette.primary.main
        : theme.palette.grey[300],
    },
  }}
>
  {String.fromCharCode(65 + index)}. {choice}
</Button>

                </motion.div>
              );
            })}
          </Stack>

          {/* Navigation */}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {currentQuestion > 0 && (
              <Button
                variant="outlined"
                onClick={handlePreviousQuestion}
                sx={{
                  px: 3,
                  borderRadius: 3,
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                    color: "white",
                  },
                }}
              >
                ⬅ Previous
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNextQuestion}
              sx={{
                px: 4,
                borderRadius: 3,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: "white",
                fontWeight: "bold",
                boxShadow: "0px 6px 15px rgba(0,0,0,0.3)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.4)",
                },
              }}
            >
              {currentQuestion === questions.length - 1
                ? "Finish 🎉"
                : "Next ➡"}
            </Button>
          </Box>
        </CardContent>
      </MotionCard>
    </Box>
  );
};

export default QuizCard;
