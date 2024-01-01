import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService, // auth module 에 등록해줬기 때문에 사용 가능
  ) {}

  private async createUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
    } catch (e) {
      if (e.code == '23505') {
        throw new ConflictException('Existing username');
      } else throw new InternalServerErrorException();
    }
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 (Secret + Payload)
      const payload = { username };
      const accessToken = await this.jwtService.signAsync(payload);

      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
