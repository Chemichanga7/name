/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], // Подключение контроллера AppController
      providers: [AppService], // Подключение сервиса AppService
    }).compile();

    appController = app.get<AppController>(AppController); // Получение экземпляра контроллера AppController
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!'); // Проверка, что метод getHello() возвращает 'Hello World!'
    });
  });
});