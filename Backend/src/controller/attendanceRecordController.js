const AttendanceRecord = require("../database/models/AttendanceRecord");
const Member = require("../database/models/Member");
const { validationResult } = require("express-validator");
const mongoose = require('mongoose');

const attendanceRecordController = {
    list: async (req, res) => {
        try {
            const attendanceRecords = await AttendanceRecord.find().populate('member');
            res.status(200).json({
                meta: {
                    status: 200,
                    message: "Attendance Records retrieved successfully",
                },
                data: attendanceRecords
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
    findByMemberAndMonth: async (req, res) => {
        const { memberId, year, month } = req.params;
        console.log(memberId, year, month);
        try {
            const member = await Member.findById(memberId);
            if (!member) {
                return res.status(404).json({
                    meta: {
                        status: 404,
                        message: 'Member not found'
                    }
                });
            }

            const startDate = new Date(year, month - 1, 1, -3, 0, 0, 0);
            
            const endDate = new Date(year, month, 0, 20, 59, 59, 999);

            console.log(startDate, endDate);

            const attendanceRecords = await AttendanceRecord.find({
                member: memberId,
                date: {
                    $gte: startDate,
                    $lte: endDate
                }
            });

            res.status(200).json({
                meta: {
                    status: 200,
                    message: 'Attendance records retrieved successfully'
                },
                data: attendanceRecords
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                meta: {
                    status: 500,
                    message: 'Internal Server Error'
                }
            });
        }
    },
    getById: async (req, res) => {
        const id = req.params.id;
        try {
            const attendanceRecord = await AttendanceRecord.findById(id);
            if (!attendanceRecord) {
                return res.status(404).json({
                    meta: {
                        status: 404,
                        message: "Attendance Record not found",
                    },
                });
            }
            res.status(200).json({
                meta: {
                    status: 200,
                    message: "Attendance Record found successfully",
                },
                data: attendanceRecord,
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
    getByMember: async (req, res) => {
        const memberId = req.params.member; 
    
        try {
            const attendanceRecords = await AttendanceRecord.find({member: memberId});
            if (!attendanceRecords) {
                return res.status(404).json({
                    meta: {
                        status: 404,
                        message: "Attendance Records not found",
                    },
                });
            }
            res.status(200).json({
                meta: {
                    status: 200,
                    message: "Attendance Records found successfully",
                },
                data: attendanceRecords,
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
            let attendanceRecord = new AttendanceRecord({
                date: req.body.date,
                member: req.body.member
            });
            try {
                await attendanceRecord.save();
                res.json({
                    meta: {
                        status: 200,
                        message: "Attendance Record created successfully",
                    },
                    data: attendanceRecord,
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
            await AttendanceRecord.deleteOne({ _id: id });
            res.json({
                meta: {
                    status: 200,
                    message: "Attendance Record deleted successfully",
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
            let updatedAttendanceRecord = {
                date: req.body.date,
                member: req.body.member
            };
            try {
                await AttendanceRecord.updateOne({ _id: id }, updatedAttendanceRecord);
                res.json({
                    meta: {
                        status: 200,
                        message: "Attendance Record updated successfully",
                    },
                    data: updatedAttendanceRecord,
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

module.exports = attendanceRecordController;