const Exercise = require("../database/models/Exercise");
const { validationResult } = require("express-validator");

const exerciseController = {
    list: async (req, res) => {
        try {
            const exercises = await Exercise.find();
            res.status(200).json({
                meta: {
                    status: 200,
                    message: "Exercises retrieved successfully",
                },
                data: exercises
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
          const exercise = await Exercise.findById(id);
          if (!exercise) {
            return res.status(404).json({
              meta: {
                status: 404,
                message: "Exercise not found",
              },
            });
          }
          res.status(200).json({
            meta: {
              status: 200,
              message: "Exercise found successfully",
            },
            data: exercise,
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
          let exercise = new Exercise({
            ...req.body,
            img: {
              data: req.file.buffer,
              contentType: req.file.mimetype
            }
          });
          try {
            await exercise.save();
            res.json({
              meta: {
                status: 200,
                message: "Exercise created successfully",
              },
              data: exercise,
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
          await Exercise.deleteOne({ _id: id });
          res.json({
            meta: {
              status: 200,
              message: "Exercise deleted successfully",
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

          let updatedExercise ={
            ...req.body,
            img: {
              data: req.file.buffer,
              contentType: req.file.mimetype
            }
          };
        }

          try {
            await Exercise.updateOne({ _id: id }, updatedExercise);
            res.json({
              meta: {
                status: 200,
                message: "Exercise updated successfully",
              },
              data: updatedExercise,
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
      };
    module.exports = exerciseController;