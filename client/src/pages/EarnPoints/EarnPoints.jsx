import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  Container,
  CircularProgress,
  Card,
  CardContent,
  Snackbar,
  Alert,
  useTheme,
  Grid,
} from "@mui/material";
import QuizCard from "../../components/Quiz/QuizCard";
import QuizRules from "../../components/Quiz/QuizRules";
import {
  convertPoints,
  fetchQuizQuestions,
  getUserDetails,
} from "../../api/quizApi";
import MiniLeaderBoard from "../../components/Quiz/MiniLeaderBoard";
import { motion } from "framer-motion";
import UserInfo from "../../components/Quiz/UserInfo";

const MotionCard = motion(Card);

const EarnPoints = () => {
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(null);
  const [pointsLoading, setPointsLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [ranking, setRanking] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();

  const startQuiz = async () => {
    setLoading(true);
    try {
      const fetchedQuestions = await fetchQuizQuestions();
      setQuestions(fetchedQuestions);
      setQuizStarted(true);
    } catch (error) {
      console.error("Failed to load quiz questions: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizEnd = async () => {
    setShowScore(true);
    try {
      await convertPoints(score);
      await fetchUserDetails();
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error converting points:", error);
    }
  };

  const fetchUserDetails = async () => {
    setPointsLoading(true);
    try {
      const response = await getUserDetails();
      setPoints(response.data.points);
      setBalance(Number(response.data.balance).toFixed(2));
      setRanking(response.data.userRank);
    } catch (error) {
      console.error("Error retrieving points:", error);
    } finally {
      setPointsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <motion.div
      style={{ overflowX: "hidden", maxWidth: "100%" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 8 }, py: 6 }}> */}
      <Container
        maxWidth={false}
        sx={{
          width: "100%",
          maxWidth: "100%", // allow child cards to stretch
          px: { xs: 2, sm: 4, md: 6 },
          py: 6,
        }}
      >
        {!quizStarted ? (
          <>
            {/* 🎯 Title */}
            <Box mb={6}>
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
                    background: theme.palette.primary.main, // ✅ same gradient as your other headers
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: 1,
                  }}
                >
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    🎯 Boost
                  </motion.span>{" "}
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  >
                    Your Knowledge,
                  </motion.span>{" "}
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  >
                    Earn Rewards 🚀
                  </motion.span>
                </Typography>
              </motion.div>
            </Box>
            {/* 🔥 Horizontal Card Layout */}
            <Grid container spacing={4}>
              {/* 📘 Quiz Rules Card */}
              <Grid item xs={12} md={4}>
                <MotionCard
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    p: 3,
                    background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.grey[100]})`,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <CardContent>
                    {/* <QuizRules /> */}
                    <QuizRules onStart={startQuiz} />
                    {/* <Box display="flex" justifyContent="center" mt={3}>
                      <Button
                        variant="contained"
                        onClick={startQuiz}
                        sx={{
                          background:
                            "linear-gradient(90deg, #1976d2, #42a5f5)",
                          color: "white",
                          fontWeight: "bold",
                          px: 4,
                          py: 1.5,
                          borderRadius: 3,
                          boxShadow: "0px 6px 15px rgba(25, 118, 210, 0.4)",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0px 8px 20px rgba(25, 118, 210, 0.6)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        🚀 Start Quiz
                      </Button>
                    </Box> */}
                  </CardContent>
                </MotionCard>
              </Grid>

              {/* 👤 User Info Card */}
              <Grid item xs={12} md={4}>
                <MotionCard
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    p: 3,
                    background: `linear-gradient(135deg, ${theme.palette.grey[50]}, ${theme.palette.grey[200]})`,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <UserInfo
                    points={points}
                    balance={balance}
                    ranking={ranking}
                    pointsLoading={pointsLoading}
                  />
                </MotionCard>
              </Grid>

              {/* 🏆 Mini Leaderboard Card */}
              <Grid item xs={12} md={4}>
                <MotionCard
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    p: 3,
                    background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.grey[100]})`,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <MiniLeaderBoard />
                </MotionCard>
              </Grid>
            </Grid>
          </>
        ) : (
          // 🎲 Quiz in Progress
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mt={8}
            px={{ xs: 2, md: 0 }}
          >
            {loading ? (
              <CircularProgress />
            ) : showScore ? (
              <MotionCard
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                sx={{
                  p: 5,
                  textAlign: "center",
                  borderRadius: 4,
                  width: "100%",
                }}
              >
                <Typography variant="h4" gutterBottom>
                  🎉 You scored {score} out of {questions.length}
                </Typography>
                <Box mt={3}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setQuizStarted(false);
                      setScore(0);
                      setShowScore(false);
                      setQuestions([]);
                    }}
                  >
                    Play Again
                  </Button>
                </Box>
              </MotionCard>
            ) : (
              <QuizCard
                questions={questions}
                score={score}
                setScore={setScore}
                setShowScore={handleQuizEnd}
              />
            )}
          </Box>
        )}
      </Container>

      {/* ✅ Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" onClose={handleSnackbarClose}>
          Points converted and added to your account 🎉
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default EarnPoints;
