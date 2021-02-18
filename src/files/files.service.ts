import { Repository } from 'typeorm';
import { File } from './files.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesReposytory: Repository<File>,
  ) {}

  async uploadFile(fileName: string, path: string) {
    const newFile = this.filesReposytory.create({
      originalname: fileName,
      path: path,
    });

    await this.filesReposytory.save(newFile);

    return newFile;
  }
}
