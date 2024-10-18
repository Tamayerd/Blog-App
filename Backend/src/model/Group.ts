import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { GroupMember } from "./GroupMember";
import { Blog } from "./Blog";
import { User } from "./UserModel";

@Entity()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  group_id!: number;

  @Column()
  group_name!: string;

  @ManyToOne(() => User, (user: { created_groups: any }) => user.created_groups)
  createdBy!: User;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @OneToMany(() => Blog, (blog) => blog.group)
  blogs!: Blog[];

  @OneToMany(() => GroupMember, (membership) => membership.group)
  memberships!: GroupMember[];
}
