import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/product.dto";

@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Post()
  async  createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }
}
