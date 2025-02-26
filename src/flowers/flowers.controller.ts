import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { AuthGuard } from '../conception/guard';
import { CreateFlowersDto } from './dto/flowers.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('flowers')
@ApiTags('Flowers')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.flowersService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Successfully created' })
  @ApiBody({
    type: CreateFlowersDto,
    description: 'Create a new flower',
  })
  create(@Body() dto: CreateFlowersDto) {
    return this.flowersService.create(dto);
  }
}

// PIPE
// @Controller('flowers')
// export class FlowersController {
//   constructor(private readonly flowersService: FlowersService) {}
//
//   @Get()
//   findAll(@Query('pageNumber', ParseIntPipe) pageNumber: number) {
//     console.log(pageNumber);
//     return this.flowersService.findAll();
//   }
// }
