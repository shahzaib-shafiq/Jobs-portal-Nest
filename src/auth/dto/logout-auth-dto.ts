import { IsNotEmpty} from 'class-validator';

export class LogoutAuthDto {

  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  refreshToken: string;

}
