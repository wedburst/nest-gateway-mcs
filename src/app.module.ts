import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(3000),
        PRODUCT_SERVICE_HOST: Joi.string().hostname().required().default('localhost'),
        PRODUCT_SERVICE_PORT: Joi.number().port().required().default(3001),
      }),
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
