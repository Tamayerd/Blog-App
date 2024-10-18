import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserRepo } from "../repository/UserRepo";

interface Payload {
  userId: number;
  email: string;
  name: string;
  username: string;
  is_admin: boolean;
}

class Authentication {
  static passwordHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async passwordCompare(
    text: string,
    encryptedText: string
  ): Promise<boolean> {
    return await bcrypt.compare(text, encryptedText);
  }

  static generateToken(
    id: number,
    email: string,
    name: string,
    username: string,
    is_admin: boolean
  ): string {
    const secretKey: string = process.env.JWT_SECRET_KEY || "my-secret";
    const payload: Payload = {
      userId: id,
      email: email,
      name: name,
      username: username,
      is_admin: is_admin,
    };
    const option = { expiresIn: process.env.JWT_EXPIRES_IN };
    return jwt.sign(payload, secretKey, option);
  }

  static validateToken(token: string): Payload | null {
    try {
      const secretKey: string = process.env.JWT_SECRET_KEY || "my-secret";
      return jwt.verify(token, secretKey) as Payload;
    } catch (err) {
      return null;
    }
  }

 static checkPermission(token: string): boolean {
  const payload = this.validateToken(token);
  if (!payload) {
    return false;
  }
  return payload.is_admin;
}

  static async authenticateUser(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token not provided" });
      throw new Error("Token not provided");
    }

    const user_id = this.getUserIdFromToken(token);
    if (!user_id) {
      res.status(404).json({ message: "User not found" });
      throw new Error("User not found");
    }

    const user = await new UserRepo().retrieveById(user_id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      throw new Error("User not found");
    }

    return user;
  }

  static getUserIdFromToken(token: string): number | null {
    const payload = this.validateToken(token);
    return payload ? payload.userId : null;
  }
}

export default Authentication;
