import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { classToPlain } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Response {
  statusCode: number;
  message?: string;
  data: any;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response> {
    return next.handle().pipe(
      map((data) => {
        if (data.meta) {
          const dataWithMeta = classToPlain(data);
          return {
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: data?.message,
            data: dataWithMeta.data,
            meta: dataWithMeta.meta,
          };
        }
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data?.message,
          data: classToPlain(data),
        };
      })
    );
  }
}
