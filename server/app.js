const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

require("./service/homeService");
require("./config/db");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const homeRoutes = require("./routes/homeRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const quizRoutes = require("./routes/quizRoutes");

const allowedOrigins = [
    "https://trade-up-us.vercel.app",   
    "http://localhost:3000"             
];

app.use(
    cors({
        origin: function (origin, callback) {
 
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        allowedHeaders: ["Authorization", "Content-Type"],
        credentials: true,
    })
);

app.options("*", cors());

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/quiz", quizRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`🚀 Server started on port: ${port}`);
});

module.exports = app;

