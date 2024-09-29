import { STATUS_CODES } from "http";
import { Request, Response } from "express";
import { CustomPeopleService } from "./custom-people-service";
import Joi from "joi";
import { customPeopleDtoSchema } from "./dto/custom.people.dto";
import { paginationDtoSchema } from "../dto/pagination.dto";

export class CustomPeopleController {
  private customPeopleService: CustomPeopleService;

  constructor() {
    this.customPeopleService = new CustomPeopleService();
  }

  async getAllCustomPeople(req: Request, res: Response) {
    try {
      const { error, value } = paginationDtoSchema.validate(req.query);
      if (error) {
        res
          .status(400)
          .json({ error: error.details.map((item) => item.message) });
      }
      const data = await this.customPeopleService.getAllPeople(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({
        message: `Error when get all custom users: ${error} (${STATUS_CODES["500"]})`,
      });
    }
  }

  async getByIdCustomUser(req: Request, res: Response) {
    try {
      const { error, value } = Joi.object({
        peopleId: Joi.string().uuid(),
      }).validate({ peopleId: req.params.peopleId });

      if (error) {
        res
          .status(400)
          .json({ error: error.details.map((item) => item.message) });
      }

      res.json(
        await this.customPeopleService.getCustomPeopleById(req.params.peopleId)
      );
    } catch (error) {
      res.status(500).json({
        message: `Error when get by id custom users: ${error} (${STATUS_CODES["500"]})`,
      });
    }
  }

  async postCustomUser(req: Request, res: Response) {
    try {
      const { error, value } = customPeopleDtoSchema.validate(req.body);
      if (error) {
        res
          .status(400)
          .json({ error: error.details.map((item) => item.message) });
      }

      res.json(await this.customPeopleService.saveCustomPeople(req.body));
    } catch (error) {
      res.status(500).json({
        message: `Error when save custom users: ${error} (${STATUS_CODES["500"]})`,
      });
    }
  }
}
