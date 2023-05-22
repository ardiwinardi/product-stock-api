import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateProductStockDto } from "./dto/create-product-stock.dto";
import { ProductStocksService } from "./product-stocks.service";

@Controller("product/stocks")
@ApiTags("product stocks")
export class ProductStocksController {
  constructor(private readonly productStocksService: ProductStocksService) {}

  @Post()
  async create(@Body() createProductStockDto: CreateProductStockDto) {
    return this.productStocksService.create(createProductStockDto);
  }

  @Get("/productId/:id")
  findByProductId(@Param("id") id: string) {
    return this.productStocksService.findByProductId(id);
  }
}
