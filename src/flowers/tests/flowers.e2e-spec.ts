import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import * as request from 'supertest';

describe('FlowersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleMixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleMixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/flowers (GET)', () => {
    return request(app.getHttpServer())
      .get('/flowers')
      .expect(200)
      .expect([
        {
          id: 1,
          name: 'Rose',
          color: 'Red',
          price: 10,
          createdAt: '2025-02-24T18:27:31.490Z',
          updateAt: '2025-02-24T18:27:31.490Z',
        },
        {
          id: 2,
          name: 'Lily',
          color: 'White',
          price: 16,
          createdAt: '2025-02-24T18:28:40.930Z',
          updateAt: '2025-02-24T18:28:40.930Z',
        },
        {
          id: 3,
          name: 'Tulip',
          color: 'Yellow',
          price: 18,
          createdAt: '2025-02-24T18:29:17.473Z',
          updateAt: '2025-02-24T18:29:17.473Z',
        },
      ]);
  });

  it('/flowers (Post)', () => {
    return request(app.getHttpServer())
      .post('/flowers')
      .send({
        name: 'SunFlower',
        color: 'Yellow',
        price: 34,
      })
      .expect(201)
      .expect((response) => {
        console.log(response.body);
        return response.body.name === 'SunFlower';
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
