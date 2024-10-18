import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";

import { User } from "./UserModel";
import { Blog } from "./Blog";

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  like_id!: number;

  @ManyToOne(() => User, (user) => user.likes)
  user!: User;

  @ManyToOne(() => Blog, (blog) => blog.likes)
  blog!: Blog;
}
