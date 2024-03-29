/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [], // Подключаемые модули (в данном случае пустой массив)
  controllers: [AppController], // Контроллеры, доступные в модуле
  providers: [AppService, ChatGateway], // Провайдеры (сервисы), доступные в модуле
})
export class AppModule {} // Экспортируем модуль AppModule
