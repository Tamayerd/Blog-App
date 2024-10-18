import { User } from "../model/UserModel";

interface UsersRepo {
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(userId: number): Promise<void>;
  retrieveById(userId: number): Promise<User>;
  retriveAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  isAdmin(userId: number): Promise<boolean>;
}

export class UserRepo implements UsersRepo {
  async save(user: User): Promise<void> {
    try {
      const newUser = User.create({
        username: user.username,
        email: user.email,
        lastname: user.lastname,
        name: user.name,
        password_hash: user.password_hash,
        created_at: new Date(),
      });
      const savedUser = await newUser.save();
      if (!savedUser) {
        throw new Error("Save operation returned undefined");
      }
    } catch (error) {
      throw new Error("Failed to create user!");
    }
  }

  async update(user: User): Promise<void> {
    try {
      const find_user = await User.findOneBy({ user_id: user.user_id });
      if (!find_user) {
        throw new Error("User not found!");
      }
      find_user.username = user.username;
      find_user.password_hash = user.password_hash;
      find_user.email = user.email;
      await find_user.save();
    } catch (error) {
      throw new Error("Failed to update user!");
    }
  }

  async delete(userId: number): Promise<void> {
    try {
      const find_user = await User.findOneBy({ user_id: userId });
      if (!find_user) {
        throw new Error("User not found!");
      }
      await find_user.remove();
    } catch (error) {
      throw new Error("Failed to delete user!");
    }
  }

  async retrieveById(userId: number): Promise<User> {
    try {
      const find_user = await User.findOneBy({ user_id: userId });
      if (!find_user) {
        throw new Error("User not found!");
      }
      return find_user;
    } catch (error) {
      throw new Error("Failed to retrieve user!");
    }
  }

  async retriveAll(): Promise<User[]> {
    try {
      return await User.find();
    } catch (error) {
      throw new Error("Failed to retrieve users!");
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      console.log("findByUsername çalıştı:", email);

      const user = await User.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw new Error("Failed to fetch data by email! " + error);
    }
  }
  async findByUsername(username: string): Promise<User | null> {
    try {
      console.log("findByUsername çalıştı:", username);
      const user = await User.findOne({ where: { username } });
      console.log("Bulunan kullanıcı:", user);
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      throw new Error("Failed to fetch data by username! " + error);
    }
  }
  async isAdmin(userId: number): Promise<boolean> {
    try {
      const admin = await User.findOne({
        where: { user_id: userId, is_admin: true },
      });
      return !!admin;
    } catch (error) {
      throw new Error("Failed to check admin status! " + error);
    }
  }
}
