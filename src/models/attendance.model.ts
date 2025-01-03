import { model, Schema } from 'mongoose';

enum PositionGuest {
  GUEST = 'guest',
  STAFF = 'staff',
  MEMBER = 'member',
}

interface IAttendance extends Document {
  name: string;
  position: PositionGuest;
  institution: string;
}

const attendanceSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

export const Attendance = model<IAttendance>('Attendance', attendanceSchema);
