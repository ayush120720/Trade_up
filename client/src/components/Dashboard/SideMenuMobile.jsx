import React from "react";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import OptionsMenu from "./OptionsMenu";
import MenuItems from "./MenuItems";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleMobileMenu } from "../../redux/MobileMenuSlice";
import { useTheme } from "@mui/material/styles";

export default function SideMenuMobile() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobileMenuOpen = useSelector(
    (state) => state.mobileMenu.isMobileMenuOpen
  );
  const dispatch = useDispatch();
  const theme = useTheme();

  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <Drawer
      anchor="left"
      open={isMobileMenuOpen}
      onClose={() => dispatch(toggleMobileMenu())}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: "none",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: "70dvw",
          height: "100%",
        }}
      >

        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: "center", flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt={userInfo ? userInfo.name : "Guest"}
              src="/static/images/avatar/7.jpg"
              sx={{ width: 24, height: 24, cursor: "pointer" }}
            />
            <Typography component="p" variant="h6">
              {userInfo ? userInfo.name : "Guest"}
            </Typography>
          </Stack>
        </Stack>
        <Divider />

        {/* Menu Items */}
        <List>
          {MenuItems.slice(0, -1).map((item, index) => {
            const isActive = location.pathname === item.route; // ✅ safe check
            return (
              <ListItem
                button
                key={index}
                onClick={() => {
                  navigate(item.route);
                  dispatch(toggleMobileMenu());
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 128, 0, 0.08)",
                    color: theme.palette.primary.main,
                    "& .MuiSvgIcon-root": {
                      color: theme.palette.primary.main,
                    },
                  },
                  ...(isActive && {
                    backgroundColor: "rgba(0, 128, 0, 0.12)",
                    color: theme.palette.primary.main,
                    "& .MuiSvgIcon-root": {
                      color: theme.palette.primary.main,
                    },
                  }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? theme.palette.primary.main : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            );
          })}
        </List>

        <Divider />

        {/* Footer with user avatar */}
        <Stack
          direction="row"
          sx={{
            p: 2,
            gap: 1,
            alignItems: "center",
            borderTop: "1px solid",
            borderColor: "divider",
            mt: "auto",
          }}
        >
          <Avatar
            sizes="small"
            onClick={() => navigate("/profile")}
            alt={userInfo ? userInfo.name : "Guest"}
            src={userInfo?.avatar}
            sx={{ width: 36, height: 36, cursor: "pointer" }}
          />
          <Box sx={{ mr: "auto", pl: 1 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, lineHeight: "16px" }}
            >
              {userInfo ? userInfo.name : "Guest"}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {userInfo ? userInfo.email : ""}
            </Typography>
          </Box>
          <OptionsMenu />
        </Stack>
      </Stack>
    </Drawer>
  );
}
