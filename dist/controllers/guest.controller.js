"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceGuest = exports.getAttendanceGuest = void 0;
const attendance_model_1 = require("../models/attendance.model");
const getAttendanceGuest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultData = yield attendance_model_1.Attendance.find();
        return res.status(200).json({
            status: 200,
            message: 'success get data attendance',
            data: resultData,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'An error occured ',
            data: null,
        });
    }
});
exports.getAttendanceGuest = getAttendanceGuest;
const attendanceGuest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, position, institution, purpose } = req.body;
    try {
        const addGuest = yield attendance_model_1.Attendance.create({
            name: name,
            position: position,
            institution: institution,
            purpose: purpose,
        });
        return res.status(201).json({
            status: 201,
            message: 'successfully absent',
            data: addGuest,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'An error occured ',
            data: null,
        });
    }
});
exports.attendanceGuest = attendanceGuest;
