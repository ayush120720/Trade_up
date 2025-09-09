# User Stories

## 1. User Authentication & Profile

* **US1:** As a new user, I want to sign up with my email and password, so that I can create my account.

  * **Acceptance Criteria:** Successful signup stores my info securely and confirms account creation.

* **US2:** As a registered user, I want to log in securely with my credentials, so that I can access my account.

  * **Acceptance Criteria:** JWT token is generated, and I am redirected to the dashboard.

* **US3:** As a user, I want to log out anytime, so that I can secure my account.

  * **Acceptance Criteria:** JWT token is invalidated, and I return to the login screen.

* **US4:** As a user, I want to update my profile and change my password, so that my account info stays accurate.

  * **Acceptance Criteria:** Changes are reflected immediately in the database.

---

## 2. Paper Trading Simulation

* **US5:** As a user, I want to search for stocks by ticker symbol, so that I can view stock details.

  * **Acceptance Criteria:** Search results show real-time stock data fetched from Alpha Vantage API.

* **US6:** As a user, I want to buy stocks using virtual money, so that I can simulate stock trading.

  * **Acceptance Criteria:** My portfolio balance decreases, and new stock entry is added.

* **US7:** As a user, I want to sell my owned stocks, so that I can realize profits or cut losses.

  * **Acceptance Criteria:** Portfolio updates reflect reduced holdings and updated balance.

* **US8:** As a user, I want to view my transaction history, so that I can track my trading activity.

  * **Acceptance Criteria:** Transaction records show date, ticker, price, and quantity.

---

## 3. Gamified Quizzes

* **US9:** As a user, I want to attempt stock market quizzes, so that I can test my knowledge.

  * **Acceptance Criteria:** Quiz displays random questions with multiple-choice answers.

* **US10:** As a user, I want to earn virtual currency for correct answers, so that I can use it for trading.

  * **Acceptance Criteria:** Correct answers increase my trading wallet balance.

---

## 4. Leaderboard

* **US11:** As a user, I want to view the leaderboard of top performers, so that I can compare my performance.

  * **Acceptance Criteria:** Leaderboard shows rankings based on quiz score.
