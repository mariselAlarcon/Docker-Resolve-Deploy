const { validationResult } = require("express-validator");
const MuscleGroup = require("../database/models/MuscleGroup");

const muscleGroupController = {
  list: async (req, res) => {
    try {
      const muscleGroups = await MuscleGroup.find({}, '-img');
      res.status(200).json({
        meta: {
          status: 200,
          message: "Muscle Groups retrieved successfully",
        },
        data: muscleGroups,
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
      const muscleGroup = await MuscleGroup.findById(id);
      if (!muscleGroup) {
        return res.status(404).json({
          meta: {
            status: 404,
            message: "Muscle Group not found",
          },
        });
      }
      res.status(200).json({
        meta: {
          status: 200,
          message: "Muscle Group found successfully",
        },
        data: muscleGroup,
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
      let muscleGroup = new MuscleGroup({
        ...req.body,
        img: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        },
      });

      try {
        await muscleGroup.save();
        res.json({
          meta: {
            status: 200,
            message: "Muscle Group created successfully",
          },
          data: muscleGroup,
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
};

module.exports = muscleGroupController;
