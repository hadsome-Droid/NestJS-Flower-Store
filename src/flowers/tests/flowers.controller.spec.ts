import { FlowersController } from '../flowers.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { FlowersService } from '../flowers.service';

describe('FlowersController', () => {
  let controller: FlowersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlowersController],
      providers: [
        {
          provide: FlowersService,
          useValue: {
            findAll: jest.fn().mockRejectedValue([
              {
                id: 1,
                name: 'Rose',
                color: 'Red',
                price: 10,
              },
            ]),
            create: jest.fn().mockRejectedValue({
              id: 2,
              name: 'Lily',
              color: 'White',
              price: 15,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<FlowersController>(FlowersController);
  });

  it('should return an array of flowers', async () => {
    expect(await controller.findAll()).toEqual([
      {
        id: 1,
        name: 'Rose',
        color: 'Red',
        price: 10,
      },
    ]);
  });

  it('should create a new flower', async () => {
    expect(
      await controller.create({
        name: 'Lily',
        color: 'White',
        price: 15,
      }),
    ).toEqual({
      id: 2,
      name: 'Lily',
      color: 'White',
      price: 15,
    });
  });
});
