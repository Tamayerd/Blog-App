import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column,
  CreateDateColumn,
} from "typeorm";
import { User } from "./UserModel";
import { Group } from "./Group";

@Entity()
export class GroupMember extends BaseEntity {
  @PrimaryGeneratedColumn()
  membership_id!: number;

  @ManyToOne(() => User, (user) => user.memberships)
  user!: User;

  @ManyToOne(() => Group, (group) => group.memberships)
  group!: Group;

  @Column()
  is_admin!: boolean;

  @Column()
  is_assistant_admin!: boolean;

  @Column({ default: false })
  approved!: boolean;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;
}
