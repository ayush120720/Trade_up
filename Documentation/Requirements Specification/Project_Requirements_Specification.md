# 📑 Project Requirements Specification

---

## ✅ Functional Requirements

### 🔐 User Management & Authentication
- Users must be able to sign up with email/username and password.  
- Users must be able to log in securely with JWT authentication.  
- Users must be able to log out of the system.  
- Users must be able to view and update their profile.  

### 💹 Paper Trading Simulation
- Users must be able to search for stocks by ticker symbol.  
- Users must be able to view real-time stock data (via Alpha Vantage API).  
- Users must be able to buy stocks with virtual money.  
- Users must be able to sell previously purchased stocks.  
- The system must update user portfolio balance after each transaction.  
- Users must be able to view transaction history (past buy/sell records).  
- The dashboard must display portfolio performance (current holdings, gains/losses).  

### 🎮 Gamified Quizzes
- Users must be able to attempt quizzes on stock market concepts.  
- Each quiz must contain questions with multiple-choice answers.  
- Users must earn virtual currency or points for correct answers.  
- The system must store and display quiz results and summary.  

### 🏆 Leaderboard
- The system must rank users based on quiz scores.  
- The leaderboard must display top performers (dynamic updates).  
- Users must be able to view their rank/position on the leaderboard.  

---

## ⚙️ Non-Functional Requirements

### 🚀 Performance & Scalability
- The system should fetch real-time stock data from the Alpha Vantage API with minimal delay.  
- The system should handle at least 100 concurrent users without significant performance degradation.  

### 🔒 Security
- User passwords must be stored securely (hashed & salted).  
- Authentication must use JWT tokens to protect endpoints.  
- API endpoints must be protected against unauthorized access.  

### 🎨 Usability
- The UI must be intuitive and responsive across devices (desktop + mobile).  
- Material UI components must be used for consistent design.  
- Quizzes and dashboards must be easy to navigate for first-time users.  

### 📡 Reliability & Availability
- The system must ensure data persistence in MongoDB (no loss of transaction history).  
- The application should be available with >95% uptime during active hours.  

### 🛠️ Maintainability & Modularity
- The backend must be designed with modular REST API architecture.  
- Code must follow naming conventions and documentation standards.  
- GitHub must be used for version control with branch protection.  

### 🌐 Compatibility
- The frontend must be compatible with modern browsers (Chrome, Edge, Firefox).  
- The application should support desktop-first usage (mobile responsive optional).  

### 🧪 Testability
- The system must include unit tests for core trading logic and quiz evaluation.  
- Integration tests must validate end-to-end user flows (auth → trade → quiz → leaderboard).  