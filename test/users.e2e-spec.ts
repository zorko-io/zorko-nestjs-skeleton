import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UsersModule } from '../src/users/users.module';
import { UsersService } from '../src/users/users.service';
import { INestApplication } from '@nestjs/common';

xdescribe('Users', () => {
  let app: INestApplication;
  const usersService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UsersModule]
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/GET users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(usersService.findAll())
  });

  afterAll(async () => {
    await app.close();
  })
});
