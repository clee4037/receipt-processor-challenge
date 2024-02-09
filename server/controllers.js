const { v4: uuidv4 } = require("uuid");
const { calculatePoints } = require("./middleware");

// IN-MEMORY STORAGE
const receipts = {};

// Adding example to storage
const mm = require("../examples/m&m-receipt.json");
receipts["example-id"] = { points: 109, content: mm };

const processReceipt = (req, res) => {
  try {
    const duplicateReceipt = Object.values(receipts).find(
      (receipt) => JSON.stringify(receipt.content) === JSON.stringify(req.body)
    );

    if (duplicateReceipt) {
      res.status(409).send("The receipt already exists");
    } else {
      const id = uuidv4();
      receipts[id] = {
        points: calculatePoints(req.body),
        content: req.body,
      };
      res.status(201).send({ id });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "The receipt is invalid" });
  }
};

const getPointsById = (req, res) => {
  try {
    if (receipts[req.params.id]) {
      res.status(200).send({ points: receipts[req.params.id].points });
    } else {
      res.status(404).send({ error: "No receipt found for that id" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Error retrieving points" });
  }
};

const getReceiptById = (req, res) => {
  try {
    if (receipts[req.params.id]) {
      res.status(200).send({ receipt: receipts[req.params.id].content });
    } else {
      res.status(404).send({ error: "No receipt found for that id" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Error retrieving points" });
  }
};

/* EXTRA */
const getAllPoints = (req, res) => {
  try {
    const ids = Object.keys(receipts);
    if (ids.length > 0) {
      const allPoints = ids.reduce((accumulator, id) => {
        accumulator[id] = receipts[id].points;
        return accumulator;
      }, {});
      res.status(200).send(allPoints);
    } else {
      res.status(404).send({ error: "No points" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Error retrieving points" });
  }
};

const getAllReceipts = (req, res) => {
  try {
    const ids = Object.keys(receipts);
    if (ids.length > 0) {
      const allReceipts = ids.reduce((accumulator, id) => {
        accumulator[id] = receipts[id].content;
        return accumulator;
      }, {});
      res.status(200).send(allReceipts);
    } else {
      res.status(404).send({ error: "No receipts" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Error retrieving receipts" });
  }
};

module.exports = {
  processReceipt,
  getPointsById,
  getReceiptById,
  getAllPoints,
  getAllReceipts,
};
