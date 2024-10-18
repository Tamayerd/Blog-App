import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";

import { User } from "./UserModel";
import { Blog } from "./Blog";


@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  comment_id!: number;

  @Column()
  content!: string;

  @ManyToOne(() => User, (user) => user.comments)
  author!: User;

  @ManyToOne(() => Blog, (blog) => blog.comments)
  blog!: Blog;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;
}
