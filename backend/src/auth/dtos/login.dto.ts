import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Wallet address cannot be empty.' })
  @Matches(/^0x[a-fA-F0-9]{40}$/, {
    message: 'Invalid Ethereum wallet address format',
  })
  wallet_address: string;
}
