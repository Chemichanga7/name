/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core'; // Импорт необходимых модулей из Nest.js
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Создание экземпляра приложения Nest.js
  app.enableCors(); // Включение CORS (Cross-Origin Resource Sharing)
  await app.listen(3000); // Запуск приложения на порту 3000
}

bootstrap(); // Вызов функции bootstrap() для запуска приложения