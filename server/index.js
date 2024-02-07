const express = require("express");
const app = express();
const processRouter = require("./routes/process");
const router = require("./router");
const controllers = require("./controllers");
const { processReceipt, getPointsByReceiptId } = require("./controllers");

app.use(express.json());

// EXAMPLES
const morning = require("./examples/morning-receipts.json");
const simple = require("./examples/simple-receipts.json");
const receipts = [morning, simple];

// ROUTES
router.get("/receipts/process", controllers.processReceipt);
router.get("/receipts/:id/points", controllers.getPointsByReceiptId);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
