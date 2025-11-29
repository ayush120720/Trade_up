import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  CircularProgress,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchLeaderBoard } from "../../api/quizApi";

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  margin: "auto",
  borderRadius: 20,
  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
  padding: theme.spacing(4),
  // background: linear-gradient(135deg, #f9fafb, ${theme.palette.grey[100]}),
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(135deg, ${theme.palette.background.alt}, ${theme.palette.background.default})`
      : `linear-gradient(135deg, #f9fafb, ${theme.palette.grey[100]})`,
}));

const PodiumBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  gap: "40px",
  marginBottom: "50px",
}));
const PlayerCard = styled(motion.div)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 20px",
  borderRadius: "16px",
  marginBottom: "12px",
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(145deg, ${theme.palette.background.alt}, ${theme.palette.background.default})`
      : `linear-gradient(145deg, #ffffff, #f3f4f6)`,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 12px rgba(255,255,255,0.05)"
      : "0 4px 12px rgba(0,0,0,0.08)",
  transition: "0.3s",
  cursor: "pointer",
}));

const Leaderboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const theme = useTheme();
  useEffect(() => {
    const getLeaderBoard = async () => {
      try {
        setIsLoading(true);
        const response = await fetchLeaderBoard();
        const rankedData = (response?.data?.ranking || []).map(
          (item, index) => ({
            ...item,
            index: index + 1,
          })
        );
        setLeaderboard(rankedData || []);
      } catch (error) {
        console.error("Error fetching leaderboard: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    getLeaderBoard();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ marginTop: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <StyledCard>
          <CardContent>
            {/* 🔥 Leaderboard Title */}
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
                    background: theme.palette.primary.main,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: 1,
                  }}
                >
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 220 }}
                  >
                    🔥Global
                  </motion.span>{" "}
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 220 }}
                  >
                    Leaderboard
                  </motion.span>
                </Typography>
              </motion.div>
            </Box>

            {isLoading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                p={3}
              >
                <CircularProgress />
              </Box>
            ) : leaderboard.length > 0 ? (
              <>
                {/* 🥇 Podium Section */}
                <PodiumBox>
                  {leaderboard.slice(0, 3).map((row, i) => (
                    <motion.div
                      key={row._id}
                      initial={{ scale: 0, y: 50 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{ delay: i * 0.2, type: "spring" }}
                      style={{
                        textAlign: "center",
                        transformOrigin: "bottom",
                      }}
                    >
                      <Avatar
                        src={row.avatar}
                        alt={row.username}
                        sx={{
                          width: i === 0 ? 110 : 90,
                          height: i === 0 ? 110 : 90,
                          border: `5px solid ${
                            i === 0
                              ? "#FFD700"
                              : i === 1
                              ? "#C0C0C0"
                              : "#CD7F32"
                          }`,
                          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                          marginBottom: 1,
                        }}
                      />
                      <Typography fontWeight="700" fontSize={18}>
                        {row.username}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {row.points} pts
                      </Typography>
                    </motion.div>
                  ))}
                </PodiumBox>

                {/* 📊 Bar Chart for Top 10 */}
                <Box sx={{ width: "100%", height: 300, mb: 5 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={leaderboard.slice(0, 10)}>
                      <defs>
                        <linearGradient
                          id="barGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={theme.palette.primary.light} // lighter blue
                            stopOpacity={1}
                          />
                          <stop
                            offset="100%"
                            stopColor={theme.palette.primary.main} // darker blue
                            stopOpacity={1}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="username" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="points"
                        // fill="#4f46e5"
                        // fill={theme.palette.primary.main}
                        fill="url(#barGradient)"
                        radius={[10, 10, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>

                {/* 🎖 Player List */}
                <Box>
                  {leaderboard.map((row, i) => (
                    <PlayerCard
                      key={row._id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Typography
                          fontWeight="700"
                          fontSize={20}
                          color={theme.palette.text.primary} // adapt to dark/light mode
                        >
                          {row.index === 1
                            ? "🥇"
                            : row.index === 2
                            ? "🥈"
                            : row.index === 3
                            ? "🥉"
                            : `#${row.index}`}
                        </Typography>
                        <Avatar src={row.avatar} alt={row.username} />

                        <Typography
                          fontWeight="600"
                          color={theme.palette.text.primary}
                        >
                          {row.username}
                        </Typography>
                      </Box>
                      <Typography
                        fontWeight="700"
                        color={theme.palette.text.secondary}
                      >
                        {row.points} pts
                      </Typography>
                    </PlayerCard>
                  ))}
                </Box>
              </>
            ) : (
              <Typography variant="h6" align="center">
                No leaderboard data available.
              </Typography>
            )}
          </CardContent>
        </StyledCard>
      </motion.div>
    </Container>
  );
};

export default Leaderboard;
