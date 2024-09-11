import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './trasform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Create a new Nest application
  app.useGlobalPipes(new ValidationPipe());//whenever there is a valitadion decorator, it will use validation pipes.
  app.useGlobalInterceptors(new TransformInterceptor());//whenever there is a response, it will use the transform interceptor.
  await app.listen(3000);// Start the application on port 3000, the standard port for HTTP traffic
}
bootstrap();