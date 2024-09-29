import { SwapiPeopleDto } from "../dto/swapi-people.dto";
import { SwapiPeopleEntity } from "../entities/swapi-people.entity";

export class SwapiPeopleMapper {
  toSwapiPeopleToSpanish(swapiPeopleEntity: SwapiPeopleEntity): SwapiPeopleDto {
    return {
      altura: swapiPeopleEntity.height,
      anioNecimiento: swapiPeopleEntity.birth_year,
      colorCabello: swapiPeopleEntity.hair_color,
      colorOjo: swapiPeopleEntity.eye_color,
      fechaCreacion: swapiPeopleEntity.created,
      genero: swapiPeopleEntity.gender,
      naves: swapiPeopleEntity.starships,
      nombre: swapiPeopleEntity.name,
      peliculas: swapiPeopleEntity.films,
      url: swapiPeopleEntity.url,
      veiculos: swapiPeopleEntity.vehicles,
    };
  }

  toListSwapiPeopleToSpanish(
    listSwapiPeopleEntity: SwapiPeopleEntity[]
  ): SwapiPeopleDto[] {
    return listSwapiPeopleEntity.map((item) =>
      this.toSwapiPeopleToSpanish(item)
    );
  }
}
