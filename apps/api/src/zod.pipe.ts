import { BadRequestException, PipeTransform } from '@nestjs/common';
import type { ZodType } from 'zod';

/** Валидирует body по zod-схеме из @app/shared */
export class ZodPipe<T> implements PipeTransform<unknown, T> {
  constructor(private readonly schema: ZodType<T>) {}

  transform(value: unknown): T {
    const result = this.schema.safeParse(value);
    if (!result.success) throw new BadRequestException(result.error.issues);
    return result.data;
  }
}
