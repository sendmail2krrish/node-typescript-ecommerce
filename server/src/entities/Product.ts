import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity({ name: "products" })
class Product {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column()
  description!: string;
}

export default Product;
