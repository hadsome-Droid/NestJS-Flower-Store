import { FlowersService } from '../flowers.service';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { ConfigService } from '@nestjs/config';

describe('FlowersService', () => {
  let service: FlowersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FlowersService,
        {
          provide: PrismaService,
          useValue: {
            flower: {
              findMany: jest.fn().mockRejectedValue([
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
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<FlowersService>(FlowersService);
  });

  it('should return an array of flowers', async () => {
    expect(await service.findAll()).toEqual([
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
      await service.create({
        name: 'Lily',
        color: 'White',
        price: 15,
      }),
    ).toEqual({
      color: 'White',
      id: 2,
      name: 'Lily',
      price: 15,
    });
  });
});
