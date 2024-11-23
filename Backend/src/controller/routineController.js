const { validationResult } = require("express-validator");
const Routine = require("../database/models/Routine");

const routineController = {
  list: async (req, res) => {
    try {
      const routines = await Routine.find().populate('exercises muscleGroupsSelected');;
      res.status(200).json({
        meta: {
          status: 200,
          message: "Routines retrieved successfully",
        },
        data: routines,
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
      const routine = await Routine.findById(id).populate('exercises muscleGroupsSelected');;
      if (!routine) {
        return res.status(404).json({
          meta: {
            status: 404,
            message: "Routine not found",
          },
        });
      }
      res.status(200).json({
        meta: {
          status: 200,
          message: "Routine found successfully",
        },
        data: routine,
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
      console.log(req.body);
      let routine = new Routine(req.body);

      try {
        await routine.save();
        res.json({
          meta: {
            status: 200,
            message: "Routine created successfully",
          },
          data: routine,
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
      await Routine.deleteOne({ _id: id });
      res.json({
        meta: {
          status: 200,
          message: "Routine deleted successfully",
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
          const updatedRoutine = await Routine.findByIdAndUpdate(id, req.body, { new: true }).populate('exercises muscleGroupsSelected');
          if (!updatedRoutine) {
            return res.status(404).json({
              meta: {
                status: 404,
                message: "Routine not found",
              },
            });
          }
          res.json({
            meta: {
              status: 200,
              message: "Routine updated successfully",
            },
            data: updatedRoutine,
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

module.exports = routineController;
