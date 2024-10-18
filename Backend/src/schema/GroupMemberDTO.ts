import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from "class-validator";

import GroupDTO from "./GroupDTO";
import UserDTO from "./UserDTO";

class GroupMemberDTO {
  @IsOptional()
  @ValidateNested()
  user!: UserDTO;

  @IsOptional()
  @ValidateNested()
  group?: GroupDTO;

  @IsNotEmpty()
  @IsBoolean()
  is_admin!: boolean;

  @IsNotEmpty()
  @IsBoolean()
  is_assistant_admin!: boolean;

  @IsNotEmpty()
  @IsDate()
  created_at!: Date;
}

export default GroupMemberDTO;
