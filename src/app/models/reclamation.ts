export interface Reclamation {
    id: number;
    sujet: string;
    description: string;
    date_reclamation: Date;
    dernier_mise_a_jour: Date;
    etat: string;
    id_user: number;
  }