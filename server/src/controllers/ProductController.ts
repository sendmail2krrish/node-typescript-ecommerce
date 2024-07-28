import Joi from "joi";
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  ResponseBody,
} from "typhoonts";
import ProductDao from "../dao/ProductDao";
import { ProductListDto } from "../dto/ProductDto";
import Product from "../entities/Product";
import ProductService from "../services/ProductService";

@Controller("/products")
class ProductController {
  @Inject(ProductService)
  private productService!: ProductService;

  @Post("/")
  @ResponseBody()
  async create(@Body() productReqDao: ProductDao) {
    const productSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      price: Joi.number().positive().required(),
      description: Joi.string().optional(),
    });
    const productValidate = await productSchema.validate(productReqDao);

    if (productValidate?.error) {
      return { status: 400, error: productValidate.error.details };
    }

    const product: Product = await this.productService.create(productReqDao);

    return {
      message: `${product.name} has been created`,
    };
  }

  @Get("/")
  @ResponseBody()
  async getAll() {
    const products: ProductListDto[] = await this.productService.getAll();
    return products;
  }

  @Get("/:id")
  @ResponseBody()
  async get(@Param("id") id: string) {
    const product: Product | null = await this.productService.get(id);
    return (
      product || {
        message: "Product not found",
      }
    );
  }

  @Put("/:id")
  @ResponseBody()
  async update(@Param("id") id: string, @Body() productReqDao: ProductDao) {
    const productSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      price: Joi.number().positive().required(),
      description: Joi.string().optional(),
    });
    const productValidate = await productSchema.validate(productReqDao);

    if (productValidate?.error) {
      return { status: 400, error: productValidate.error.details };
    }

    await this.productService.update(id, productReqDao);

    return {
      message: `${productReqDao.name} has been updated`,
    };
  }
}

export default ProductController;
