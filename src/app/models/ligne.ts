import { Station } from "./Station";
import { AnneeScolaire } from "./anneeScolaire";

export class Ligne {
    id: number;
    nomLigne: string;
    typeTrajet: string;
    stations: Station[];
    anneeScolaire: AnneeScolaire;
    constructor(nomLigne: string, typeTrajet: string, anneeScolaire: AnneeScolaire, stations: Station[]) {
      this.nomLigne = nomLigne;
      this.typeTrajet = typeTrajet;
      this.anneeScolaire = anneeScolaire;
      this.stations = stations;
    }
  }
  