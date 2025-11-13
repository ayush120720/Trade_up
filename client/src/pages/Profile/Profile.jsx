import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUserInfo } from "../../redux/UserSlice";
import { getProfile, updateProfile } from "../../api/auth";

import SideMenu from "../../components/Dashboard/SideMenu";
import SideMenuMobile from "../../components/Dashboard/SideMenuMobile";
import Header from "../../components/Dashboard/Header";

const MotionBox = motion(Box);

const Profile = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const userInfo = useSelector(selectUserInfo) || {};

  const [isEditable, setIsEditable] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [form, setForm] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    username: userInfo?.username || "",
    age: userInfo?.age || "",
    avatar: userInfo?.avatar || "/defaultProfile2.jpg",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        if (response.data) {
          dispatch(setUser(response.data));
          setForm(response.data);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setSnackbar({
          open: true,
          message: "Failed to load profile",
          type: "error",
        });
      }
    };
    fetchProfile();
  }, [dispatch]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await convertToBase64(file);
    setForm({ ...form, avatar: base64 });
  };

  const handleSave = async () => {
    try {
      const updatedUser = await updateProfile(form);
      dispatch(setUser(updatedUser));
      setSnackbar({
        open: true,
        message: "Profile updated successfully",
        type: "success",
      });
      setIsEditable(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setSnackbar({ open: true, message: "Update failed", type: "error" });
    }
  };
  // const handleSave1 = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("name", form.name);
  //     formData.append("email", form.email);
  //     formData.append("username", form.username);
  //     formData.append("age", form.age);

  //     // only append avatar if it's a new file (not base64 or existing url)
  //     if (form.avatar && form.avatar.startsWith("data:")) {
  //       // convert base64 to blob
  //       const byteString = atob(form.avatar.split(",")[1]);
  //       const mimeString = form.avatar
  //         .split(",")[0]
  //         .split(":")[1]
  //         .split(";")[0];
  //       const ab = new ArrayBuffer(byteString.length);
  //       const ia = new Uint8Array(ab);
  //       for (let i = 0; i < byteString.length; i++) {
  //         ia[i] = byteString.charCodeAt(i);
  //       }
  //       const blob = new Blob([ab], { type: mimeString });
  //       formData.append("avatar", blob, "avatar.png");
  //     }

  //     const updatedUser = await updateProfile(formData); // <-- updateProfile must handle multipart
  //     dispatch(setUser(updatedUser));
  //     setSnackbar({
  //       open: true,
  //       message: "Profile updated successfully",
  //       type: "success",
  //     });
  //     setIsEditable(false);
  //   } catch (err) {
  //     console.error("Error updating profile:", err);
  //     setSnackbar({ open: true, message: "Update failed", type: "error" });
  //   }
  // };

  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        {/* Sidebar desktop */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <SideMenu />
        </Box>
        {/* Sidebar mobile */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <SideMenuMobile />
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            mt: { md: 9 },
            p: { xs: 2, md: 4 },
            backgroundColor: theme.palette.background.default,
            minHeight: "100vh",
            overflow: "auto",
          })}
        >
          <Header />

          {/* Animated Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              align="center"
              sx={{
                fontWeight: "bold",
                mb: 4,
                color: theme.palette.primary.main,
              }}
            >
              👤 My Profile
            </Typography>
          </motion.div>

          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="center"
          >
            {/* Avatar Section */}
            <Grid item xs={12} md={4}>
              <MotionBox
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    src={form.avatar}
                    alt={form.name}
                    sx={{
                      width: 160,
                      height: 160,
                      border: `4px solid ${theme.palette.primary.main}`,
                      boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
                    }}
                  />
                  {isEditable && (
                    <label htmlFor="avatar-upload">
                      <IconButton
                        component="span"
                        sx={{
                          position: "absolute",
                          bottom: 10,
                          right: 10,
                          backgroundColor: theme.palette.primary.main,
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <input
                        type="file"
                        id="avatar-upload"
                        hidden
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
                </Box>
                <Typography variant="h5" fontWeight="bold">
                  {form.name || "User"}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {form.email}
                </Typography>
              </MotionBox>
            </Grid>

            {/* Details Section */}
            <Grid item xs={12} md={8}>
              <Stack spacing={3}>
                {["name", "username", "age", "email"].map((field, idx) => (
                  <motion.div
                    key={field}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <TextField
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={form[field]}
                      fullWidth
                      disabled={!isEditable}
                      onChange={(e) => handleChange(field, e.target.value)}
                    />
                  </motion.div>
                ))}
              </Stack>

              {/* Action Buttons */}
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                sx={{ mt: 4 }}
              >
                {!isEditable ? (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => setIsEditable(true)}
                    sx={{ textTransform: "none" }}
                  >
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<LockIcon />}
                      onClick={() => setIsEditable(false)}
                      sx={{ textTransform: "none" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<SaveIcon />}
                      onClick={handleSave}
                      sx={{ textTransform: "none" }}
                    >
                      Save
                    </Button>
                  </>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.type} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Profile;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
}
