import Joi from "joi";

export class PaginationDto {
  lastKey?: string;
  limit?: number = 10;
}

export const paginationDtoSchema = Joi.object<PaginationDto>({
  lastKey: Joi.string().uuid(),
  limit: Joi.number().positive(),
});
