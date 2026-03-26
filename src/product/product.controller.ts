import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor() {}

  @Post()
  createProduct() {
    return 'This action adds a new product';
  }

  @Get()
  findAllProducts() {
    return 'This action returns all products';
  }

  @Get(':id')
  findProductById() {
    return 'This action returns a product by id';
  }

  @Patch(':id')
  updateProductById(@Param('id') id: string, @Body() updateProductDto: any) {
    return `This action updates a product by id: ${id}`;
  }

  @Delete(':id')
  deleteProductById(@Param('id') id: string) {
    return `This action deletes a product by id: ${id}`;
  }
}
