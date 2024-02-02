/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable() // Декоратор для обозначения класса как инжектируемого сервиса
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}