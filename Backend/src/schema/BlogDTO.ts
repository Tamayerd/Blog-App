import {
  IsNotEmpty,
  IsString,
  Length,
  IsBoolean,
  IsDate,
  ValidateNested,
  IsObject,
  IsOptional,
} from "class-validator";
import { AuthorDTO } from "./AuthDTO";
import { Group } from "../model/Group";

export class BlogDTO {
  @IsNotEmpty({ message: "Title is required" })
  @IsString({ message: "Title must be a string" })
  @Length(1, 255, { message: "Title must be between 1 and 255 characters" })
  title!: string;

  @IsNotEmpty({ message: "Content is required" })
  @IsObject({ message: "Content must be a object" })
  content!: object;

  @IsBoolean({ message: "Archived status must be a boolean" })
  @IsNotEmpty({ message: "Archived status is required" })
  is_archived!: boolean;

  @IsDate({ message: "Created date must be a date" })
  @IsNotEmpty({ message: "Created date is required" })
  created_at!: Date;

  @IsDate({ message: "Updated date must be a date" })
  @IsNotEmpty({ message: "Updated date is required" })
  updated_at!: Date;

  @ValidateNested()
  author!: AuthorDTO;

  @IsOptional()
  @ValidateNested()
  group?: Group;
}
