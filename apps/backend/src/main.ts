import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { FastifyInstance } from 'fastify';
import multipart from '@fastify/multipart';
import fastifyCookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
  );
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const fastifyInstance = app.getHttpAdapter().getInstance() as FastifyInstance;
  await fastifyInstance.register(fastifyCookie);
  await fastifyInstance.register(helmet, {
    contentSecurityPolicy: false, // managed by nginx
  });
  await fastifyInstance.register(multipart, {
    limits: {
      fileSize: 2 * 1024 * 1024,
    },
  });

  const allowedOrigin = process.env.APP_ORIGIN;
  fastifyInstance.addHook('onRequest', async (req, reply) => {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return;
    const origin = req.headers.origin;
    if (origin && origin !== allowedOrigin) {
      return reply.code(403).send({ message: 'Invalid origin' });
    }
  });

  app.useStaticAssets({
    root: join(process.cwd(), 'src', 'uploads'),
    prefix: '/uploads/',
  });

  const config = new DocumentBuilder()
    .setTitle('Recipe API')
    .setDescription('API documentation for the Recipe management system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000, '0.0.0.0'); // `0.0.0.0` for docker
}
bootstrap();
