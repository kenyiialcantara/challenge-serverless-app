import Joi from "joi";

export interface CustomPeopleDto {
  peopleId?: string;
  nombre: string;
  altura: number;
  colorCabello: string;
  colorOjo: string;
  anioNecimiento: string;
  genero: "M" | "F" | "-";
}

export const customPeopleDtoSchema = Joi.object<CustomPeopleDto>({
  peopleId: Joi.string().uuid().optional(),
  nombre: Joi.string().min(1).required(),
  genero: Joi.string().valid("M", "F", "-").required(),
  altura: Joi.number().positive().required(),
  anioNecimiento: Joi.number().positive().required(),
  colorCabello: Joi.string().required(),
  colorOjo: Joi.string().required(),
});
