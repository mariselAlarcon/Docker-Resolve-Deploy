const Feedback = require("../database/models/Feedback");
const { validationResult } = require("express-validator");

const feedbackController = {
    list: async (req, res) => {
        try {
            const feedbacks = await Feedback.find();
            res.status(200).json({
                meta: {
                    status: 200,
                    message: "Feedbacks retrieved successfully",
                },
                data: feedbacks
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                meta: {
                    status: 500,
                    message: "Internal Server Error",
                },
            });
        }
    },
    getById: async (req, res) => {
        const id = req.params.id;
        try {
          const feedback = await Feedback.findById(id);
          if (!feedback) {
            return res.status(404).json({
              meta: {
                status: 404,
                message: "Feedback not found",
              },
            });
          }
          res.status(200).json({
            meta: {
              status: 200,
              message: "Feedback found successfully",
            },
            data: feedback,
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
          let feedback = new Feedback({
            ...req.body
          });
          try {
            await feedback.save();
            res.json({
              meta: {
                status: 200,
                message: "Feedback created successfully",
              },
              data: feedback,
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
          await Feedback.deleteOne({ _id: id });
          res.json({
            meta: {
              status: 200,
              message: "Feedback deleted successfully",
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
          let updatedFeedback = {
            ...req.body
          };
          try {
            await Feedback.updateOne({ _id: id }, updatedFeedback);
            res.json({
              meta: {
                status: 200,
                message: "Feedback updated successfully",
              },
              data: updatedFeedback,
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
    
    module.exports = feedbackController;