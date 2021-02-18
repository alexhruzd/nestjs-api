import { HttpStatus } from '@nestjs/common';
import { editFileName, imageFileFilter } from './../utils/file-upload.utils';
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage} from 'multer'

@Controller('files')
export class FilesController {

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };

    return {
      status: HttpStatus.OK,
      message: 'Image successfull',
      data: response
    }
  }

}
