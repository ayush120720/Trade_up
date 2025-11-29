import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { styled, useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { registerUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  justifyContent: "center",
  alignItems: "center",
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

// Validation helpers (industry-standard-ish)
const emailRegex = /^\S+@\S+\.\S+$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/; // allow underscores, 3-30 chars
const nameRegex = /^[a-zA-Z\s.'-]{2,50}$/; // letters, spaces, simple punctuation
const passwordRules = {
  minLength: 8,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*(),.?":{}|<>]/,
};

export default function SignUp() {
  const theme = useTheme();
  const navigate = useNavigate();

  // controlled inputs
  const [form, setForm] = useState({
    name: "",
    username: "",
    age: "",
    email: "",
    password: "",
  });

  // validation state
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    age: "",
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    username: false,
    age: false,
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");

  // per-field validation (returns error message or empty string)
  const validateField = (field, value) => {
    switch (field) {
      case "name":
        if (!value) return "Please enter your name.";
        if (!nameRegex.test(value)) return "Name should be 2–50 letters and may include spaces or .'-";
        return "";
      case "username":
        if (!value) return "Please enter a username.";
        if (!usernameRegex.test(value))
          return "Username must be 3–30 characters; letters, numbers and _ allowed.";
        return "";
      case "age": {
        if (!value) return "Please enter your age.";
        const n = Number(value);
        if (!Number.isInteger(n)) return "Age must be an integer.";
        if (n < 13) return "You must be at least 13 years old.";
        if (n > 120) return "Please enter a realistic age.";
        return "";
      }
      case "email":
        if (!value) return "Please enter your email.";
        if (!emailRegex.test(value)) return "Please enter a valid email address.";
        return "";
      case "password": {
        if (!value) return "Please enter a password.";
        if (value.length < passwordRules.minLength)
          return `Password must be at least ${passwordRules.minLength} characters.`;
        if (!passwordRules.uppercase.test(value)) return "Add at least one uppercase letter.";
        if (!passwordRules.lowercase.test(value)) return "Add at least one lowercase letter.";
        if (!passwordRules.number.test(value)) return "Add at least one number.";
        if (!passwordRules.special.test(value)) return "Add at least one special character (e.g. !@#$%).";
        return "";
      }
      default:
        return "";
    }
  };

  // validate all and set errors; returns boolean
  const validateAll = () => {
    const nextErrors = {};
    let valid = true;
    for (const key of Object.keys(form)) {
      const err = validateField(key, form[key].trim());
      nextErrors[key] = err;
      if (err) valid = false;
    }
    setErrors(nextErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    // live-validate if touched
    if (touched[name]) {
      setErrors((p) => ({ ...p, [name]: validateField(name, value.trim()) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validateField(name, value.trim()) }));
  };

  const handleTogglePassword = () => setShowPassword((s) => !s);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAuthError("");
    // Mark all as touched
    setTouched({ name: true, username: true, age: true, email: true, password: true });

    if (!validateAll()) return;

    // Prepare payload (trim inputs)
    const payload = {
      name: form.name.trim(),
      username: form.username.trim(),
      age: Number(form.age),
      email: form.email.trim(),
      password: form.password,
    };

    try {
      setIsSubmitting(true);
      const resp = await registerUser(payload); // expects backend to validate again
      // handle success (navigate to signin)
      navigate("/signin");
      console.log("register success", resp);
    } catch (err) {
      // Map server error to user-friendly message
      const serverMessage =
        err?.response?.data?.message || err?.message || "Registration failed. Try again later.";
      setAuthError(serverMessage);
      // Optionally map field-level server validation errors if backend returns them
      // e.g. err.response.data.errors = { email: 'already taken' }
      if (err?.response?.data?.errors && typeof err.response.data.errors === "object") {
        setErrors((prev) => ({ ...prev, ...err.response.data.errors }));
      }
      window.alert(serverMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
            }}
          >
            Sign up
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
            {/* Name */}
            <TextField
              id="name"
              name="name"
              label="Name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.name)}
              helperText={errors.name || ""}
              required
              fullWidth
              autoComplete="name"
              autoFocus
              inputProps={{ "aria-invalid": Boolean(errors.name) }}
            />

            {/* Username */}
            <TextField
              id="username"
              name="username"
              label="Username"
              value={form.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.username)}
              helperText={errors.username || "3–30 characters. Letters, numbers, and _ allowed."}
              required
              fullWidth
              inputProps={{ "aria-invalid": Boolean(errors.username) }}
            />

            {/* Age */}
            <TextField
              id="age"
              name="age"
              label="Age"
              value={form.age}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.age)}
              helperText={errors.age || ""}
              required
              fullWidth
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*", "aria-invalid": Boolean(errors.age) }}
            />

            {/* Email */}
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
              inputProps={{ "aria-invalid": Boolean(errors.email) }}
            />

            {/* Password */}
            <TextField
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.password)}
              helperText={
                errors.password ||
                `At least ${passwordRules.minLength} chars, include uppercase, lowercase, number and special char.`
              }
              required
              fullWidth
              autoComplete="new-password"
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

            <Button type="submit" fullWidth variant="contained" disabled={isSubmitting}>
              {isSubmitting ? "Signing up…" : "Sign up"}
            </Button>

            {authError && (
              <Typography color="error" role="alert" sx={{ textAlign: "center" }}>
                {authError}
              </Typography>
            )}

            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link href="/signin" variant="h5" sx={{ color: theme.palette.primary.main }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
}
