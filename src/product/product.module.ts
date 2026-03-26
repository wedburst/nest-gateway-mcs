import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';

@Module({
  controllers: [ProductController],
  providers: [],
  imports: [
    ClientsModule.register([
      { 
        name: PRODUCT_SERVICE, 
        transport: Transport.TCP ,
        options: {
          host: process.env.PRODUCT_SERVICE_HOST || 'localhost',
          port: Number(process.env.PRODUCT_SERVICE_PORT) || 3001,
          },
      },
    ]),
  ],
})
export class ProductModule {

  constructor() {
    console.log('ProductModule initialized',
      {
        host: process.env.PRODUCT_SERVICE_HOST,
        port: Number(process.env.PRODUCT_SERVICE_PORT),
      }
    );
  }
}
