import React, { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./Theme";
import { useSelector } from "react-redux";
import LandingPage from "./pages/LandingPage/LandingPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Portfolio from "./pages/Portfolio/Portfolio";
import TransactionHistory from "./pages/Transaction/Transaction";
import BuySellNew from "./pages/Trade/BuySellNew";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
        
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<LandingPage />} />
         <Route path="/dashboard" element={<Dashboard />}>
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="transaction-history" element={<TransactionHistory />} />
            <Route path="trade" element={<BuySellNew />} />
          </Route>             

        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
