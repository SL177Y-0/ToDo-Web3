import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dtos/login.dto';
import { IAuthResponse, RegisterDtoInterface, UserDetails } from '../types';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(registrationDetails: RegisterDtoInterface): Promise<IAuthResponse> {
    if (registrationDetails.password !== registrationDetails.confirmPassword) {
      throw new UnauthorizedException('Passwords do not match');
    }

    const existingUser = await this.authRepository.findByEmail(registrationDetails.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already registered');
    }

    const existingWallet = await this.authRepository.findByWallet(registrationDetails.walletAddress);
    if (existingWallet) {
      throw new UnauthorizedException('Wallet address already registered');
    }

    const hashedPassword = await bcrypt.hash(registrationDetails.password, 10);

    const user = await this.authRepository.create({
      ...registrationDetails,
      password: hashedPassword,
    });

    const tokens = await this.generateTokens(user);
    await this.authRepository.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      user: {
        id: user.id,
        email: user.email,
        wallet_address: user.wallet_address,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    };
  }

  async login(data: LoginDto): Promise<IAuthResponse> {
    const user = await this.authRepository.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const existingWallet = await this.authRepository.findByWalletAndEmail(data.wallet_address, data.email);
    if (!existingWallet) {
      throw new UnauthorizedException('Wallet address mismatch');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user);
    await this.authRepository.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      user: {
        id: user.id,
        email: user.email,
        wallet_address: user.wallet_address,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    };
  }

  private async generateTokens(user: UserDetails) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: user.id,
          email: user.email,
          username: `${user.first_name} ${user.last_name}`,
        },
        { expiresIn: '1d' },
      ),
      this.jwtService.signAsync(
        {
          id: user.id,
          email: user.email,
          username: `${user.first_name} ${user.last_name}`,
        },
        { expiresIn: '7d' },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async validateUser(userId: string) {
    return this.authRepository.findById(userId);
  }
}
