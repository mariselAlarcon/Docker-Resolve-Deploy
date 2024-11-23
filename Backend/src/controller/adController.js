const Ad = require("../database/models/Ad");
const { validationResult } = require("express-validator");

const adController = {
    list: async (req, res) => {
        try {
            const ads = await Ad.find();
            res.status(200).json({
                meta: {
                    status: 200,
                    message: "Ads retrieved successfully",
                },
                data: ads
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
          const ad = await Ad.findById(id);
          if (!ad) {
            return res.status(404).json({
              meta: {
                status: 404,
                message: "Ad not found",
              },
            });
          }
          res.status(200).json({
            meta: {
              status: 200,
              message: "Ad found successfully",
            },
            data: ad,
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
          let ad = new Ad({
            ...req.body,
            img: {
              data: req.file.buffer,
              contentType: req.file.mimetype
            }
          });
          try {
            await ad.save();
            res.json({
              meta: {
                status: 200,
                message: "Ad created successfully",
              },
              data: ad,
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
          await Ad.deleteOne({ _id: id });
          res.json({
            meta: {
              status: 200,
              message: "Ad deleted successfully",
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
          let updatedAd = {
            ...req.body,
            img: {
              data: req.file.buffer,
              contentType: req.file.mimetype
            }
          };
          try {
            await Ad.updateOne({ _id: id }, updatedAd);
            res.json({
              meta: {
                status: 200,
                message: "Ad updated successfully",
              },
              data: updatedAd,
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
    
    module.exports = adController;