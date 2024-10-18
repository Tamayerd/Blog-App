import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class AuthorDTO {
  @IsNumber()
  @IsNotEmpty({ message: "Author ID is required" })
  user_id!: number;

  @IsString({ message: "Username must be a string" })
  @IsNotEmpty({ message: "Username is required" })
  username!: string;

  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name is required" })
  name!: string;

  @IsString({ message: "Lastname must be a string" })
  @IsNotEmpty({ message: "Lastname is required" })
  lastname!: string;

  @IsString({ message: "Email must be a string" })
  @IsNotEmpty({ message: "Email is required" })
  email!: string;
}
