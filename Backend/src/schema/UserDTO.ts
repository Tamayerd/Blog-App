import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

class UserDto {
  @IsNotEmpty({ message: "Username is required" })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: "Username must contain only letters and numbers",
  })
  username!: string;

  @IsString({ message: "Name must be a string" })
  @Length(1, 100, { message: "Name must be between 1 and 100 characters" })
  name!: string;

  @IsString({ message: "Lastname must be a string" })
  @Length(1, 100, { message: "Lastname must be between 1 and 100 characters" })
  lastname!: string;

  @IsNotEmpty({ message: "Password is required" })
  @Length(6, 15, { message: "Password must be at least 6 characters long" })
  password!: string;
}

export default UserDto;
