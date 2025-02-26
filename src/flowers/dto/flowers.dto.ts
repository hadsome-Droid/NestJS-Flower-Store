import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowersDto {
  @IsString({
    message: 'Old Elf',
  })
  @ApiProperty({
    example: 'SunFlower',
    required: true,
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'Purple',
    required: true,
  })
  color: string;

  @IsNumber()
  @ApiProperty({
    example: 4,
    required: true,
  })
  price: number;
}

export type TUpdateFlowersDto = Partial<CreateFlowersDto>;
