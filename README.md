# Smart Inventory Management System

A **full-stack Smart Inventory Management System** built using the **MERN stack**  
(**MongoDB, Express.js, React.js, Node.js**).

This system helps manage products, monitor stock levels, track expiry dates, and visualize inventory analytics through an interactive dashboard.

---
### Authentication
- Secure login using **JWT (JSON Web Tokens)**
- Protected routes
- Role-based access ready (Admin / Staff)

### Inventory Management
- Add new products
- View products in a modern card-based layout
- Automatic stock classification:
  - 🔴 Low Stock
  - 🟡 Normal Stock
  - 🔵 High Stock
- Visual indicators for quick stock analysis

### Dashboard Analytics
- Total products
- Total quantity
- Inventory value
- Low stock alerts
- Expiry alerts
- Interactive charts:
  - Bar chart (Stock per product)
  - Doughnut chart (Low / Normal / High stock)
- Hover tooltips showing exact stock values

### User Interface
- Clean and professional UI
- Responsive design
- Dashboard-style layout
- Smooth hover effects

---

## Tech Stack

### Frontend
- React.js
- Axios
- Chart.js
- react-chartjs-2
- CSS (custom modular styling)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## Project Structure

```text
frontend/
├── public/
│   └── index.html
│
├── src/
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   └── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Auth/
│   │   │   └── Login.jsx
│   │   ├── Dashboard/
│   │   │   └── Dashboard.jsx
│   │   └── Inventory/
│   │       ├── Inventory.jsx
│   │       └── AddProduct.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── styles/
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   ├── inventory.css
│   │   └── addProduct.css
│   │
│   ├── utils/
│   │   └── auth.js
│   │
│   ├── App.jsx
│   └── index.js
│
├── .env
├── package.json
└── README.md

---

## Installation & Setup
Install Node.js
Installl MongoDB Shell
Install MongoDB compass

### 1.Clone the repository
git clone https://github.com/your-username/smart-inventory-system.git

cd smart-inventory-system


### 2.Install frontend dependencies
npm install

### 3.Install dependencies (Backend)
cd backend
npm install


Environment Variable
Create a .env file in the backend folder:

PORT=5000
MONGO_URI=mongodb://localhost:27017/inventorydb
JWT_SECRET=your_secret_key


Running the Project
Start Backend Server

cd backend
npm run dev

Backend runs on:
http;//localhost:5000

Start Frontend
npm start 

Frontend runs on:
http://localhost:3000



---

## API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| POST | /api/auth/login | User login |
| POST | /api/products | Add product |
| GET | /api/products | Get all products |
| GET | /api/products/analytics | Inventory analytics |

---

## Stock Classification Logic

| Quantity | Stock Status |
|--------|-------------|
| < 5 | Low Stock |
| 5 – 20 | Normal Stock |
| > 20 | High Stock |

---

## Academic Value

This project demonstrates:
- Full-stack MERN development
- RESTful API design
- Secure authentication using JWT
- Data visualization with Chart.js
- Inventory analytics & automation
- UI/UX best practices
- Modular and scalable architecture

---

## Screenshots

Recommended screenshots:
- Login page
- Dashboard analytics
- Inventory page
- Add Product form

---

## Future Enhancements

- Edit & delete products
- Email notifications for low stock
- Export inventory reports (CSV / PDF)
- Role-based dashboards
- Cloud deployment (Vercel / Render / AWS)

