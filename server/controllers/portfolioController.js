const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

require("./config/db");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const homeRoutes = require("./routes/homeRoutes");
const quizRoutes = require("./routes/quizRoutes");

const allowedOrigins = [
    "https://paper-lingo.vercel.app",
    "http://localhost:3000"
];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (mobile apps, curl, Postman)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
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

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/quiz", quizRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = app;
