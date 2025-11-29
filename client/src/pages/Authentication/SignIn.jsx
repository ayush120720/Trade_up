import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled, useTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import ForgotPassword from "../../components/Authentication/ForgotPassword";
import { loginUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/UserSlice";
import { storeToken, storeUserInfo } from "../../auth";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  position: "relative",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
  },
}));

// simple email regex (sufficient for client-side validation)
const emailRegex = /^\S+@\S+\.\S+$/;

export default function SignIn() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // controlled input state
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // validation and UI state
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClickOpen = () => setOpenForgot(true);
  const handleClose = () => setOpenForgot(false);
  const handleTogglePassword = () => setShowPassword((s) => !s);

  const validateField = (field, value) => {
    if (field === "email") {
      if (!value) return "Please enter your email.";
      if (!emailRegex.test(value)) return "Please enter a valid email address.";
      return "";
    }
    if (field === "password") {
      if (!value) return "Please enter your password.";
      if (value.length < 6) return "Password must be at least 6 characters long.";
      return "";
    }
    return "";
  };

  const validateAll = () => {
    const nextErrors = {
      email: validateField("email", form.email.trim()),
      password: validateField("password", form.password),
    };
    setErrors(nextErrors);
    return !nextErrors.email && !nextErrors.password;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (touched[name]) {
      setErrors((p) => ({ ...p, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAuthError("");
    // mark all touched
    setTouched({ email: true, password: true });

    if (!validateAll()) return;

    const payload = {
      email: form.email.trim(),
      password: form.password,
    };

    try {
      setIsSubmitting(true);
      const resp = await loginUser(payload);
      const token = resp?.token;

      if (token) {
        storeToken(token);
        storeUserInfo(resp.user);
        dispatch(setUser(resp.user));
        navigate("/dashboard/home");
      } else {
        const msg = "No token received from server.";
        setAuthError(msg);
        window.alert(msg);
      }
    } catch (err) {
      const serverMsg = err?.response?.data?.message || err?.message || "Sign in failed. Try again.";
      setAuthError(serverMsg);

      // if backend provides field errors: { errors: { email: '...' } }
      if (err?.response?.data?.errors && typeof err.response.data.errors === "object") {
        setErrors((prev) => ({ ...prev, ...err.response.data.errors }));
      }

      window.alert(serverMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
            }}
          >
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.email)}
              helperText={errors.email || ""}
              required
              fullWidth
              autoComplete="email"
              autoFocus
              inputProps={{ "aria-invalid": Boolean(errors.email) }}
            />

            <TextField
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.password)}
              helperText={errors.password || ""}
              required
              fullWidth
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={handleTogglePassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              inputProps={{ "aria-invalid": Boolean(errors.password) }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="h6"
                sx={{
                  alignSelf: "baseline",
                  marginBottom: "0.5rem",
                  color: theme.palette.primary.main,
                }}
              >
                Forgot your password?
              </Link>
            </Box>

            <ForgotPassword open={openForgot} handleClose={handleClose} />

            <Button type="submit" fullWidth variant="contained" disabled={isSubmitting}>
              {isSubmitting ? "Signing in…" : "Sign in"}
            </Button>

            {authError && (
              <Typography color="error" role="alert" sx={{ textAlign: "center" }}>
                {authError}
              </Typography>
            )}

            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                variant="h5"
                sx={{
                  alignSelf: "center",
                  color: theme.palette.primary.main,
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
