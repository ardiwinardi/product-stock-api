import { PageOptionsDto } from "@/common/dtos/page-option.dto";
import { ParseObjectIdPipe } from "@/common/pipes/parse-object-id.pipe";
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreatePurchaseOrderDto } from "./dto/create-purchase-order.dto";
import { FindAllPurchaseOrderDto } from "./dto/find-all-purchase-order.dto";
import { UpdatePurchaseOrderDto } from "./dto/update-purchase-order.dto";
import { UpdateStatusPurchaseOrderDto } from "./dto/update-status-purchase-order.dto";
import { PurchaseOrdersService } from "./purchase-orders.service";

@Controller("purchase-orders")
@ApiTags("purchase orders")
export class PurchaseOrdersController {
  constructor(private readonly purchaseOrdersService: PurchaseOrdersService) {}

  @Post()
  create(@Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return this.purchaseOrdersService.create(createPurchaseOrderDto);
  }

  @Get()
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() findAllPurchaseOrderDto: FindAllPurchaseOrderDto
  ) {
    return this.purchaseOrdersService.findAll(
      pageOptionsDto,
      findAllPurchaseOrderDto
    );
  }

  @Get(":id")
  findOne(@Param("id", ParseObjectIdPipe) id: string) {
    return this.purchaseOrdersService.findOne(id, {
      withProducts: true,
      withCustomer: true,
    });
  }

  @Patch(":id")
  update(
    @Param("id", ParseObjectIdPipe) id: string,
    @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto
  ) {
    return this.purchaseOrdersService.update(id, updatePurchaseOrderDto);
  }

  @Patch("/status/:id")
  updateStatus(
    @Param("id", ParseObjectIdPipe) id: string,
    @Body() updateStatusPurchaseOrderDto: UpdateStatusPurchaseOrderDto
  ) {
    return this.purchaseOrdersService.updateStatus(
      id,
      updateStatusPurchaseOrderDto
    );
  }
}
