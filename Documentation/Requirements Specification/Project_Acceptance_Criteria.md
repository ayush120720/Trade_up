# Project Acceptance Criteria

## 1. User Authentication & Profile

* User can successfully sign up with a valid email and password.
* User can log in and receive a JWT token for session management.
* Invalid login attempts show an appropriate error message.
* Logged-in user can log out and session is terminated.
* User can update profile details (e.g., password change) and see updates reflected.

---

## 2. Paper Trading Simulation

* User can search stocks by ticker and see real-time prices from Alpha Vantage API.
* User can buy stocks if they have enough virtual balance.
* User can sell owned stocks, and portfolio updates instantly.
* User cannot sell more than owned stocks.
* All trades are recorded in a transaction history with stock name, price, and quantity.
* Portfolio dashboard shows:

  * Current holdings
  * Available balance
  * Gains/losses (absolute and %).

---

## 3. Gamified Quizzes

* Quiz presents at least 5 random MCQs from the question pool.
* Correct answers reward virtual currency, added to the trading balance.
* Wrong answers show feedback but no penalty beyond lost opportunity.
* User can view quiz summery with scores.

---

## 4. Leaderboard

* Leaderboard displays performers ranked by quiz score.
* Leaderboard updates in real-time when quiz scores change.

---

## 5. System & Non-Functional

* All pages load in under 3 seconds on standard broadband.
* Application works on Chrome, Edge, Firefox, Brave and mobile browsers.
* APIs return JSON responses with proper status codes (200, 400, 401, 500).
* JWT authentication secures all protected routes.
* Errors (e.g., insufficient funds, invalid ticker) display clear messages.
* No data loss after page refresh (state persists from DB).
* Each user is allowed to log in on only one device at a time.

---