import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductCategoriesService } from "./product-categories.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/product-categories.dto";

@Controller('product-categories')
export class ProductCategoriesController {
  constructor(private readonly categoriesService: ProductCategoriesService) {
  }

  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Post()
  async createCategory(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category);
  }

  @Patch(':id')
  async updateCategory(@Param() {id}, @Body() category: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(Number(id), category);
  }

  @Delete(':id')
  async deleteCategory(@Param() {id}) {
    return this.categoriesService.deleteCategory(id);
  }
}
