import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from "typeorm";

import { User } from "./UserModel";
import { Like } from "./Like";
import { Comment } from "./Comment";
import { Group } from "./Group";

@Entity()
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn()
  blog_id!: number;

  @Column()
  title!: string;

  @Column("json")
  content!: object;

  @ManyToOne(() => User, (user) => user.blogs)
  author!: User;

  @ManyToOne(() => Group, (group) => group.blogs, { nullable: true })
  group!: Group;

  @Column({ default: false })
  is_archived!: boolean;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @CreateDateColumn({ type: "timestamp" })
  updated_at!: Date;

  @OneToMany(() => Comment, (comment) => comment.blog)
  comments!: Comment[];

  @OneToMany(() => Like, (like) => like.blog)
  likes!: Like[];
}
