import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: CustomJwtPayload;
  }
}

export interface CustomJwtPayload extends JwtPayload {
  email: string;
}
