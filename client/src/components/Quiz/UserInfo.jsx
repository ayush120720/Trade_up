import React from "react";
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
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";

const MotionTypography = motion(Typography);

const UserInfo = ({ name, points, balance, ranking, loading }) => {
  const theme = useTheme();
  const navigate = useNavigate();

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
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Header */}
        <MotionTypography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          // color="primary"
          color={theme.palette.text.primary}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          gutterBottom
        >
          User Info
        </MotionTypography>

        {/* Content */}
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 150 }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "primary.main",
                    fontSize: 18,
                  }}
                >
                  {name ? name.charAt(0).toUpperCase() : "User"}
                </Avatar>
              </motion.div>

              <MotionTypography
                variant="body1"
                fontSize={18}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                ⭐ Points: {points ?? "N/A"}
              </MotionTypography>

              <MotionTypography
                variant="body1"
                fontSize={18}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                💰 Balance: {balance != null ? `$${balance}` : "N/A"}
              </MotionTypography>

              <MotionTypography
                variant="body1"
                fontSize={18}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                🏆 Rank: {ranking ?? "N/A"}
              </MotionTypography>
            </>
          )}
        </CardContent>

        {/* Button */}
        <Box textAlign="center" mt={2}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 4, py: 1.5, borderRadius: 3 }}
              onClick={() => navigate("/profile")}
            >
              Edit Profile
            </Button>
          </motion.div>
        </Box>
      </Card>
    </motion.div>
  );
};

export default UserInfo;
