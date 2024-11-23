const express = require("express");
const router = express.Router();

const PaymentController = require("../controller/paymentController");
const PaymentService = require("../services/paymentService");

const PaymentInstance = new PaymentController(new PaymentService());

router.get("/", function (req, res, next) {
  return res.json({
    "/payment": "generates a payment link"
  });
});

router.post("/payment", function (req, res, next) {
  PaymentInstance.getPaymentLink(req, res);
});

module.exports = router;