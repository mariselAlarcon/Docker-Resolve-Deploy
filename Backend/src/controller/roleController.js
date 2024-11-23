const Role = require("../database/models/Role");

const roleController = {
  list: async (req, res) => {
    try {
      const roles = await Role.find();
      res.status(200).json({
        meta: {
          status: 200,
          message: "Roles retrieved successfully",
        },
        data: roles,
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
      const role = await Role.findById(id).populate('exercises muscleGroupsSelected');;
      if (!role) {
        return res.status(404).json({
          meta: {
            status: 404,
            message: "Role not found",
          },
        });
      }
      res.status(200).json({
        meta: {
          status: 200,
          message: "Role found successfully",
        },
        data: role,
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
  }
};

module.exports = roleController;
