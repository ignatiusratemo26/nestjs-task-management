import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto){
    const user = await this.userService.create(createUserDto);
    return { id: user.id, username: user.username};
  }

  async signin(signInDto: SignInDto) {
    const user = await this.userService.findUserByUsername(signInDto.username);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = bcrypt.compare(user.password, signInDto.password);
    if (!valid ) throw new UnauthorizedException('Invalid credentials');

    // send payload to jwt service for signing
    const payload = { sub: user.id, username: user.password};

    const access_token = await this.jwtService.sign(payload);

    return { 
      access_token,
      user: {
        id: user.id,
        username: user.username,
      }
    };
  }


  async profile(userId: number) {
    return this.userService.findUserById(userId);
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
