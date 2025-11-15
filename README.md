# 🏡 Havnz-Real-Estate

> A full-stack MERN real estate platform for browsing, listing, and managing properties with advanced booking and favorites systems.

[![GitHub](https://img.shields.io/badge/GitHub-p--thanks-181717?style=flat&logo=github)](https://github.com/p-thanks/Havnz-Real-Estate)

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Auth0](https://img.shields.io/badge/Auth0-EB5424?style=flat&logo=auth0&logoColor=white)

---

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph Client["🖥️ Frontend Layer"]
        UI[React UI]
        Router[React Router]
        Auth[Auth0 SDK]
    end
    
    subgraph Server["⚙️ Backend Layer"]
        Express[Express Server]
        Routes[API Routes]
        Controllers[Business Logic]
        Middleware[Auth Middleware]
    end
    
    subgraph Data["💾 Data Layer"]
        Mongo[(MongoDB)]
        Users[Users Collection]
        Properties[Residencies Collection]
    end
    
    subgraph External["🔐 External Services"]
        Auth0[Auth0 Service]
    end
    
    UI --> Router
    Router --> Auth
    UI -->|HTTP Requests| Express
    Auth -->|JWT Token| Express
    Express --> Middleware
    Middleware --> Routes
    Routes --> Controllers
    Controllers --> Mongo
    Mongo --> Users
    Mongo --> Properties
    Express -.->|Verify Token| Auth0
    
    style Client fill:#e3f2fd
    style Server fill:#fff3e0
    style Data fill:#e8f5e9
    style External fill:#fce4ec
```

---

## 🔄 User Journey Flow

```mermaid
graph LR
    A[👤 User Visits Site] --> B{Authenticated?}
    B -->|No| C[🔐 Login via Auth0]
    B -->|Yes| D[🏠 Browse Properties]
    C --> D
    
    D --> E[🔍 Search & Filter]
    D --> F[❤️ Add to Favorites]
    D --> G[📅 Book Visit]
    D --> H[➕ List Property]
    
    E --> I[📋 View Results]
    F --> J[⭐ Saved Properties]
    G --> K[✅ Booking Confirmed]
    H --> L[🏗️ Property Listed]
    
    style A fill:#bbdefb
    style C fill:#ffccbc
    style D fill:#c8e6c9
    style I fill:#fff9c4
    style J fill:#f8bbd0
    style K fill:#b2dfdb
    style L fill:#d1c4e9
```

---

## 📊 Data Flow & API Architecture

```mermaid
sequenceDiagram
    autonumber
    participant U as 👤 User
    participant F as 🖥️ Frontend
    participant A as 🔐 Auth0
    participant B as ⚙️ Backend
    participant D as 💾 Database

    rect rgb(230, 240, 255)
        Note over U,D: Authentication Flow
        U->>F: Access Protected Page
        F->>A: Request Login
        A-->>U: Show Login Screen
        U->>A: Enter Credentials
        A-->>F: Return JWT Token
        F->>F: Store Token
    end

    rect rgb(255, 240, 230)
        Note over U,D: Browse Properties Flow
        U->>F: Browse Properties
        F->>B: GET /api/residency/allresd
        B->>D: db.residencies.find()
        D-->>B: Properties Array
        B-->>F: JSON Response
        F-->>U: Display Property Cards
    end

    rect rgb(230, 255, 240)
        Note over U,D: Add to Favorites Flow
        U->>F: Click Favorite Icon
        F->>B: POST /api/user/toFav/:id + JWT
        B->>B: Verify JWT Token
        B->>D: Update User.favResidencies
        D-->>B: Updated User
        B-->>F: Success Response
        F-->>U: Show Success Toast
    end

    rect rgb(255, 230, 240)
        Note over U,D: Book Visit Flow
        U->>F: Select Date & Book
        F->>B: POST /api/user/bookVisit/:id + JWT
        B->>D: Push to User.bookedVisits
        D-->>B: Booking Created
        B-->>F: Confirmation
        F-->>U: Display Booking Details
    end
```

---

## 🗄️ Database Schema

```mermaid
erDiagram
    USER ||--o{ RESIDENCY : owns
    USER ||--o{ BOOKING : creates
    USER ||--o{ FAVORITE : has
    
    USER {
        ObjectId _id PK
        string name
        string email UK
        string image
        array bookedVisits
        array favResidenciesID
        date createdAt
        date updatedAt
    }
    
    RESIDENCY {
        ObjectId _id PK
        string title
        string description
        number price
        string address
        string city
        string country
        string image
        object facilities
        string userEmail FK
        date createdAt
        date updatedAt
    }
    
    BOOKING {
        ObjectId bookingId
        ObjectId residencyId
        date visitDate
        string status
    }
    
    FAVORITE {
        ObjectId residencyId
        date addedAt
    }
```

---

## 🚀 Quick Start

```mermaid
graph TD
    Start([🚀 Start Setup]) --> Clone[📥 Clone Repository]
    Clone --> Backend[⚙️ Setup Backend]
    Clone --> Frontend[🖥️ Setup Frontend]
    
    Backend --> B1[npm install]
    B1 --> B2[Configure .env]
    B2 --> B3[Import Sample Data]
    B3 --> B4[npm run dev]
    
    Frontend --> F1[npm install]
    F1 --> F2[Configure .env]
    F2 --> F3[npm run dev]
    
    B4 --> Ready
    F3 --> Ready
    Ready([✅ Application Ready])
    
    style Start fill:#4caf50,color:#fff
    style Ready fill:#4caf50,color:#fff
    style Backend fill:#ff9800
    style Frontend fill:#2196f3
```

### Installation Commands

**Backend:**
```bash
git clone https://github.com/p-thanks/Havnz-Real-Estate.git
cd Havnz-Real-Estate/server
npm install
# Create .env with MongoDB & Auth0 credentials
npm run dev
```

**Frontend:**
```bash
cd ../client
npm install
# Create .env with Auth0 config
npm run dev
```

---

## 🔌 API Routes Map

```mermaid
graph LR
    subgraph Public["🌐 Public Routes"]
        A1[GET /api/residency/allresd]
        A2[GET /api/residency/:id]
    end
    
    subgraph Protected["🔒 Protected Routes"]
        B1[POST /api/user/register]
        B2[POST /api/user/bookVisit/:id]
        B3[POST /api/user/allBookings]
        B4[POST /api/user/removeBooking/:id]
        B5[POST /api/user/toFav/:rid]
        B6[POST /api/user/allFav]
        B7[POST /api/residency/create]
    end
    
    Auth{🔐 Auth0 JWT}
    
    A1 --> Response1[📋 All Properties]
    A2 --> Response2[🏠 Single Property]
    
    Auth --> B1
    Auth --> B2
    Auth --> B3
    Auth --> B4
    Auth --> B5
    Auth --> B6
    Auth --> B7
    
    B1 --> Response3[✅ User Created]
    B2 --> Response4[📅 Visit Booked]
    B3 --> Response5[📋 User Bookings]
    B4 --> Response6[❌ Booking Cancelled]
    B5 --> Response7[⭐ Favorite Toggled]
    B6 --> Response8[❤️ User Favorites]
    B7 --> Response9[🏗️ Property Created]
    
    style Public fill:#c8e6c9
    style Protected fill:#ffccbc
    style Auth fill:#ffd54f
```

---

## 🎯 Features Overview

```mermaid
mindmap
  root((🏡 Havnz))
    Authentication
      Auth0 Integration
      JWT Tokens
      Secure Routes
      Session Management
    
    Property Management
      Browse Properties
      Search & Filter
      Property Details
      Create Listings
      Update Listings
    
    User Features
      Favorites System
      Visit Booking
      Booking History
      User Dashboard
      Profile Management
    
    Technical
      RESTful API
      MongoDB
      React Frontend
      Express Backend
      Responsive Design
```

---

## 🔐 Auth0 Configuration

```mermaid
graph TD
    A[Create Auth0 Account] --> B[Create Application]
    B --> C[Select SPA Type]
    C --> D[Create API]
    D --> E[Configure URLs]
    
    E --> E1[Callback URLs]
    E --> E2[Logout URLs]
    E --> E3[Web Origins]
    E --> E4[CORS Origins]
    
    E1 --> F[Get Credentials]
    E2 --> F
    E3 --> F
    E4 --> F
    
    F --> G[Update .env Files]
    G --> H[Backend .env]
    G --> I[Frontend .env]
    
    H --> J[AUTH0_ISSUER_BASE_URL]
    H --> K[AUTH0_AUDIENCE]
    
    I --> L[VITE_AUTH0_DOMAIN]
    I --> M[VITE_AUTH0_CLIENT_ID]
    
    style A fill:#4caf50
    style G fill:#ff9800
    style H fill:#2196f3
    style I fill:#9c27b0
```

---

## 📈 Application State Flow

```mermaid
stateDiagram-v2
    [*] --> Landing: User Visits
    Landing --> Authentication: Click Login
    Authentication --> Authenticated: Success
    Authentication --> Landing: Cancel
    
    Authenticated --> BrowseProperties: Navigate
    BrowseProperties --> PropertyDetails: Select Property
    PropertyDetails --> AddFavorite: Click Favorite
    PropertyDetails --> BookVisit: Click Book
    PropertyDetails --> BrowseProperties: Go Back
    
    AddFavorite --> PropertyDetails: Added
    BookVisit --> BookingConfirmed: Submit Date
    BookingConfirmed --> UserDashboard: View Bookings
    
    Authenticated --> ListProperty: Create Listing
    ListProperty --> PropertyForm: Fill Details
    PropertyForm --> PropertyCreated: Submit
    PropertyCreated --> UserDashboard: View Listings
    
    UserDashboard --> BrowseProperties: Browse More
    UserDashboard --> [*]: Logout
```

---

## 🛠️ Tech Stack Breakdown

```mermaid
graph TB
    subgraph Frontend["Frontend Stack"]
        React[React 18]
        Router[React Router v6]
        Axios[Axios]
        Toast[React Toastify]
        Day[Day.js]
        A0[Auth0 React SDK]
    end
    
    subgraph Backend["Backend Stack"]
        Node[Node.js]
        Express[Express.js]
        Mongoose[Mongoose ODM]
        Handler[Async Handler]
        CORS[CORS]
        Cookie[Cookie Parser]
        Auth0B[Auth0 JWT Bearer]
    end
    
    subgraph Database["Database"]
        Mongo[(MongoDB)]
        Atlas[MongoDB Atlas]
    end
    
    subgraph DevOps["Development Tools"]
        Nodemon[Nodemon]
        Vite[Vite]
        ESLint[ESLint]
        Dotenv[Dotenv]
    end
    
    Frontend -.->|HTTP| Backend
    Backend -.->|ODM| Database
    DevOps -.->|Development| Frontend
    DevOps -.->|Development| Backend
    
    style Frontend fill:#61dafb,color:#000
    style Backend fill:#339933,color:#fff
    style Database fill:#47a248,color:#fff
    style DevOps fill:#ffd700,color:#000
```

---

## 📦 Environment Variables

```mermaid
graph LR
    subgraph Backend[".env - Backend"]
        B1[PORT=5000]
        B2[DATABASE_URL]
        B3[AUTH0_ISSUER_BASE_URL]
        B4[AUTH0_AUDIENCE]
    end
    
    subgraph Frontend[".env - Frontend"]
        F1[VITE_AUTH0_DOMAIN]
        F2[VITE_AUTH0_CLIENT_ID]
        F3[VITE_AUTH0_AUDIENCE]
        F4[VITE_API_URL]
    end
    
    Backend --> Server[Express Server]
    Frontend --> Client[React App]
    
    style Backend fill:#ff9800
    style Frontend fill:#2196f3
```

---

## 🚀 Deployment Flow

```mermaid
graph TD
    Code[💻 Code Changes] --> Git[📦 Git Push]
    Git --> CI{🔄 CI/CD Pipeline}
    
    CI -->|Build| B1[Build Frontend]
    CI -->|Build| B2[Build Backend]
    
    B1 --> Test1[🧪 Run Tests]
    B2 --> Test2[🧪 Run Tests]
    
    Test1 --> Deploy1[☁️ Deploy to Vercel]
    Test2 --> Deploy2[☁️ Deploy to Heroku/Railway]
    
    Deploy1 --> Prod[🌐 Production]
    Deploy2 --> Prod
    
    Prod --> Monitor[📊 Monitor]
    Monitor --> Logs[📝 Logs]
    Monitor --> Metrics[📈 Metrics]
    
    style Code fill:#4caf50
    style Prod fill:#2196f3
    style Monitor fill:#ff9800
```

---

## 🤝 Contributing

```mermaid
gitGraph
    commit id: "Initial Commit"
    commit id: "Setup Backend"
    branch feature/auth
    checkout feature/auth
    commit id: "Add Auth0"
    commit id: "JWT Middleware"
    checkout main
    merge feature/auth
    branch feature/properties
    checkout feature/properties
    commit id: "Property CRUD"
    commit id: "Add Search"
    checkout main
    merge feature/properties
    commit id: "Release v1.0"
```

**Steps:**
1. Fork the repo
2. Create feature branch
3. Make changes
4. Create pull request
5. Code review
6. Merge to main

---

## 📞 Support & Links

- 📧 Email: support@havnz.com
- 🐛 [Report Issues](https://github.com/p-thanks/Havnz-Real-Estate/issues)
- 💻 [GitHub Repository](https://github.com/p-thanks/Havnz-Real-Estate)
- 👤 [Developer Profile](https://github.com/p-thanks)

---

## 📄 License

MIT © 2024 Havnz-Real-Estate

## 👥 Author

**p-thanks** - [GitHub Profile](https://github.com/p-thanks)

---

<div align="center">

**Made with ❤️ using MERN Stack**

**[⬆ Back to Top](#-havnz-real-estate)**

[![GitHub stars](https://img.shields.io/github/stars/p-thanks/Havnz-Real-Estate?style=social)](https://github.com/p-thanks/Havnz-Real-Estate)
[![GitHub forks](https://img.shields.io/github/forks/p-thanks/Havnz-Real-Estate?style=social)](https://github.com/p-thanks/Havnz-Real-Estate/fork)

</div>
