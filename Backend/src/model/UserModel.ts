import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Blog } from "./Blog";
import { GroupMember } from "./GroupMember";
import { Like } from "./Like";
import { Comment } from "./Comment";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column()
  username!: string;

  @Column()
  name!: string;

  @Column()
  lastname!: string;

  @Column()
  email!: string;

  @Column()
  password_hash!: string;

  @Column({ default: false })
  is_admin!: boolean;
  

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @OneToMany(() => Blog, (blog) => blog.author)
  blogs!: Blog[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments!: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes!: Like[];

  @OneToMany(() => GroupMember, (membership) => membership.user)
  memberships!: GroupMember[];
}
