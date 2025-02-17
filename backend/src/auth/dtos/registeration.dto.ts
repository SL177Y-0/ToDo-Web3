import { IsEmail, IsNotEmpty, IsString, Matches, MinLength, MaxLength } from 'class-validator';
import { Match } from '../../common/decorators/match.decorator';

export class RegisterDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  first_name: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  last_name: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(20, { message: 'Password cannot exceed 20 characters' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message: 'Password must contain uppercase, lowercase, number, and special character',
  })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Confirm password is required' })
  @Match('password', { message: 'Confirm password must match the password' })
  confirm_password: string;

  @IsString()
  @IsNotEmpty({ message: 'Wallet address cannot be empty.' })
  @Matches(/^0x[a-fA-F0-9]{40}$/, {
    message: 'Invalid Ethereum wallet address format',
  })
  wallet_address: string;
}
