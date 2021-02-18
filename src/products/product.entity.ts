import { File } from './../files/files.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "../base-entity";
import { ProductCategory } from "../product-categories/product-categories.entity";

@Entity('products')
export class Product extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public description: string;

  @ManyToOne(() => ProductCategory, (category: ProductCategory) => category.products)
  public category: ProductCategory

  @JoinColumn()
  @OneToOne(
    () => File,
    {
      eager: true,
      nullable: true
    }
  )
  public image?: File;
}

