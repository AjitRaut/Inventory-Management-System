const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'inventory_management'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

// Setup nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ajitraut9561@gmail.com',
    pass: '7796119929'
  }
});

// User authentication routes
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;
  // Hash the password and save user to the database
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Authenticate user
});

// Product routes
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/products', (req, res) => {
  const { name, price, quantity } = req.body;
  db.query('INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)', [name, price, quantity], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId });
  });
});

// Order routes
app.post('/api/orders', (req, res) => {
  const { customerId, productId, quantity } = req.body;
  db.query('INSERT INTO orders (customer_id, product_id, quantity) VALUES (?, ?, ?)', [customerId, productId, quantity], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId });

    // Send email notification
    const mailOptions = {
      from: 'ajitraut9561@gmail.com',
      to: 'customer-email@example.com',
      subject: 'Order Confirmation',
      text: `Your order with ID ${results.insertId} has been placed successfully.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log(error);
      console.log('Email sent: ' + info.response);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
