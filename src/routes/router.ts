import { Request, Response, Router } from 'express';
import { addAdmin, loginAdmin, protectedAuth } from '../controllers/user.controller';
import { attendanceGuest, getAttendanceGuest } from '../controllers/guest.controller';
import { verifyAuth } from '../middleware/auth';

const router = Router();

router.get('/welcome', (req: Request, res: Response) => {
  res.send('Hello World');
});

router.post('/admin/community/attendance', addAdmin);

router.post('/admin/login', loginAdmin);

router.get('/attendance', getAttendanceGuest);
router.post('/attendance/add', attendanceGuest);

router.get('/verify', verifyAuth, protectedAuth);

export default router;
