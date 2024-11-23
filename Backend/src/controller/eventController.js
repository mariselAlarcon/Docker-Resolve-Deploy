const Event = require("../database/models/Event");
const { validationResult } = require("express-validator");
const moment = require('moment-timezone');

const eventController = {
    list: async (req, res) => {
        try {
            const events = await Event.find();
            res.status(200).json({
                meta: {
                    status: 200,
                    message: "Event retrieved successfully",
                },
                data: events
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
          const event = await Event.findById(id);
          if (!event) {
            return res.status(404).json({
              meta: {
                status: 404,
                message: "Event not found",
              },
            });
          }
          res.status(200).json({
            meta: {
              status: 200,
              message: "Event found successfully",
            },
            data: event,
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
          const { date, startTime, finishTime } = req.body;

          const startDateTime = convertTimeToDate(date, startTime);
          const finishDateTime = convertTimeToDate(date, finishTime);

          let event = new Event({
            ...req.body,
            startTime: startDateTime,
              finishTime: finishDateTime
          });
          try {
            await event.save();
            res.json({
              meta: {
                status: 200,
                message: "Class created successfully",
              },
              data: event,
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
          await Event.deleteOne({ _id: id });
          res.json({
            meta: {
              status: 200,
              message: "Event deleted successfully",
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
          const { date, startTime, finishTime } = req.body;

          const startDateTime = convertTimeToDate(date, startTime);
          const finishDateTime = convertTimeToDate(date, finishTime);

          console.log("Start DateTime:", startDateTime);
          console.log("Finish DateTime:", finishDateTime);

          const updatedEvent = {
              ...req.body,
              startTime: startDateTime,
              finishTime: finishDateTime
          };
          try {
            await Event.updateOne({ _id: id }, updatedEvent);
            res.json({
              meta: {
                status: 200,
                message: "Event updated successfully",
              },
              data: updatedEvent,
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

      function convertTimeToDate(date, time) {
        const [hours, minutes] = time.split(':').map(Number);
        
        // Crear un objeto moment en la zona horaria de Argentina y establecer la hora
        const dateTime = moment.tz(date, 'America/Argentina/Buenos_Aires').set({
          hour: hours,
          minute: minutes,
          second: 0,
          millisecond: 0
      });
    
        // Convertir el objeto moment de vuelta a una fecha
        return dateTime.toDate();
    }

    module.exports = eventController;