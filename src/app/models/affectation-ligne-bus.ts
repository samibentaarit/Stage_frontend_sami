import { AnneeScolaire } from "./anneeScolaire";
import { Bus } from "./bus";
import { Chauffeur } from "./chauffeur";
import { Ligne } from "./ligne";

export class AffectationLigneBus {
    id: number;
    anneeScolaire?: AnneeScolaire;
    etat?: string;
    listDesLignes: Ligne[];
    listDesBus: Bus[];
    listDesChauffeurs: Chauffeur[];
    constructor( listDesLignes: Ligne[],listDesBus: Bus[],listDesChauffeurs: Chauffeur[],anneeScolaire?: AnneeScolaire,etat?: string) 
      {
      this.listDesLignes = listDesLignes;
      this.listDesBus = listDesBus;
      this.anneeScolaire = anneeScolaire;
      this.listDesChauffeurs = listDesChauffeurs;
      this.etat = etat;
    }
  }