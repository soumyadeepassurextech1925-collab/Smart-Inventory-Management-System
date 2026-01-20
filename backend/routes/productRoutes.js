const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
  getExpiringProducts,
  getExpiredProducts,
  getInventoryAnalytics
} = require("../controllers/productController");

// PROTECTED ROUTES
router.post("/", authMiddleware, addProduct);
router.get("/", authMiddleware, getProducts);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);
// LOW STOCK AUTOMATION ROUTE
router.get("/low-stock", authMiddleware, getLowStockProducts);
// EXPIRY AUTOMATION ROUTES
router.get("/expiring", authMiddleware, getExpiringProducts);
router.get("/expired", authMiddleware, getExpiredProducts);
// INVENTORY ANALYTICS ROUTE
router.get("/analytics", authMiddleware, getInventoryAnalytics);

module.exports = router;
