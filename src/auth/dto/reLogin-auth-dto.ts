import { IsEmail, IsNotEmpty } from 'class-validator';

export class reLoginAuthDto {

    // @IsNotEmpty()
    // @IsEmail()
    // email: string;

    @IsNotEmpty()
    accessToken: string;

    @IsNotEmpty()
    refreshToken: string;

}
