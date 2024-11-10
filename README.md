<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
Fitness Tracker MVP
</h1>
<h4 align="center">A web application for fitness enthusiasts to track progress, set goals, and connect with friends.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-React-blue" alt="Framework: React">
  <img src="https://img.shields.io/badge/Frontend-JavaScript,_HTML,_CSS-red" alt="Frontend: JavaScript, HTML, CSS">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Backend: Node.js">
  <img src="https://img.shields.io/badge/Database-MongoDB-green" alt="Database: MongoDB">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/Fitness-Tracker-Social-Web-App?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/Fitness-Tracker-Social-Web-App?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/Fitness-Tracker-Social-Web-App?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository contains a Minimum Viable Product (MVP) for a fitness tracking web application built with React, JavaScript, HTML, CSS, Node.js, and MongoDB. The Fitness Tracker MVP provides a user-friendly platform for fitness enthusiasts to set goals, track their progress, and connect with friends to stay motivated.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🔐 | **User Authentication** | Securely registers and authenticates users with email and password. Allows users to manage their profiles and track progress privately. |
| 🎯 | **Goal Setting**        | Enables users to set personalized fitness goals (e.g., weight loss, distance, calories burned) with specific targets and deadlines. |
| 📈 | **Progress Tracking**     | Tracks user activity data (e.g., workouts, steps, calories) and visually displays progress towards goals using charts and graphs. |
| 👥 | **Social Sharing**       | Facilitates sharing of fitness achievements and milestones with friends on the platform through a dedicated social feed. |
| 💻 | **Responsive Design**   | Adapts the user interface seamlessly to different screen sizes (mobile, tablet, desktop) for optimal viewing on various devices. |
| 🌐 | **API Endpoint**       | A RESTful API is provided for communication between the frontend and backend, enabling data retrieval, updates, and other functionalities. |
| 🗃️ | **Data Storage**       | All user data, goals, activity logs, and social connections are securely stored and managed within a MongoDB database. |

## 📂 Structure
```text
fitness-tracker-mvp/
├── .env
├── startup.sh
├── commands.json
├── src
│   ├── components
│   │   ├── Button.jsx
│   │   ├── Modal.jsx
│   │   ├── Input.jsx
│   │   └── GoalForm.jsx
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   └── Goals.jsx
│   ├── hooks
│   │   └── useAuth.js
│   ├── context
│   │   └── AuthContext.js
│   ├── services
│   │   ├── api.js
│   │   └── auth.js
│   ├── utils
│   │   ├── helpers.js
│   │   └── validators.js
│   └── styles
│       └── global.css
├── public
│   ├── index.html
│   └── favicon.ico
├── package.json
└── webpack.config.js
```

## 💻 Installation
### 🔧 Prerequisites
- Node.js v14+
- npm 6+
- MongoDB 5.0+

### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/coslynx/Fitness-Tracker-Social-Web-App.git
   cd Fitness-Tracker-Social-Web-App
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the MongoDB database:
   ```bash
   mongod
   ```
4. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with the following:
   - `REACT_APP_API_URL`: The URL of your backend server (default: `http://localhost:3000`)
   - `REACT_APP_MONGO_URI`: The connection string for your MongoDB database (default: `mongodb://localhost:27017/fitness-tracker`)

## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1. Start the development server:
   ```bash
   npm run start
   ```
2. Access the application in your browser:
   - Web interface: [http://localhost:3000](http://localhost:3000)

## 🌐 Hosting
### 🚀 Deployment Instructions
#### Deploying to Heroku
1. Install the Heroku CLI:
   ```bash
   npm install -g heroku
   ```
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create a new Heroku app:
   ```bash
   heroku create fitness-tracker-mvp-production
   ```
4. Set up environment variables:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set REACT_APP_API_URL=https://your-app-name.herokuapp.com
   heroku config:set REACT_APP_MONGO_URI=mongodb+srv://your-mongodb-username:your-mongodb-password@your-mongodb-cluster.mongodb.net/your-database-name?retryWrites=true&w=majority 
   ```
5. Deploy the code:
   ```bash
   git push heroku main
   ```

### 🔑 Environment Variables
- `REACT_APP_API_URL`: The URL of your backend server (e.g., `https://your-app-name.herokuapp.com`)
- `REACT_APP_MONGO_URI`: The connection string for your MongoDB database (e.g., `mongodb+srv://your-mongodb-username:your-mongodb-password@your-mongodb-cluster.mongodb.net/your-database-name?retryWrites=true&w=majority`)

## 📜 API Documentation
### 🔍 Endpoints
- **POST /api/auth/register**
  - Description: Registers a new user.
  - Body: `{ "email": string, "password": string, "name": string }`
  - Response: `{ "message": string, "token": string }`
- **POST /api/auth/login**
  - Description: Authenticates a user and returns a JWT token.
  - Body: `{ "email": string, "password": string }`
  - Response: `{ "message": string, "token": string }`
- **GET /api/users/:userId**
  - Description: Retrieves user data (profile information, goals, recent activity).
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `{ "name": string, "email": string, "goals": [{ "goalType": string, "targetValue": number, "deadline": date, "progressData": [{ "date": date, "value": number }] }], "recentActivity": [{ "type": string, "date": date }] }`
- **POST /api/goals**
  - Description: Creates a new fitness goal.
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "goalType": string, "targetValue": number, "deadline": date, "description": string }`
  - Response: `{ "message": string, "goalId": string }`
- **GET /api/users/:userId/goals**
  - Description: Retrieves the user's goals.
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `{ "goals": [{ "goalType": string, "targetValue": number, "deadline": date, "progressData": [{ "date": date, "value": number }] }] }`

### 🔒 Authentication
The Fitness Tracker MVP uses JWT (JSON Web Token) authentication for securing API endpoints.

1. **Register** or **Login** to receive a JWT token.
2. Include the token in the `Authorization` header for all protected API requests:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```

### 📝 Examples
```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "john.doe@example.com", "password": "securePassword123", "name": "John Doe"}'

# Login a user
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john.doe@example.com", "password": "securePassword123"}'

# Set a new goal (requires a valid JWT token)
curl -X POST http://localhost:3000/api/goals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"goalType": "weightLoss", "targetValue": 10, "deadline": "2024-03-15", "description": "Lose 10 pounds by March 15th"}'

# Get user data (requires a valid JWT token)
curl -X GET http://localhost:3000/api/users/userId \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" 

# Get user's goals (requires a valid JWT token)
curl -X GET http://localhost:3000/api/users/userId/goals \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" 
```

## 📜 License & Attribution

### 📄 License
This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.

### 🤖 AI-Generated MVP
This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).

No human was directly involved in the coding process of the repository: Fitness-Tracker-Social-Web-App

### 📞 Contact
For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
- Website: [CosLynx.com](https://coslynx.com)
- Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>