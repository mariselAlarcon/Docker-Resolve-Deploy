const Class = require("../database/models/Class");
const { validationResult } = require("express-validator");

const classController = {
    list: async (req, res) => {
        try {
            const classes = await Class.find();
            res.status(200).json({
                meta: {
                    status: 200,
                    message: "Classes retrieved successfully",
                },
                data: classes
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
          const cls = await Class.findById(id);
          if (!cls) {
            return res.status(404).json({
              meta: {
                status: 404,
                message: "Class not found",
              },
            });
          }
          res.status(200).json({
            meta: {
              status: 200,
              message: "Class found successfully",
            },
            data: cls,
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
          let cls = new Class({
            ...req.body
          });
          try {
            await cls.save();
            res.json({
              meta: {
                status: 200,
                message: "Class created successfully",
              },
              data: cls,
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
          await Class.deleteOne({ _id: id });
          res.json({
            meta: {
              status: 200,
              message: "Class deleted successfully",
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
          let updatedClass = {
            ...req.body
          };
          try {
            await Class.updateOne({ _id: id }, updatedClass);
            res.json({
              meta: {
                status: 200,
                message: "Ad updated successfully",
              },
              data: updatedClass,
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
    
    module.exports = classController;