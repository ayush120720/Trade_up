import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Toolbar, IconButton } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/SidebarSlice";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import { setMode } from "../../redux/DarkModeSlice";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { motion } from "framer-motion";

// Styled AppBar
const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.default,
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export default function Header() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);

  const handleSidebarToggle = () => dispatch(toggleSidebar());

  const logoText = "TradeUp";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: 3,
            py: 1,
            minHeight: "64px",
          }}
        >
          {/* Left: Menu + Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              size="large"
              edge="start"
              onClick={() => {
                handleSidebarToggle();
              }}
              sx={{ color: theme.palette.text.primary }}
            >
              <MenuIcon sx={{ fontSize: 26 }} />
            </IconButton>

            {/* Logo Icon */}
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
            >
              <EmojiObjectsIcon
                sx={{
                  fontSize: 28,
                  color: theme.palette.primary.main,
                }}
              />
            </motion.div>

            {/* Logo Text */}
            <Box
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              sx={{
                fontFamily: "'Courier New', monospace",
                fontWeight: 700,
                fontSize: "1.6rem",
                color: theme.palette.primary.main,
                display: "flex",
                overflow: "hidden",
                position: "relative",
                ml: 0,
              }}
            >
              {/* Normal full text */}
              {!hovered && <span>{logoText}</span>}

              {/* Animated typing on hover */}
              {hovered && (
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "7ch" }}
                  transition={{ duration: 1, ease: "linear" }}
                  style={{
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {logoText}
                </motion.span>
              )}
            </Box>
          </Box>

          {/* Right: Dark/Light Mode Toggle */}
          <Box>
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{
                ml: 2,
                p: 1.2,
                borderRadius: "50%",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#1e1e1e" : "#eceff1",
                },
              }}
            >
              {theme.palette.mode === "dark" ? (
                <LightModeOutlined sx={{ fontSize: 24, color: "#ffeb3b" }} />
              ) : (
                <DarkModeOutlined sx={{ fontSize: 24, color: "#1976d2" }} />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
