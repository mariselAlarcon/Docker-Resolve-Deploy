const { validationResult } = require("express-validator");
const Progress = require("../database/models/Progress");

const progressController = {
  list: async (req, res) => {
    try {
      const progress = await Progress.find();
      res.status(200).json({
        meta: {
          status: 200,
          message: "Progress retrieved successfully",
        },
        data: progress,
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
      const progress = await Progress.findById(id);
      if (!progress) {
        return res.status(404).json({
          meta: {
            status: 404,
            message: "Progress not found",
          },
        });
      }
      res.status(200).json({
        meta: {
          status: 200,
          message: "Progress found successfully",
        },
        data: progress,
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
      const images = [];

      if(req.files)
        {
          images = req.files.map(file => ({
        data: file.buffer,
        contentType: file.mimetype,
      }));
        } 

      let progress = new Progress({
        ...req.body,
        images: images,
      });

      try {
        await progress.save();
        res.json({
          meta: {
            status: 200,
            message: "Progress created successfully",
          },
          data: progress,
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
      await Progress.deleteOne({ _id: id });
      res.json({
        meta: {
          status: 200,
          message: "Progress deleted successfully",
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
        const images = req.files.map(file => ({
          data: file.buffer,
          contentType: file.mimetype,
        }));
  
        const progress = {
          ...req.body,
          images: images,
        };
        
        const updatedProgress = await Progress.findByIdAndUpdate(id, progress, { new: true }).populate('role');
        if (!updatedProgress) {
          return res.status(404).json({
            meta: {
              status: 404,
              message: "Progress not found",
            },
          });
        }
        res.json({
          meta: {
            status: 200,
            message: "Progress updated successfully",
          },
          data: updatedProgress,
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

module.exports = progressController;
