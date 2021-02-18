import { FilesService } from './../files/files.service';
import { editFileName, imageFileFilter } from './../utils/file-upload.utils';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";
import { PaginationDto } from "./dto/pagination.dto";


@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly filesService: FilesService
  ) {}

  @Get()
  getAll( @Query('search') search: string, @Query() paginationDto: PaginationDto) {
    paginationDto.page = Number(paginationDto.page)
    paginationDto.limit = Number(paginationDto.limit)

    if (!paginationDto.page || !paginationDto.limit) {
      paginationDto.page = 0;
      paginationDto.limit = 0;
    }

    return this.productsService.getAll(search, {
      ...paginationDto,
      limit: paginationDto.limit > 10 ? 10: paginationDto.limit
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @Post("image/:id")
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/products',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }))
  async addImage(@UploadedFile() file: Express.Multer.File, @Param() params) {
    const image = await this.filesService.uploadFile(file.filename, file.path);
    
    return this.productsService.addImage(image.id, params.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async  createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateProduct(@Param() {id}, @Body() product: UpdateProductDto) {
    return this.productsService.updateProduct(Number(id), product);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteProduct(@Param() {id}) {
    return this.productsService.deleteProduct(Number(id));
  }
}