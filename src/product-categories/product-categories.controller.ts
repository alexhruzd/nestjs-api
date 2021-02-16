import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductCategoriesService } from "./product-categories.service";
import { CreateProductCategoryDto } from "./dto/product-categories.dto";

@Controller('product-categories')
export class ProductCategoriesController {
  constructor(private readonly categoriesService: ProductCategoriesService) {
  }

  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Post()
  async createCategory(@Body() category: CreateProductCategoryDto) {
    return this.categoriesService.createCategory(category);
  }

}
