import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  private generateAccessToken(user: User) {
    return this.jwtService.sign(
      { id: user.id, username: user.username, role: user.role },
      { secret: this.config.getOrThrow('JWT_SECRET'), expiresIn: '15m' },
    );
  }

  private generateRefreshToken(user: User) {
    return this.jwtService.sign(
      { id: user.id, version: user.tokenVersion },
      {
        secret: this.config.getOrThrow('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      },
    );
  }

  private generateTokens(user: User) {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }

  async login(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);
    const isValid = await bcrypt.compare(password, user?.password);
    if (!user || !isValid)
      throw new UnauthorizedException('Invalid credentials');

    return {
      ...this.generateTokens(user),
      user: { id: user.id, username: user.username, role: user.role },
    };
  }

  async refresh(refreshToken: string) {
    let payload: { id: string; version: number };
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.config.getOrThrow('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userService.findOne(payload.id);
    if (!user || user.tokenVersion !== payload.version) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.generateTokens(user);
  }

  // Disconnect all device (called when password is changed)
  async revokeAllSessions(userId: string) {
    await this.userService.incrementTokenVersion(userId);
  }

  async register(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
