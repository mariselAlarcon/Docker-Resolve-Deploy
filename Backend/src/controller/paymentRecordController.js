const { validationResult } = require("express-validator");
const PaymentRecord = require("../database/models/PaymentRecord");

const paymentRecordController = {
  list: async (req, res) => {
    try {
      const paymentRecords = await PaymentRecord.find().populate('fee');;
      res.status(200).json({
        meta: {
          status: 200,
          message: "Payment Records retrieved successfully",
        },
        data: paymentRecords,
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          status: 500,
          message: "Internal Server Error",
        },
        data: {
          error: error.message,
        },
      });
    }
  },
  getById: async (req, res) => {
    const id = req.params.id;
    try {
      const paymentRecord = await PaymentRecord.findById(id).populate('fee');;
      if (!paymentRecord) {
        return res.status(404).json({
          meta: {
            status: 404,
            message: "Payment Record not found",
          },
        });
      }
      res.status(200).json({
        meta: {
          status: 200,
          message: "Payment Record found successfully",
        },
        data: paymentRecord,
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          status: 500,
          message: "Internal Server Error",
        },
        data: {
          error: error.message,
        },
      });
    }
  },
  add: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        meta: {
          status: 400,
          message: "Validation errors",
        },
        data: errors.array(),
      });
    } else {
      let paymentRecord = new PaymentRecord(req.body);

      try {
        await paymentRecord.save();
        res.json({
          meta: {
            status: 200,
            message: "Payment Record created successfully",
          },
          data: paymentRecord,
        });
      } catch (error) {
        res.status(500).json({
          meta: {
            status: 500,
            message: "Error processing operation",
          },
          data: {
            error: error.message,
          },
        });
      }
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      await PaymentRecord.deleteOne({ _id: id });
      res.json({
        meta: {
          status: 200,
          message: "Payment Record deleted successfully",
        },
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          status: 500,
          message: "Error processing operation",
        },
        data: {
          error: error.message,
        },
      });
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        meta: {
          status: 400,
          message: "Validation errors",
        },
        data: errors.array(),
      });
    } else {
      try {
          const updatedPaymentRecord = await PaymentRecord.findByIdAndUpdate(id, req.body, { new: true }).populate('fee');
          if (!updatedPaymentRecord) {
            return res.status(404).json({
              meta: {
                status: 404,
                message: "Payment Record not found",
              },
            });
          }
          res.json({
            meta: {
              status: 200,
              message: "Payment Record updated successfully",
            },
            data: updatedPaymentRecord,
          });
      } catch (error) {
        res.status(500).json({
          meta: {
            status: 500,
            message: "Error processing operation",
          },
          data: {
            error: error.message,
          },
        });
      }
    }
  },
};

module.exports = paymentRecordController;
