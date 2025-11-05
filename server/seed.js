const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
const Transaction = require("./models/transaction");
require("./config/db");

dotenv.config();

function generateTransactionId() {
  const shortTimestamp = Date.now().toString().slice(-6);
  const randomString = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TXN${shortTimestamp}${randomString}`;
}

async function seedDatabase() {
  try {
    console.log("🧹 Clearing existing data...");
    await User.deleteMany();
    await Transaction.deleteMany();

    const usersData = [
      {
        name: "Virag Koradiya",
        username: "viragk",
        age: 22,
        email: "virag@example.com",
        password: await bcrypt.hash("<pass>", 10),
        balance: 12000,
        points: 50,
      },
      {
        name: "Aangi Shah",
        username: "aangi",
        age: 21,
        email: "aangi@example.com",
        password: await bcrypt.hash("<pass>", 10),
        balance: 10500,
        points: 40,
      },
      {
        name: "Harsh Parakh",
        username: "harshp",
        age: 22,
        email: "harsh@example.com",
        password: await bcrypt.hash("<pass>", 10),
        balance: 9500,
        points: 60,
      },
      {
        name: "Chinmai Kewlani",
        username: "chinmai",
        age: 22,
        email: "chinmai@example.com",
        password: await bcrypt.hash("<pass>", 10),
        balance: 13000,
        points: 70,
      },
      {
        name: "Vraj Sanghavi",
        username: "vraj",
        age: 22,
        email: "vraj@example.com",
        password: await bcrypt.hash("<pass>", 10),
        balance: 8900,
        points: 45,
      },
      {
        name: "Ayush Shah",
        username: "ayush",
        age: 22,
        email: "ayush@example.com",
        password: await bcrypt.hash("<pass>", 10),
        balance: 11200,
        points: 55,
      },
    ];

    const users = await User.insertMany(usersData);
    console.log("✅ Users added successfully!");

    const transactionsData = [
      {
        userId: users[0]._id,
        stockName: "AAPL",
        transactionType: "Buy",
        quantity: 5,
        pricePerShare: 180.25,
      },
      {
        userId: users[0]._id,
        stockName: "TSLA",
        transactionType: "Sell",
        quantity: 2,
        pricePerShare: 240.5,
      },
      {
        userId: users[1]._id,
        stockName: "GOOGL",
        transactionType: "Buy",
        quantity: 3,
        pricePerShare: 140.75,
      },
      {
        userId: users[2]._id,
        stockName: "MSFT",
        transactionType: "Buy",
        quantity: 4,
        pricePerShare: 310.25,
      },
      {
        userId: users[3]._id,
        stockName: "AMZN",
        transactionType: "Buy",
        quantity: 2,
        pricePerShare: 125.0,
      },
      {
        userId: users[4]._id,
        stockName: "NFLX",
        transactionType: "Sell",
        quantity: 1,
        pricePerShare: 410.75,
      },
      {
        userId: users[5]._id,
        stockName: "META",
        transactionType: "Buy",
        quantity: 6,
        pricePerShare: 320.5,
      },
    ];

   const computedTransactions = transactionsData.map((txn) => ({
  ...txn,
  totalTransactionValue: txn.quantity * txn.pricePerShare,
  dateTime: new Date(),
  transactionId: generateTransactionId(),
}));
await Transaction.insertMany(computedTransactions);
    console.log("✅ Transactions added successfully!");

    console.log("🌱 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
