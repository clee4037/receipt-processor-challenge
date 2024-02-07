const { v4: uuidv4 } = require("uuid");
const {calculatePoints} = require('./middleware');

// IN-MEMORY STORAGE
const receipts = [];

const processReceipt = (req, res) => {
  try {
    // CHECK IF RECEIPT EXISTS IN MEMORY
    const duplicateReceipt = receipts.find(
      (receipt) => JSON.stringify(receipt.content) === JSON.stringify(req.body)
    );

    if (duplicateReceipt) {
      res.status(409).send('Receipt already exists in the database');
    } else {
      const processedReceipt = {
        id: uuidv4(),
        points: calculatePoints(req.body);
        content: req.body;
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

const getPointsByReceiptId = (req, res) => {
  try {
  } catch {}
};

module.exports = {
  processReceipt,
  getPointsByReceiptId,
};
