import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productClient.send({ cmd: 'create_product' }, createProductDto);
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productClient.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  async findProductById(@Param('id') id: string) {
    return this.productClient.send({ cmd: 'find_one_product' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    )
    // try {
    //   const product = await firstValueFrom(
    //     this.productClient.send({ cmd: 'find_one_product' }, { id }),
    //   );
    //   if (!product) {
    //     throw new BadRequestException('Product not found');
    //   }
    //   return product;
    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }

  @Patch(':id')
  updateProductById(
    @Param('id', ParseIntPipe ) id: number, 
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productClient.send({ cmd: 'update_product' }, { 
      id, 
      ...updateProductDto 
    }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Delete(':id')
  deleteProductById(
    @Param('id') id: number)
    {
    return this.productClient.send({ cmd: 'remove_product' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
