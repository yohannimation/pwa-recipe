import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';
import { Role } from '../../common/enums/role.enum';

interface JwtPayload {
  id: string;
  username: string;
  role: Role;
}

const cookieExtractor = (req: FastifyRequest): string | null => {
  const cookies = req.cookies as Record<string, string | undefined> | undefined;
  return cookies?.access_token ?? null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(), // fallback : Swagger, scripts
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  validate(payload: JwtPayload) {
    return {
      id: payload.id,
      username: payload.username,
      role: payload.role,
    };
  }
}
