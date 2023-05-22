import { ApiProperty } from "@nestjs/swagger";
import { PageOptionsDto } from "../dtos/page-option.dto";

export class PageMetaEntity {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  itemCount: number;

  @ApiProperty()
  pageCount: number;

  @ApiProperty()
  hasPreviousPage: boolean;

  @ApiProperty()
  hasNextPage: boolean;

  constructor({
    pageOptionsDto,
    itemCount,
  }: {
    pageOptionsDto: PageOptionsDto;
    itemCount: number;
  }) {
    this.page = parseInt(pageOptionsDto?.page.toString());
    this.limit = parseInt(pageOptionsDto?.limit.toString());
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.limit);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
