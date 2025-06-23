import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RequestPayload } from '../data-types';
import { PrismaClient } from '../../prisma/generated/prisma';
// import { CustomRequest } from '../types';

const prisma = new PrismaClient();

export const loginAdmin = async (req: Request, res: Response): Promise<Response | any> => {
  const { username, password } = req.body;
  try {
    // const checkUser = await User.findOne({ username: username }); //mongodb
    const checkUser = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!checkUser) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
        data: null,
      });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid password',
        data: null,
      });
    }

    const user = {
      id: checkUser.id,
      name: checkUser.name,
      username: checkUser.username,
    };

    const token = jwt.sign(user, process.env.SECRET_KEY as string, {
      expiresIn: '24h',
    });

    return res.status(200).json({
      status: 200,
      message: 'login successfully',
      data: {
        id: user.id,
        name: user.name,
        access_token: token,
      },
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

export const addAdmin = async (req: Request, res: Response): Promise<Response | any> => {
  const { name, username, password } = req.body;
  try {
    // const checkUser = await User.findOne({ username: username }); //mongodb
    const checkUser = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (checkUser) {
      return res.status(404).json({
        status: 404,
        message: 'Account has registered',
        data: null,
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // const newAdmin = await User.create({ name, username, password: hashedPassword }); //mongodb
    const newAdmin = await prisma.user.create({
      data: {
        name,
        username,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      status: 200,
      message: 'login successfully',
      data: newAdmin,
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

export const protectedAuth = async (req: RequestPayload, res: Response): Promise<void> => {
  res.status(200).json({
    status: 200,
    message: 'you have access to this protected route',
    data: req.user,
  });
};
