import { ObjectId } from "mongodb";
import { Service } from "typhoonts";
import ProductDao from "../dao/ProductDao";
import { AppDataSource } from "../data-source";
import Product from "../entities/Product";

@Service()
class ProductService {
  private productRepository = AppDataSource.getMongoRepository(Product);

  async create(product: ProductDao) {
    return this.productRepository.save(product);
  }

  async getAll() {
    return (await this.productRepository.find()).map((product: Product) => ({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
    }));
  }

  async get(id: string) {
    const productId = new ObjectId(id);
    return this.productRepository.findOne({ where: { _id: productId } });
  }

  async update(id: string, product: ProductDao) {
    return this.productRepository.update(id, product);
  }
}

export default ProductService;
