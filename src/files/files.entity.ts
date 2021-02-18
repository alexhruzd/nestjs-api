import { BaseEntity } from './../base-entity';
import { Column, Entity } from "typeorm";

@Entity()

export class File extends BaseEntity {
  
  @Column()
  public originalname: string;

  @Column()
  public path: string;
}