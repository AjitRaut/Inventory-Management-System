const express = require('express');
const { getCustomers, createCustomer } = require('../Controllers/customercontroller');
const router = express.Router();

router.get('/', getCustomers);
router.post('/', createCustomer);

module.exports = router;
