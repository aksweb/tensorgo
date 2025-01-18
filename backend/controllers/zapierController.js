const Invoice = require('../models/Invoice');
const axios = require('axios');

const sendDueInvoicesToZapier = async (req, res) => {
    const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/21336132/2kmk40d/';
    try {
        const dueInvoices = await Invoice.find({ status: 'due' });
        if (dueInvoices.length === 0) {
            return res.status(404).json({ message: 'No due invoices found.' });
        }
        console.log(dueInvoices);

        // Send each due invoice to Zapier
        const promises = dueInvoices.map(invoice =>
            axios.post(zapierWebhookUrl, {
                id: invoice.id,
                amount: invoice.amount,
                dueDate: invoice.dueDate,
                recipientName: invoice.recipientName,
                recipientEmail: invoice.recipientEmail,
            })
        );
        await Promise.all(promises); //execute promises
        res.status(200).json({ message: 'Due invoices sent to Zapier successfully.' });
    } catch (error) {
        console.error('Error sending due invoices to Zapier:', error.message);
        res.status(500).json({ message: 'Failed to send due invoices to Zapier.' });
    }
};

module.exports = { sendDueInvoicesToZapier };
