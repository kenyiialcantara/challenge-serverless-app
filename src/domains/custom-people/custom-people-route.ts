import { Router } from "express";
import { CustomPeopleController } from "./custom-people-controller";

const routerCustomPeople = Router();
const customPeopleController = new CustomPeopleController();

routerCustomPeople.get(
  "/custom-people",
  customPeopleController.getAllCustomPeople.bind(customPeopleController)
);

routerCustomPeople.get(
  "/custom-people/:peopleId",
  customPeopleController.getByIdCustomUser.bind(customPeopleController)
);

routerCustomPeople.post(
  "/custom-people",
  customPeopleController.postCustomUser.bind(customPeopleController)
);

export { routerCustomPeople };
