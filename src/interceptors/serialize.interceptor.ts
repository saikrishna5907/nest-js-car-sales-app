import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";

interface ClassConstructor {
    new(...args: any[]): {} // this means it can be any type of class, but it should be a class
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}
export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: ClassConstructor) {
    }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        return next.handle().pipe(
            map((data: any) => {
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }
}