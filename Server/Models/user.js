const Customer = require('../models/Customer');

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create customer
exports.createCustomer = async (req, res) => {
  const { name, email } = req.body;
  try {
    const customer = new Customer({ name, email });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Other CRUD operations...
