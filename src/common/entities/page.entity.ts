import { PageOptionsDto } from "../dtos/page-option.dto";
import { PageMetaEntity } from "./page-meta.entity";

export class PageEntity<T> {
  readonly data: T[];
  readonly meta: PageMetaEntity;

  constructor({
    data,
    itemCount,
    pageOptionsDto,
  }: {
    data: T[];
    itemCount: number;
    pageOptionsDto: PageOptionsDto;
  }) {
    const meta = new PageMetaEntity({ pageOptionsDto, itemCount });
    this.data = data;
    this.meta = meta;
  }
}
