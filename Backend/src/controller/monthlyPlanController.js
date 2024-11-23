const { validationResult } = require("express-validator");
const MonthlyPlan = require("../database/models/MonthlyPlan");

const monthlyPlanController = {
  list: async (req, res) => {
    try {
      const monthlyPlans = await MonthlyPlan.find();
      res.status(200).json({
        meta: {
          status: 200,
          message: "Monthly Plans retrieved successfully",
        },
        data: monthlyPlans,
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
      const monthlyPlan = await MonthlyPlan.findById(id);
      if (!monthlyPlan) {
        return res.status(404).json({
          meta: {
            status: 404,
            message: "Monthly Plan not found",
          },
        });
      }
      res.status(200).json({
        meta: {
          status: 200,
          message: "Monthly Plan found successfully",
        },
        data: monthlyPlan,
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
      let monthlyPlan = new MonthlyPlan(req.body);

      try {
        await monthlyPlan.save();
        res.json({
          meta: {
            status: 200,
            message: "MonthlyPlan created successfully",
          },
          data: monthlyPlan,
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
      await MonthlyPlan.deleteOne({ _id: id });
      res.json({
        meta: {
          status: 200,
          message: "Monthly Plan deleted successfully",
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
          const updatedMonthlyPlan = await MonthlyPlan.findByIdAndUpdate(id, req.body, { new: true });
          if (!updatedMonthlyPlan) {
            return res.status(404).json({
              meta: {
                status: 404,
                message: "Monthly Plan not found",
              },
            });
          }
          res.json({
            meta: {
              status: 200,
              message: "Monthly Plan updated successfully",
            },
            data: updatedMonthlyPlan,
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

module.exports = monthlyPlanController;
