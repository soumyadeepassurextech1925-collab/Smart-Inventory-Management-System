import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styling/dashboard.css";

import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analyticsRes = await API.get("/products/analytics");
        const productsRes = await API.get("/products");

        setAnalytics(analyticsRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Dashboard data load error");
      }
    };

    fetchData();
  }, []);

  if (!analytics) return <p>Loading dashboard...</p>;

  /* ---------- STOCK COUNTS ---------- */
  const lowStockCount = products.filter(p => p.quantity < 5).length;
  const normalStockCount = products.filter(
    p => p.quantity >= 5 && p.quantity <= 20
  ).length;
  const highStockCount = products.filter(p => p.quantity > 20).length;

  /* ---------- BAR CHART ---------- */
  const barData = {
    labels: products.map(p => p.name),
    datasets: [
      {
        label: "Stock Quantity",
        data: products.map(p => p.quantity),
        backgroundColor: "rgba(102, 126, 234, 0.8)",
        borderColor: "#667eea",
        borderWidth: 2
      }
    ]
  };

  /* ---------- DOUGHNUT CHART ---------- */
  const doughnutData = {
    labels: ["Low Stock", "Normal Stock", "High Stock"],
    datasets: [
      {
        data: [lowStockCount, normalStockCount, highStockCount],
        backgroundColor: ["#f44336", "#4caf50", "#42a5f5"],
        borderColor: "#ffffff",
        borderWidth: 2
      }
    ]
  };

  /* ---------- CHART OPTIONS ---------- */
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom"
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Stock: ${context.parsed.y ?? context.parsed}`;
          }
        }
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Products</h4>
          <p>{analytics.totalProducts}</p>
        </div>

        <div className="stat-card">
          <h4>Total Quantity</h4>
          <p>{analytics.totalQuantity}</p>
        </div>

        <div className="stat-card">
          <h4>Inventory Value</h4>
          <p>₹{analytics.totalInventoryValue}</p>
        </div>

        <div className="stat-card warning">
          <h4>Low Stock</h4>
          <p>{lowStockCount}</p>
        </div>

        <div className="stat-card danger">
          <h4>Expiring Soon</h4>
          <p>{analytics.expiringSoonCount}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Stock Quantity per Product</h3>
          <div className="chart-wrapper">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h3>Inventory Distribution</h3>
          <div className="chart-wrapper">
            <Doughnut data={doughnutData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
