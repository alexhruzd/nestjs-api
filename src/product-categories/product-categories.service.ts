import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ProductCategory } from "./product-categories.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/product-categories.dto";

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private categoryRepository: Repository<ProductCategory>
  ) {}

  getAllCategories() {
    return this.categoryRepository.find();
  }

  async getCategoryById(id: number) {
    const category = await this.categoryRepository.findOne(id);

    if (category) {
      return category;
    }

    throw new NotFoundException(`Category with id ${id} not found!`);
  }

  async createCategory(category: CreateCategoryDto) {
    const newCategory = await this.categoryRepository.create(category);

    await this.categoryRepository.save(newCategory);
    return newCategory;
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    await this.categoryRepository.update(id, category);

    const updatedCategory = await this.getCategoryById(id);

    if (updatedCategory) {
      return updatedCategory;
    }
  }

  async deleteCategory(id: number) {
    const deleteResponse = await this.categoryRepository.delete(id);

    if (!deleteResponse.affected) {
      throw new NotFoundException(`Category with id ${id} not found!`);
    }
  }
}
