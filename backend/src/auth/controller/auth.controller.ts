import { Body, Controller, Post } from '@nestjs/common'; 
import { AuthService } from '../service/auth.service';
import { RegisterDto } from '../dtos/registeration.dto';
import { LoginDto } from '../dtos/login.dto';
import { IAuthResponse } from '../types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationDetails: RegisterDto): Promise<IAuthResponse> {
    return this.authService.register({
      ...registrationDetails,
      firstName: registrationDetails.first_name,
      lastName: registrationDetails.last_name,
      confirmPassword: registrationDetails.confirm_password,
      walletAddress: registrationDetails.wallet_address,
    });
  }

  @Post('login')
  async login(@Body() data: LoginDto): Promise<IAuthResponse> {
    return this.authService.login(data);
  }
}
