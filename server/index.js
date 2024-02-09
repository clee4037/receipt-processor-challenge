const {
  processReceipt,
  getPointsById,
  getReceiptById,
  getAllPoints,
  getAllReceipts,
} = require("./controllers");
const express = require("express");
const app = express();

const PORT = 8080;
app.use(express.json());

/* ROUTES */
app.post("/receipts/process", processReceipt);
app.get("/receipts/points", getAllPoints);
app.get("/receipts", getAllReceipts);
app.get("/receipts/:id/points", getPointsById);
app.get("/receipts/:id", getReceiptById);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
