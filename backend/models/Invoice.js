const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    purchaseDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    recipientName: { type: String, required: true },
    recipientEmail: { type: String, required: true },
    status: { type: String, enum: ['due', 'paid'], required: true },
}, {
    collection: 'tensorgoColl' // Specify the exact collection name
});

module.exports = mongoose.model('Invoices', InvoiceSchema);
