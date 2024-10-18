import { User } from "../model/UserModel";
import { UserRepo } from "../repository/UserRepo";
import Authentication from "../utils/Authentication";

interface IAuthenticationService {
  login(
    email: string,
    password: string
  ): Promise<{ token: string; is_admin: boolean }>;
  register(
    email: string,
    password: string,
    name: string,
    lastname: string,
    username: string
  ): Promise<void>;
}

export class AuthenticationService implements IAuthenticationService {
  async login(
    email: string,
    password: string
  ): Promise<{ token: string; is_admin: boolean }> {
    const users = await new UserRepo().findByEmail(email);
    if (!users) {
      throw new Error("Bad Request!");
    }

    const compare = await Authentication.passwordCompare(
      password,
      users.password_hash
    );

    if (compare) {
      const token = Authentication.generateToken(
        users.user_id,
        users.email,
        users.name,
        users.username,
        users.is_admin
      );
      return { token, is_admin: users.is_admin };
    }

    return { token: "", is_admin: false };
  }

  async register(
    email: string,
    password: string,
    name: string,
    username: string,
    lastname: string
  ): Promise<void> {
    try {
      const existingUserByEmail = await new UserRepo().findByEmail(email);
      if (existingUserByEmail) {
        throw new Error("E-mail already exist!");
      }
      const existingUserByUsername = await new UserRepo().findByUsername(
        username
      );
      if (existingUserByUsername) {
        throw new Error("Username already exist!");
      }
      const hashedPassword: string =
        await Authentication.passwordHash(password);
      const new_users = new User();
      new_users.email = email;
      new_users.password_hash = hashedPassword;
      new_users.username = username;
      new_users.name = name;
      new_users.lastname = lastname;
      new_users.is_admin = false;
      await new UserRepo().save(new_users);
    } catch (error) {
      throw new Error("Error login!");
    }
  }
}
