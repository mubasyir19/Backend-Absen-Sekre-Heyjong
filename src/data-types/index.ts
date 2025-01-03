import { Request } from 'express';

export interface IDecodeJWT {
  id: string;
  name: string;
  username: string;
  iat: number;
  exp: number;
}

export interface RequestPayload extends Request {
  user?: IDecodeJWT;
}
