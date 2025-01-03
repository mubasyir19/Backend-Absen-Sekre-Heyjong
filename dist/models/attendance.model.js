"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attendance = void 0;
const mongoose_1 = require("mongoose");
var PositionGuest;
(function (PositionGuest) {
    PositionGuest["GUEST"] = "guest";
    PositionGuest["STAFF"] = "staff";
    PositionGuest["MEMBER"] = "member";
})(PositionGuest || (PositionGuest = {}));
const attendanceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        enum: Object.values(PositionGuest),
        default: PositionGuest.GUEST,
        required: true,
    },
    institution: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.Attendance = (0, mongoose_1.model)('Attendance', attendanceSchema);
