import { Request, Response } from 'express';
import { PrismaClient } from '../../prisma/generated/prisma';

const prisma = new PrismaClient();

export const getAttendanceGuest = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    // const resultData = await Attendance.find(); //mongodb
    const resultData = await prisma.attendance.findMany();

    return res.status(200).json({
      status: 200,
      message: 'success get data attendance',
      data: resultData,
    });
  } catch (error) {
    console.log('an error occured = ', error);
    return res.status(500).json({
      status: 500,
      message: 'An error occured ',
      data: null,
    });
  }
};

export const attendanceGuest = async (req: Request, res: Response): Promise<Response | any> => {
  const { name, position, institution, purpose } = req.body;
  try {
    // const addGuest = await Attendance.create({
    //   name: name,
    //   position: position,
    //   institution: institution,
    //   purpose: purpose,
    // }); // mongodb
    const addGuest = await prisma.attendance.create({
      data: {
        name: name,
        position: position,
        institution: institution,
        purpose: purpose,
      },
    });

    return res.status(201).json({
      status: 201,
      message: 'successfully absent',
      data: addGuest,
    });
  } catch (error) {
    console.log('an error occured = ', error);
    return res.status(500).json({
      status: 500,
      message: 'An error occured ',
      data: null,
    });
  }
};
