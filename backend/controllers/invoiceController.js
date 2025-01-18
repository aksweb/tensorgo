const Invoice = require('../models/Invoice');
const data = require('../data.json');

// save data into the database
// const saveDataToDB = async () => {
//     try {
//         // Insert data from data.json into the database
//         await Invoice.insertMany(data);

//         console.log('Data successfully saved to the database!');
//     } catch (error) {
//         console.error('Error saving data to the database:', error);
//     }
// };

const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ message: 'Failed to fetch invoices' });
    }
};

// saveDataToDB();
module.exports = { getInvoices };
