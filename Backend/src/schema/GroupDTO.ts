import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
  IsDate,
  ArrayMaxSize,
} from "class-validator";
import { BlogDTO } from "./BlogDTO";
import GroupMemberDTO from "./GroupMemberDTO";

class GroupDTO {
  @IsNotEmpty()
  @IsString()
  group_name!: string;

  @IsNotEmpty()
  @IsDate()
  created_at!: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  blogs?: BlogDTO[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMaxSize(2, {
    message: "User can have a maximum of 2 group memberships",
  })
  memberships?: GroupMemberDTO[];
}

export default GroupDTO;
