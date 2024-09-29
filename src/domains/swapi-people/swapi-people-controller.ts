import { STATUS_CODES } from "http";
import { SwapiPeopleService } from "./swapi-people-service";
import { Request, Response } from "express";

export class SwapiPeopleController {
  private swapiPeopleService: SwapiPeopleService;

  constructor() {
    this.swapiPeopleService = new SwapiPeopleService();
  }

  async getSwapiPeople(req: Request, res: Response) {
    try {
      const people = await this.swapiPeopleService.getAllSwapiPeople();
      res.status(200).json(people);
    } catch (error) {
      res
        .status(500)
        .json({
          message: `Error in get swapi people: ${error} (${STATUS_CODES["500"]})`,
        });
    }
  }
}
