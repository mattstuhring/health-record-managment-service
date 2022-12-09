import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post('/signup')
  @HttpCode(201)
  signUp(@Body() authSignUpDto: AuthSignUpDto): Promise<void> {
    return this.authService.signUp(authSignUpDto);
  }

  @Post('/signin')
  signIn(
    @Body() authSignInDto: AuthSignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authSignInDto);
  }
}
