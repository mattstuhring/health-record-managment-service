import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class AuthService {
  userRepository: Repository<User>;

  constructor(
    @InjectRepository(User)
    userRepository: Repository<User>,
  ) {
    this.userRepository = userRepository;
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = this.userRepository.create({
      username,
      password,
    });

    await this.userRepository.save(user);
  }
}
