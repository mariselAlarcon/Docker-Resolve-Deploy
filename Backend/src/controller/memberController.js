const Member = require("../database/models/Member");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

const memberController = {
    list: async (req, res) => {
        try {
            const members = await Member.find();
            res.status(200).json({
                meta: {
                    status: 200,
                    message: "Members retrieved successfully",
                },
                data: members
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
    getActiveMembers: async (req, res) => {
      try {
          const activeMembers = await Member.find({ state: 'active' });
          res.status(200).json({
              meta: {
                  status: 200,
                  message: " Active Members retrieved successfully",
              },
              data: activeMembers
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
    countActiveMembers: async (req, res) => {
    try {
        const count = await Member.countDocuments({ state: 'active' });
        res.status(200).json({
            meta: {
                status: 200,
                message: "Count of active members retrieved successfully",
            },
            data: { count }
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
          const member = await Member.findById(id);
          if (!member) {
            return res.status(404).json({
              meta: {
                status: 404,
                message: "Member not found",
              },
            });
          }
          res.status(200).json({
            meta: {
              status: 200,
              message: "Member found successfully",
            },
            data: member,
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
    getByDni: async (req, res) => {
      const dni = req.params.dni;
      try {
        const member = await Member.findOne({'personalInformation.dni':dni});
        if (!member) {
          return res.status(404).json({
            meta: {
              status: 404,
              message: "Member not found",
            },
          });
        }
        res.status(200).json({
          meta: {
            status: 200,
            message: "Member found successfully",
          },
          data: member,
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
        console.log(req.body);

        if (!errors.isEmpty()) {
          return res.status(400).json({
            meta: {
              status: 400,
              message: "Validation errors",
            },
            data: errors.array(),
          });
        } else {
          let member = new Member({
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            img: {
              data: req.file.buffer,
              contentType: req.file.mimetype,
            },
          });
          try {
            await member.save();
            res.json({
              meta: {
                status: 200,
                message: "Member created successfully",
              },
              data: member,
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
          await Member.deleteOne({ _id: id });
          res.json({
            meta: {
              status: 200,
              message: "Member deleted successfully",
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
          let updatedMember = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            img: {
              data: req.file.buffer,
              contentType: req.file.mimetype,
            },
          };
          try {
            await Member.updateOne({ _id: id }, updatedMember);
            res.json({
              meta: {
                status: 200,
                message: "Member updated successfully",
              },
              data: updatedMember,
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
      getProgressByMember: async (req, res) => {
        const id = req.params.id;
        try {
            const activeMembers = await Member.findById(id).populate('progress');
            res.status(200).json({
                meta: {
                    status: 200,
                    message: " Active Members retrieved successfully",
                },
                data: activeMembers
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
      getRoutinesByMember: async (req, res) => {
        const id = req.params.id;
        try {
            const activeMembers = await Member.findById(id).select('routines')
            .populate({
              path: 'routines',
              populate: {
                path: 'exercises',
                model: 'Exercise',
                select: '-images' // Excluye el campo images de Exercise
              }
            })
            .populate({
              path: 'routines',
              populate: {
                path: 'muscleGroupsSelected',
                model: 'MuscleGroup',
                select: '-img'
              }
            }) // Población del campo muscleGroupsSelected
            .exec();
            res.status(200).json({
                meta: {
                    status: 200,
                    message: "Routines retrieved successfully",
                },
                data: activeMembers
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
      addRoutine: async (req, res) => {
        const memberId = req.params.id;
        const newRoutineId = req.body.routine;

        console.log(newRoutineId);
        try {
          const updateResult = await Member.updateOne(
            { _id: memberId },
            { $push: { routines: newRoutineId } }
          );
          
          console.log(updateResult);

          if (updateResult.modifiedCount === 0) {
            return res.status(404).json({
              meta: {
                status: 404,
                message: "Member not found or routine already added"
              }
            });
          }
      
          res.json({
            meta: {
              status: 200,
              message: "Member updated routines successfully"
            }
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
      addProgress: async (req, res) => {
        const memberId = req.params.id;
        const newProgressId = req.body.progress;

        console.log(newProgressId);
        try {
          const updateResult = await Member.updateOne(
            { _id: memberId },
            { $push: { progress: newProgressId } }
          );
          
          console.log(updateResult);

          if (updateResult.modifiedCount === 0) {
            return res.status(404).json({
              meta: {
                status: 404,
                message: "Member not found or progress already added"
              }
            });
          }
      
          res.json({
            meta: {
              status: 200,
              message: "Member updated progress successfully"
            }
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
      changeMonthlyPlan: async (req, res) => {
        const id = req.params.id;
        const newMonthlyPlanId = req.body.monthlyPlan;

        console.log(newMonthlyPlanId);
        try {
              const updateResult = await Member.updateOne(
                { _id: id },
                { $set: { mounthlyPlan: newMonthlyPlanId } }
              );
              
              console.log(updateResult);
    
              if (updateResult.acknowledged === false) {
                return res.status(404).json({
                  meta: {
                    status: 404,
                    message: "Member not found or monhtly already added"
                  }
                });
              }
          
              res.json({
                meta: {
                  status: 200,
                  message: "Member updated progress successfully"
                }
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
    
    module.exports = memberController;