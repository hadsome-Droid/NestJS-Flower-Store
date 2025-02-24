import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFlowersDto } from './dto/flowers.dto';
import { ConfigService } from '@nestjs/config';
import { EnumAppMode } from '../type';

@Injectable()
export class FlowersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  findAll() {
    // console.log(this.configService.get<EnumAppMode>('MODE'));
    return this.prisma.flower.findMany();
  }

  create(dto: CreateFlowersDto) {
    return this.prisma.flower.create({
      data: dto,
    });
  }

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
