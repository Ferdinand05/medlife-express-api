import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../types/user";

const jwt_secret = process.env.JWT_SECRET as string;

if (!jwt_secret) throw Error("Invalid JWT SECRET");

export interface AuthRequest extends Request {
  user?: IUser;
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: "No token provided." });

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) return res.status(401).json({ error: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, jwt_secret);
    req.user = decoded as IUser;
    next();
  } catch (err: any) {
    if (err.name == "JsonWebTokenError") return res.status(401).json({ error: "Invalid Token" });

    return res.status(401).json({ error: err });
  }
}
