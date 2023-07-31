import { Station } from "./Station";
import { AnneeScolaire } from "./anneeScolaire";
import { Bus } from "./bus";
import { Eleve } from "./eleve";
import { Ligne } from "./ligne";

export class AffectationEleveLigneBus {
    id: number;
    anneeScolaire: AnneeScolaire;
    eleves: Eleve[];
    listDesLignes: Ligne[];
    listDesBus: Bus[];
    stationAller: Station[];
    stationRetour: Station[];
    constructor(
      anneeScolaire: AnneeScolaire,eleves: Eleve[],listDesLignes: Ligne[],listDesBus: Bus[],stationAller: Station[],stationRetour: Station[]) 
      {
      this.anneeScolaire = anneeScolaire;
      this.eleves = eleves;
      this.listDesLignes = listDesLignes;
      this.listDesBus = listDesBus;
      this.stationAller = stationAller;
      this.stationRetour = stationRetour;
    }
  }