import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "../base-entity";
import { ProductCategory } from "../product-categories/product-categories.entity";
import { JoinColumn } from "typeorm/browser";

@Entity('products')
export class Product extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public description: string;

  @ManyToOne(() => ProductCategory, (category: ProductCategory) => category.products)
  public category: ProductCategory
}