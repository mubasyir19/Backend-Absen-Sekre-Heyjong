"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const guest_controller_1 = require("../controllers/guest.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/welcome', (req, res) => {
    res.send('Hello World');
});
router.post('/admin/community/attendance', user_controller_1.addAdmin);
router.post('/admin/login', user_controller_1.loginAdmin);
router.get('/attendance', auth_1.verifyAuth, guest_controller_1.getAttendanceGuest);
router.post('/attendance/add', guest_controller_1.attendanceGuest);
router.get('/verify', auth_1.verifyAuth, user_controller_1.protectedAuth);
exports.default = router;
