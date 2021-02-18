import { HttpStatus, NotFoundException } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async createProduct(product: CreateProductDto) {
    const newProduct = await this.productsRepository.create(product);

    await this.productsRepository.save(newProduct);
    return newProduct;
  }

  async updateProduct(id: number, product: UpdateProductDto) {
    await this.productsRepository.update(id, product);

    const updatedProduct = await this.getById(id);
    
    if(updatedProduct) {
      return updatedProduct;
    }
  }

  async deleteProduct(id: number) {
    const deleteResponse = await this.productsRepository.delete(id);

    if(!deleteResponse.affected) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }

  async addImage(idImage: number, idProduct: number) {
    const product = await this.getById(idProduct);

    if (product) {
      await this.productsRepository.update(idProduct, {
        ...product,
        image: { id: idImage },
      });
    }

    return product;
  }

  async getById(id: number) {
    const product = await this.productsRepository.findOne(id, {
      relations: ['category', 'image']
    });

    if (product) {
      return product;
    }

    throw new HttpException(
      'Product with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getAll(search: string, paginationDto: PaginationDto) {
    const skipped = (paginationDto.page - 1) * paginationDto.limit;

    const where: FindManyOptions<Product>['where'] = {
      name: ILike(`%${search ? search : "" }%`)
    };

    const [products, count] = await this.productsRepository.findAndCount({
      where,
      relations: ['category', 'image'],
      order: {
        createdAt: "DESC"
      },
      skip: skipped,
      take: paginationDto.limit,
    });

    return {
      totalCount: count,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: products,
    };
  }
}
