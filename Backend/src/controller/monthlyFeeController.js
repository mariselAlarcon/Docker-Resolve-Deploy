const { validationResult } = require("express-validator");
const MonthlyFee = require("../database/models/MonthlyFee");
const { addDays } = require('date-fns');
const sendEmail = require('../services/emailService');

const monthlyFeeController = {
  list: async (req, res) => {
    try {
      const monthlyFees = await MonthlyFee.find().populate('member');;
      res.status(200).json({
        meta: {
          status: 200,
          message: "Monthly Fees retrieved successfully",
        },
        data: monthlyFees,
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
      const monthlyFee = await MonthlyFee.findById(id).populate('member');
      if (!monthlyFee) {
        return res.status(404).json({
          meta: {
            status: 404,
            message: "Monthly Fee not found",
          },
        });
      }
      res.status(200).json({
        meta: {
          status: 200,
          message: "Monthly Fee found successfully",
        },
        data: monthlyFee,
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
      let monthlyFee = new MonthlyFee(req.body);

      try {
        await monthlyFee.save();
        res.json({
          meta: {
            status: 200,
            message: "Monthly Fee created successfully",
          },
          data: monthlyFee,
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
      await MonthlyFee.deleteOne({ _id: id });
      res.json({
        meta: {
          status: 200,
          message: "Monthly Fee deleted successfully",
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
          const updatedMonthlyFee = await MonthlyFee.findByIdAndUpdate(id, req.body, { new: true }).populate('member');
          if (!updatedMonthlyFee) {
            return res.status(404).json({
              meta: {
                status: 404,
                message: "Monthly Fee not found",
              },
            });
          }
          res.json({
            meta: {
              status: 200,
              message: "Monthly Fee updated successfully",
            },
            data: updatedMonthlyFee,
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
  getByMember: async (req, res) => {
    const memberId = req.params.member;
    try {
      const monthlyFees = await MonthlyFee.find({
        member: memberId
      });
      res.status(200).json({
        meta: {
          status: 200,
          message: `Monthly Fees of ${member} retrieved successfully`,
        },
        data: monthlyFees,
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
  getDueByMember: async (req, res) => {
    //Cuota por vencer
    const memberId = req.params.member;
    try {
      const monthlyFee = await MonthlyFee.findOne({
        member: memberId
      }).sort({dueDate: -1});
      if (!monthlyFee) {
        return res.status(404).json({
          meta: {
            status: 404,
            message: "Monthly Fee not found",
          },
        });
      }
      res.status(200).json({
        meta: {
          status: 200,
          message: "Monthly Fee found successfully",
        },
        data: monthlyFee,
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

async function monthlyFeeByDue (days){
    try {
      const today = new Date();
      const dueDate = addDays(today, days);

        let monthlyFees = await MonthlyFee.find({
            dueDate: dueDate
        }).populate('member');

        if(monthlyFees){
        monthlyFees = monthlyFees.map(fee => {
            const memberName = `${fee.member.firstName} ${fee.member.lastName}`;
            const dueDateString = fee.dueDate.toLocaleDateString();
            const memberEmail = fee.member.email

            const emailMessage = `
              Hola ${memberName},

              Queremos recordarte que tu cuota vence el ${dueDateString}.

              Gracias por ser parte de nuestro gimnasio 🏋️‍♀️.

              Saludos,
              El Equipo de <strong>Resolve Gym</strong> 💛
            `;

            sendEmail(memberEmail,'Recordatorio de vencimiento de cuota 📅', emailMessage)
        })
      }
    } catch (error) {
        console.error("Error retrieving overdue monthly fees:", error.message);
        throw new Error("Error retrieving overdue monthly fees");
    }
}

module.exports = {
  monthlyFeeController,
  monthlyFeeByDue
};
