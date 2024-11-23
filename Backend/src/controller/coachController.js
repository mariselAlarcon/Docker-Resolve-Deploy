const Coach = require("../database/models/Coach");
const { validationResult } = require("express-validator");

const coachController = {
    list: async (req, res) => {
        try {
            const coaches = await Coach.find().populate('workArea');
            res.status(200).json({
                meta: {
                    status: 200,
                    message: "Coaches retrieved successfully",
                },
                data: coaches
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
          const coach = await Coach.findById(id);
          if (!coach) {
            return res.status(404).json({
              meta: {
                status: 404,
                message: "Coach not found",
              },
            });
          }
          res.status(200).json({
            meta: {
              status: 200,
              message: "Coach found successfully",
            },
            data: coach,
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
          let coach = new Coach({
            ...req.body,
            img: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
              },
          });
          try {
            await coach.save();
            res.json({
              meta: {
                status: 200,
                message: "Coach created successfully",
              },
              data: coach,
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
          await Coach.deleteOne({ _id: id });
          res.json({
            meta: {
              status: 200,
              message: "Coach deleted successfully",
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
          let updatedCoach = {
            ...req.body,
            img: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
              },
          };
          try {
            await Coach.updateOne({ _id: id }, updatedCoach);
            res.json({
              meta: {
                status: 200,
                message: "Coach updated successfully",
              },
              data: updatedCoach,
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
    
    module.exports = coachController;