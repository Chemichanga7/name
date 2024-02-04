/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Определение класса как контроллера
export class AppController {
  constructor(private readonly appService: AppService) {} // Инъекция сервиса AppService

  @Get() // Декоратор для обозначения метода как обработчика GET-запросов
  getHello(): string {
    return this.appService.getHello(); // Вызов метода getHello() из сервиса AppService
  }
}
