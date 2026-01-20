const Product = require("../models/Product");

// ADD PRODUCT
exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// LOW STOCK AUTOMATION
exports.getLowStockProducts = async (req, res) => {
  try {
    const LOW_STOCK_LIMIT = 5;

    const lowStockProducts = await Product.find({
      quantity: { $lt: LOW_STOCK_LIMIT }
    });

    res.json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// EXPIRY DATE AUTOMATION
exports.getExpiringProducts = async (req, res) => {
  try {
    const today = new Date();
    const warningDate = new Date();
    warningDate.setDate(today.getDate() + 7);

    const expiringProducts = await Product.find({
      expiryDate: { $lte: warningDate }
    });

    res.json(expiringProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EXPIRED PRODUCTS
exports.getExpiredProducts = async (req, res) => {
  try {
    const today = new Date();

    const expiredProducts = await Product.find({
      expiryDate: { $lt: today }
    });

    res.json(expiredProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// INVENTORY ANALYTICS
exports.getInventoryAnalytics = async (req, res) => {
  try {
    const LOW_STOCK_LIMIT = 5;

    const products = await Product.find();

    const totalProducts = products.length;

    const totalQuantity = products.reduce(
      (sum, product) => sum + product.quantity,
      0
    );

    const totalInventoryValue = products.reduce(
      (sum, product) => sum + (product.price || 0) * product.quantity,
      0
    );

    const lowStockCount = products.filter(
      product => product.quantity < LOW_STOCK_LIMIT
    ).length;

    const today = new Date();
    const warningDate = new Date();
    warningDate.setDate(today.getDate() + 7);

    const expiringSoonCount = products.filter(
      product => product.expiryDate && product.expiryDate <= warningDate
    ).length;

    res.json({
      totalProducts,
      totalQuantity,
      totalInventoryValue,
      lowStockCount,
      expiringSoonCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
