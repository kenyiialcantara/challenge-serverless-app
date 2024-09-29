import { SwapiPeopleEntity } from "./entities/swapi-people.entity";
import { SwapiPeopleMapper } from "./mappers/SwapiPeopleMapper";

export class SwapiPeopleService {
  private swapiPeopleMapper: SwapiPeopleMapper;
  constructor() {
    this.swapiPeopleMapper = new SwapiPeopleMapper();
  }

  public async getAllSwapiPeople() {
    // if (!process.env.URL_SWAPI_PEOPLE) {
    //   throw new Error("URL_SWAPI_PEOPLE environment variable not found");
    // }
    try {
      //   const response = await fetch(process.env.URL_SWAPI_PEOPLE);
      const response = await fetch("https://swapi.py4e.com/api/people");
      if (!response.ok) {
        throw new Error(`Error response swapi with ${response.status}`);
      }
      const data = await response.json();

      const listSwapiPeople: SwapiPeopleEntity[] = data.results;

      //Mapped and return
      return this.swapiPeopleMapper.toListSwapiPeopleToSpanish(listSwapiPeople);
    } catch (error) {
      throw new Error("Error get people from swapi");
    }
  }
}
