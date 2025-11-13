import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { fetchLeaderBoard } from "../../api/quizApi";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";

const MotionTypography = motion(Typography);

const MiniLeaderBoard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const getLeaders = async () => {
      try {
        setLoading(true);
        const response = await fetchLeaderBoard();
        const rankedData = (response?.data?.ranking || [])
          .map((item, index) => ({ ...item, index: index + 1 }))
          .slice(0, 3);
        setLeaders(rankedData || []);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };
    getLeaders();
  }, []);

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
          background: theme.palette.background.alt,
          p: 4,
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
          gutterBottom
          marginBottom={3}
          color={theme.palette.text.primary}
        >
          Leaderboard
        </MotionTypography>

        {/* Content */}
        <CardContent>
          {loading ? (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          ) : leaders.length > 0 ? (
            leaders.map((user, i) => (
              <motion.div
                key={user._id || i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={user.avatar} alt={user.username} />
                    <Typography variant="body1" fontSize={18} fontWeight="500">
                      {user.username}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    fontWeight="600"
                    color="text.secondary"
                  >
                    {user.points} pts
                  </Typography>
                </Box>
              </motion.div>
            ))
          ) : (
            <Typography variant="body1" align="center" color="text.secondary">
              No leaderboard data available.
            </Typography>
          )}
        </CardContent>

        {/* Button */}
        <Box textAlign="center" mt={5}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 4, py: 1.5, borderRadius: 3 }}
              onClick={() => navigate("/dashboard/leaderboard")}
            >
              View Full Leaderboard
            </Button>
          </motion.div>
        </Box>
      </Card>
    </motion.div>
  );
};

export default MiniLeaderBoard;
