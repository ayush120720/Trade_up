import React, { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./Theme";
import { useSelector } from "react-redux";
import EarnPoints from "./pages/EarnPoints/EarnPoints";
import LeaderBoard from "./pages/LeaderBoard/Leaderboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Portfolio from "./pages/Portfolio/Portfolio";
import TransactionHistory from "./pages/Transaction/Transaction";
import BuySellNew from "./pages/Trade/BuySellNew";
import ConfirmPassword from "./components/Authentication/ConfirmPassword";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route
              path="/confirmpassword/:id/:token"
              element={<ConfirmPassword />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="transaction-history" element={<TransactionHistory />} />
          <Route path="earn-points" element={<EarnPoints />} />
          <Route path="leaderboard" element={<LeaderBoard />} />
          <Route path="trade" element={<BuySellNew />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
