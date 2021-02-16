import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base-entity";
import { Exclude } from "class-transformer";

@Entity('users')
export class User extends BaseEntity {
  @Column({unique: true})
  public email: string;

  @Column()
  public name: string;

  @Column()
  public password: string;

  @Column({nullable: true})
  @Exclude()
  public currentHashedRefreshToken?: string;

}