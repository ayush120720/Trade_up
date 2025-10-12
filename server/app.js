const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

require("./config/db");
const mongoose = require("mongoose");


app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        allowedHeaders: ["Authorization", "Content-Type"],
        credentials: true,
    })
);

app.options("*", cors()); // Handle preflight requests

// Ensure CORS headers are set in all responses
app.use((req, res, next) => {
    const allowedOrigins = [
        "http://localhost:3000",
    ];
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

const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

module.exports = app;
