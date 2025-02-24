import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

// pipe преобразуют входные данные перед их обработкой в контролере

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(`Value should be a number.`);
    }
    return val;
  }
}
