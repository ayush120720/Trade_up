# Interface Requirements

## 1. User Interface (UI) Requirements

### Login/Signup Page

* Simple, responsive form for email & password.
* Error messages for invalid credentials.
* Secure password input field.

### Dashboard

* Displays portfolio balance, holdings, transaction history, and quiz stats.
* Quick access to trading functions and quizzes.
* Responsive layout for web and mobile.

### Stock Search & Trading Interface

* Search bar for ticker symbols (e.g., AAPL, TSLA).
* Real-time stock price display with charts.
* Buttons for Buy and Sell with input fields for quantity.

### Quiz Interface

* Multiple-choice questions (MCQs) with one correct answer.
* Points or virtual currency earned for correct answers.

### Leaderboard

* Displays top users ranked by quiz performance.
* Paginated or scrollable list for large number of users.

### Profile & Settings

* Option to update profile details.

---

## 2. System Interface Requirements

### Backend APIs (Node.js + Express)

* **Authentication API:** `/auth/signup`, `/auth/login`, `/auth/logout`
* **Stock API:** `/stocks/search`, `/stocks/buy`, `/stocks/sell`, `/stocks/history`, `/stocks/portfolio`
* **Quiz API:** `/quiz/start`, `/quiz/submit`, `/quiz/history`
* **Leaderboard API:** `/leaderboard/top`, `/leaderboard/me`

### Third-Party API Integration

* Alpha Vantage API for fetching real-time stock market data (price, volume, trends).
* REST interface with JSON responses integrated via Axios in frontend.

### Database Interface

* MongoDB with Mongoose ORM.
* **Collections:** Users, Transactions, Portfolio, Quizzes, Leaderboard.
* APIs communicate with DB through schema-based models.

---

## 3. Non-Functional Interface Requirements

* **Responsive Design:** Application must work on both desktop and mobile browsers.
* **Usability:** Intuitive UI with Material UI components for consistent look and feel.
* **Security:**

  * JWT-based authentication for API access.
  * Password hashing before storage.
  * HTTPS for secure data transmission (deployment stage).

---