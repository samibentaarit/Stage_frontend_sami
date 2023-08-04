import { Station } from "./Station";
import { AnneeScolaire } from "./anneeScolaire";
import { Bus } from "./bus";
import { Eleve } from "./eleve";
import { Ligne } from "./ligne";

export class AffectationEleveLigneBus {
    id: number;
    anneeScolaire: AnneeScolaire;
    etat?: string;
    eleves: Eleve[];
    listDesLignes: Ligne[];
    listDesBus: Bus[];
    stationAller: Station[];
    stationRetour: Station[];
    constructor( anneeScolaire: AnneeScolaire,eleves: Eleve[],listDesLignes: Ligne[],listDesBus: Bus[],stationAller: Station[],stationRetour: Station[],etat?: string) 
      {
      this.eleves = eleves;
      this.listDesLignes = listDesLignes;
      this.listDesBus = listDesBus;
      this.stationAller = stationAller;
      this.stationRetour = stationRetour;
      this.anneeScolaire = anneeScolaire;
      this.etat = etat;
    }
  }