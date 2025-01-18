const express = require('express');
const Router = express.Router();
const { googleAuth } = require('../controllers/authController');
const { getInvoices } = require("../controllers/invoiceController");
const { sendDueInvoicesToZapier } = require('../controllers/zapierController')

Router.get("/auth/google", googleAuth);
Router.get("/invoices", getInvoices); // get invoices
Router.post("/exezap", sendDueInvoicesToZapier); // Trigger Zapier webhook
module.exports = Router;