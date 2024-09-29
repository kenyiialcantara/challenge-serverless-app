import { Router } from "express";
import { SwapiPeopleController } from "./swapi-people-controller";

const routerSwapiPeople = Router();
const swapiPeopleController = new SwapiPeopleController();

routerSwapiPeople.get(
  "/swapi-people",
  swapiPeopleController.getSwapiPeople.bind(swapiPeopleController)
);

export { routerSwapiPeople };
