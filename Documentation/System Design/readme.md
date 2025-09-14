
## 📊 Diagrams

- **Activity Diagram**  
  Shows the step-by-step workflow of a user performing trading actions (sign in → buy/sell → portfolio update).  
  ![activity-diagram](./Activity_Diagram.png)

- **Architecture Diagram**  
  High-level overview of system components: Client (React), Server (Express API), Database (MongoDB Atlas), and AlphaVantage API.  
  ![architect-diagram](./Architect_Diagram.png)

- **Component Diagram**  
  Breaks down the application into functional components (Authentication, Portfolio, Trading, Quiz, Leaderboard) and shows their interactions.  
  ![component-diagram](./Component_Diagram.png)

- **Deployment Diagram**  
  Explains where and how the app runs: React frontend, Node/Express backend, MongoDB Atlas (cloud), and AlphaVantage external API.  
  ![deployment-diagram](./Deploy_Diagram.png) 

- **Entity Relationship (ER) Diagram**  
  Defines database tables (Users, Trades, Holdings, Transactions, Leaderboard, Quizzes) and relationships (1-to-many, many-to-one).  
  ![er-diagram](./ER_Diagram.png)

- **Sequence Diagram 1 – Trading Flow**  
  Demonstrates the sequence of events when a user places a trade (request → validation → DB update → response).  
  ![seq-diagram_1](./Sequance_Diagram_1.png)

- **Sequence Diagram 2 – Quiz Flow**  
  Illustrates how the user attempts a quiz, data is stored, and leaderboard updates accordingly.  
  ![seq-diagram_2](./Sequence_Diagram_2.png)


## 🔗 API Contract (Swagger/OpenAPI)

- **AlphaVantage Market Data API (Wrapped)**  
  Backend endpoints for stock market data (`/market/price`, `/market/candle`, `/market/top-gainers`, `/market/top-losers`, `/market/most-active`) using AlphaVantage as the data source.

  [api-contract](./API%20Contract.docx)
---

## 📌 Summary

- Provides **visual diagrams** for system understanding.  
- Defines **database schema** and entity relationships.  
- Documents **REST API contracts** for market data integration.  
- Forms the foundation for a scalable and maintainable trading application.
