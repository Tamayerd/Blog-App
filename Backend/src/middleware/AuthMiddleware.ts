import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const AuthMiddleware = (adminOnly: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction): any => {
    if (!req.headers.authorization) {
      return res.status(401).send("No token!");
    }

    let secretKey = process.env.JWT_SECRET_KEY || "secret";
    const token: string = req.headers.authorization.split(" ")[1];

    try {
      const credential: any = jwt.verify(token, secretKey);
      req.user = { userId: credential.userId };

      if (credential) {
        if (adminOnly && !credential.is_admin) {
          return res.status(403).send("Access denied. Admins only.");
        }
        return next();
      }
      return res.status(401).send("Token invalid");
    } catch (err) {
      return res.status(401).send("Token verification failed");
    }
  };
};

export default AuthMiddleware;
