import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

type Role = "USER" | "SERVICE_PROVIDER";

export const authenticate =
  (role: Role) =>
    (req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const token = authHeader.slice(7);

      try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
          id: string;
          role: Role;
        };

        if (decoded.role !== role) {
          return res.status(403).json({ error: "Forbidden" });
        }

        req.user = decoded;
        next();
      } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
      }
    };

