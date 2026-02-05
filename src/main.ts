import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('ArtisanAPI')
    .setDescription(
      'ArtisanAPI provides endpoints to execute server tasks and commands safely. ' +
        'Use it to run maintenance scripts, manage cron jobs, or trigger backend tasks via HTTP requests. ' +
        ' Only allow trusted users and whitelist commands to prevent security risks.',
    )
    .setVersion('1.0')
    .addTag('Artisan')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
