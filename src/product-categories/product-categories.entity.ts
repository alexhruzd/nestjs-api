import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base-entity";
import { Product } from "../products/product.entity";

@Entity('product-categories')
export class ProductCategory extends BaseEntity {
  @Column({unique: true})
  public name: string;

  @Column({nullable: true})
  public description: string;

  @OneToMany(() => Product, (product: Product) => product.category)
  public products: Product[]
}