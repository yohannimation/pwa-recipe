import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { LoginDto } from './dto/login.dto';

const isProd = process.env.NODE_ENV === 'production';

const ACCESS_MAX_AGE = 15 * 60; // 15 min
const REFRESH_MAX_AGE = 7 * 24 * 3600; // 7 jours

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private setAuthCookies(res: FastifyReply, access: string, refresh: string) {
    const base = { httpOnly: true, secure: isProd, sameSite: 'lax' as const };
    res.setCookie('access_token', access, {
      ...base,
      path: '/api',
      maxAge: ACCESS_MAX_AGE,
    });
    res.setCookie('refresh_token', refresh, {
      ...base,
      path: '/api/auth',
      maxAge: REFRESH_MAX_AGE,
    });
  }

  private clearAuthCookies(res: FastifyReply) {
    res.clearCookie('access_token', { path: '/api' });
    res.clearCookie('refresh_token', { path: '/api/auth' });
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'John Doe' },
        password: { type: 'string', example: 'Password123!' },
      },
    },
  })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const { accessToken, refreshToken, user } = await this.authService.login(
      dto.username,
      dto.password,
    );
    this.setAuthCookies(res, accessToken, refreshToken);
    return { user }; // plus de token dans le body
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Rotate refresh token and issue a new access token',
  })
  async refresh(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const token = req.cookies?.refresh_token;
    if (!token) throw new UnauthorizedException();
    try {
      const { accessToken, refreshToken } =
        await this.authService.refresh(token);
      this.setAuthCookies(res, accessToken, refreshToken);
      return { ok: true };
    } catch (e) {
      this.clearAuthCookies(res);
      throw e;
    }
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: FastifyReply) {
    this.clearAuthCookies(res);
    return { ok: true };
  }
}
