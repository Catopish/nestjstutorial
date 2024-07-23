import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
// import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() AuthCredentialsDTO: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(AuthCredentialsDTO);
  }
  @Post('/signin')
  signIn(
    @Body() AuthCredentialsDTO: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(AuthCredentialsDTO);
  }
  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(@Req() req) {
  //   console.log(req);
  // }
}
