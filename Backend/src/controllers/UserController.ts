import { Request, Response } from "express";
import { User } from "../model/UserModel";
import { UserRepo } from "../repository/UserRepo";
import GroupMemberRepo from "../repository/GroupMember";

class UserController {
  // async create(req: Request, res: Response) {
  //   try {
  //     const { username, name, lastname, password } = req.body;
  //     const user = new User();
  //     user.username = username;
  //     user.name = name;
  //     user.lastname = lastname;
  //     user.password_hash = password;

  //     console.log("User Object:", user);

  //     await new UserRepo().save(user);

  //     res.status(201).json({
  //       status: "Created!",
  //       message: "Successfully created note!",
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       status: "Internal Server Error!",
  //       message: "Internal Server Error!",
  //     });
  //   }
  // }
  async delete(req: Request, res: Response) {
    try {
      let user_id = parseInt(req.params["id"]);

      await new UserRepo().delete(user_id);

      res.status(200).json({
        status: "OK!",
        message: "Successfully deleted note!",
      });
    } catch (error) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      let user_id = parseInt(req.params["id"]);

      const find_users = await new UserRepo().retrieveById(user_id);

      res.status(200).json({
        status: "OK!",
        message: "Successfully fetched note by id!",
        data: find_users,
      });
    } catch (error) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      let all_users = await new UserRepo().retriveAll();

      res.status(200).json({
        status: "OK!",
        message: "Successfully fetched all user data!",
        data: all_users,
      });
    } catch (error) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
  async update(req: Request, res: Response) {
    try {
      let user_id = parseInt(req.params["id"]);
      const user = new User();
      user.user_id = user_id;
      user.username = req.body.username;
      user.password_hash = req.body.password;
      user.name = req.body.name;
      user.lastname = req.body.lastname;
      console.log("Updating User:", user);

      const updatedUser = await new UserRepo().update(user);

      res.status(200).json({
        status: "OK!",
        message: `Successfully updated user ${user_id} !`,
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async getUserGroups(req: Request, res: Response): Promise<void> {
    try {

      const user_id = parseInt(req.params["id"]);
      const user = await new UserRepo().retrieveById(user_id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const groupMemberRepo = new GroupMemberRepo();
      const groups = await groupMemberRepo.findGroupsByUser(user_id);

      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve groups",
        error: (error as Error).message,
      });
    }
  }
}
export default new UserController();
