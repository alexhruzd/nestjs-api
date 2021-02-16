import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ProductCategory } from "./product-categories.entity";
import { Repository } from "typeorm";
import { CreateProductCategoryDto } from "./dto/product-categories.dto";

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private categoryRepository: Repository<ProductCategory>
  ) {}

  getAllCategories() {
    return this.categoryRepository.find();
  }

  async createCategory(category: CreateProductCategoryDto) {
    const newCategory = await this.categoryRepository.create(category);

    await this.categoryRepository.save(newCategory);
    return newCategory;
  }

}
