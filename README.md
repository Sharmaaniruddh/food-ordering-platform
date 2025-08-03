🍽️ Food Ordering Platform
A full-stack modern food ordering platform with real-time kitchen updates, admin analytics, and beautiful responsive UI — built using the MERN stack (React + Express + PostgreSQL) with WebSockets, JSON-RPC, Docker, and professional architecture.

🔧 Tech Stack
🌐 Frontend: React.js + Vite + Tailwind CSS

🖥️ Backend: Node.js + Express.js + PostgreSQL

📡 Real-time: WebSockets (ws)

🔄 RPC: JSON-RPC over HTTP

📦 Database: PostgreSQL

🐳 Deployment Ready: Docker, docker-compose


food-ordering-platform/
├── backend/               # Node + Express + API + WebSocket + DB connection
│   ├── server.js
│   ├── wsServer.js
│   ├── db.js
│   ├── routes/
│       ├── menu.js
│       └── categories.js
│── Dockerfile.backend
│
├── frontend/              # React app with Tailwind
│   ├── src/
│       ├── App.jsx
│       ├── index.js
│       └── pages/
│           ├── Menu.jsx
│           ├── Cart.jsx
│           ├── Checkout.jsx
│           ├── OrderTracker.jsx
│           ├── Kitchen.jsx
│           └── Admin.jsx
│── Dockerfile.frontend
│
├── init/                  # SQL scripts
│   ├── 01-schema.sql
│   └── 02-seed.sql
│
├── infra/                 # Reserved for infra/docker/gitops if needed
│
├── docker-compose.yml     # Full stack Docker setup
├── PLAN.md                # Day-wise development plan
└── README.md              # Project documentation


✅ Features
🍕 View Menu Items by category

🛒 Add to Cart & LocalStorage

💳 Checkout with validation

🧾 Order submission via JSON-RPC

👨‍🍳 Live kitchen dashboard (WebSocket)

📦 Order Tracker (WebSocket)

📊 Admin analytics (Total Orders, Revenue)

🌙 Responsive UI + 3D Elements via Three.js

🐳 Docker support for full stack


🧪 How to Run Locally (Dev Setup)

1.Clone the repo:
-----------------

git clone https://github.com/Sharmaaniruddh/food-ordering-platform.git
cd food-ordering-platform


2.Install backend dependencies:
-------------------------------

cd backend
npm install

3. Install frontend dependencies:
---------------------------------

cd ../frontend
npm install

4.Setup your PostgreSQL DB locally or in Render, and create .env file in backend with:
--------------------------------------------------------------------------------------

PGHOST=localhost
PGUSER=your_user
PGPASSWORD=your_password
PGDATABASE=foodweb
PGPORT=5432

5.Run the SQL schema + seed scripts from init folder in your PostgreSQL DB.
---------------------------------------------------------------------------

6.Start backend:
----------------
cd backend
node server.js

7.Start WebSocket:
------------------
node wsServer.js

8.Start frontend:
-----------------
cd ../frontend
npm run dev

🐳 Docker Setup (Production Ready)

1. Build and start using docker-compose:
----------------------------------------
docker-compose up --build

2.To run in background (detached):
----------------------------------
docker-compose up -d

3.Services:
-----------

Frontend → http://localhost:5173

Backend (API + JSON-RPC) → http://localhost:5000

WebSocket → ws://localhost:5001

PostgreSQL → port 5432

4. Shutdown:
-------------
docker-compose down
