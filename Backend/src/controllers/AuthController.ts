import { Request, Response } from "express";
import { AuthenticationService } from "../service/Authentication";

class AuthenticationController {
  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { token, is_admin } = await new AuthenticationService().login(
        email,
        password
      );
      if (token === "") {
        res.status(400).json({
          status: "Bad Request!",
          message: "Wrong email or password!",
        });
        return;
      }
      const res_token = { type: "Bearer", token: token };
      res.status(200).json({
        status: "Ok!",
        message: "Successfully logged in!",
        result: res_token,
        is_admin: is_admin,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal server error occurred!",
      });
    }
  }

  public static async register(req: Request, res: Response): Promise<void> {
    try {

      const { name, username, email, password, lastname } = req.body;
      console.log("girdi");
      
      await new AuthenticationService().register(
        email,
        password,
        name,
        username,
        lastname
      );
      res.status(201).json({
        status: "Ok!",
        message: "User registered successfully!",
      });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal server error occurred!",
      });
    }
  }
}

export default AuthenticationController;
