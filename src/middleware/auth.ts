import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface IDecode {
  id: string;
  name: string;
  username: string;
  iat: number;
  exp: number;
}

interface RequestPayload extends Request {
  token?: string;
  user?: IDecode;
}

export const verifyAuth = (req: RequestPayload, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.status(401).json({ message: 'Authorization header missing' });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({
      status: 401,
      message: 'Unauthorized: no provided token',
      data: null,
    });
  }

  jwt.verify(token as string, process.env.SECRET_KEY!, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = decoded as IDecode;
    next();
  });
};
