import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export async function isAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user) return res.status(401).json({ error: "Unaunthenticated" });

  if (req.user.role !== "admin") return res.status(403).json({ error: "Admin access required" });

  // next
  next();
}
