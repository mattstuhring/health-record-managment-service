import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { User } from '../auth/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';
import { AuthSignUpDto } from './dto/auth-signup.dto';

@Injectable()
export class AuthService {
  private userRepository: Repository<User>;
  private jwtService: JwtService;

  constructor(
    @InjectRepository(User)
    userRepository: Repository<User>,
    jwtService: JwtService,
  ) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  // Access - Admin
  async signUp(authSignUpDto: AuthSignUpDto): Promise<void> {
    const { username, password, accessLevel } = authSignUpDto;

    try {
      const salt = await bcrypt.genSalt(); // default 10 saltRounds
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = this.userRepository.create({
        username,
        password: hashedPassword,
        accessLevel,
      });

      await this.userRepository.save(user);
    } catch (error) {
      // Postgres duplicate username
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // Access - Admin, Employee
  async signIn(authSignInDto: AuthSignInDto): Promise<{ accessToken: string }> {
    const { username, password } = authSignInDto;
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
