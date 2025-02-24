import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFlowersDto } from './dto/flowers.dto';

@Injectable()
export class FlowersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.flower.findMany();

    // return [
    //   {
    //     name: 'Rose',
    //     color: 'Red',
    //     price: 5,
    //   },
    //   {
    //     name: 'Lily',
    //     color: 'White',
    //     price: 6,
    //   },
    //   {
    //     name: 'Tulip',
    //     color: 'Yellow',
    //     price: 8,
    //   },
    // ];
  }

  create(dto: CreateFlowersDto) {
    return this.prisma.flower.create({
      data: dto,
    });
  }
}
