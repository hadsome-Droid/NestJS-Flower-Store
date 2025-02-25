import { Injectable } from '@nestjs/common';

@Injectable()
export class MicroserviceService {
  handleMessage(message: string) {
    return console.log(`Microservice received message: ${message}`);
  }
}
