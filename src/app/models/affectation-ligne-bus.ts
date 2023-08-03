import { AnneeScolaire } from "./anneeScolaire";
import { Bus } from "./bus";
import { Chauffeur } from "./chauffeur";
import { Ligne } from "./ligne";

export class AffectationLigneBus {
    id: number;
    anneeScolaire: AnneeScolaire;
    listDesLignes: Ligne[];
    listDesBus: Bus[];
    listDesChauffeurs: Chauffeur[];
    constructor( anneeScolaire: AnneeScolaire,listDesLignes: Ligne[],listDesBus: Bus[],listDesChauffeurs: Chauffeur[]) 
      {
      this.listDesLignes = listDesLignes;
      this.listDesBus = listDesBus;
      this.anneeScolaire = anneeScolaire;
      this.listDesChauffeurs = listDesChauffeurs;
    }
  }