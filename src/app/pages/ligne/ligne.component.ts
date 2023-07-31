import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Ligne} from '../../models/ligne';
import {LigneService} from '../../services/ligne.service';
import {EditDialogEleve} from '../eleve/eleve.component';
import {Agence} from '../../models/agence';
import {AnneeScolaire} from '../../models/anneeScolaire';
import {AnneeScolaireService} from '../../services/annee-scolaire.service';
import { StationService } from 'app/services/station.service';
import { Station } from 'app/models/Station';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ligne',
  templateUrl: './ligne.component.html',
  styleUrls: ['./ligne.component.css']
})
export class LigneComponent implements OnInit {
  filteredData: any[] = [];
  private dataSource: any;
  searchText = '';


  onSearchChange() {
    // Reset the filteredData array
    this.filteredData = [];

    // Check if the search text is empty
    if (!this.searchText) {
      this.filteredData = this.dataSource;
      return;
    }

    // Perform the search based on the searchText
    this.filteredData = this.dataSource.filter(item => {
      // Customize the search criteria as per your requirements
      const fullSearch = `${item.cycle} ${item.niveau} ${item.numClasse}`.toLowerCase();
      return fullSearch.includes(this.searchText.toLowerCase());
    });
  }

  constructor(private ligneService: LigneService,
      public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllClassesActive();
  }

  refresh() {
    this.getAllClassesActive();
  }

  private getAllClassesActive() {
    this.ligneService.getAllLigneEtatActif().subscribe(
        (res: any) => {
          console.log(res);
          this.dataSource = res;
          this.filteredData = res;
        },
        (err: any) => {
          console.log(err);
        }
    );
  }

  archiverLigne(id) {
    this.ligneService.archiverLigne(id).subscribe((res: any) => {
      // this.showNotification('top', 'right', 'La classe a été supprimer', 'danger');
      this.refresh();
    });
  }

    openEditDialog(id: number, cycle: string, niveau: string, numClasse: string, etat: string, anneeScolaire: AnneeScolaire): void {
    // @ts-ignore
      const dialogRef = this.dialog.open(EditDialogClasse, {
      width: '500px',
      data: {
        id: id,
        cycle: cycle,
        niveau: niveau,
        numClasse: numClasse,
        etat: etat,
        anneeScolaire: anneeScolaire
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }


  openDialog() {
    const dialogRef = this.dialog.open(DialogLigne, {
      width: '500px',
      data: {
        cycle: '',
        niveau: '',
        numClasse: '',
        etat: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.refresh();
    });
  }


}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-ligne',
  templateUrl: 'dialog-ligne.html',
})

// tslint:disable-next-line:component-class-suffix
export class DialogLigne implements OnInit {

  anneeScolaires: AnneeScolaire[] = [];
  stations: Station[]=[];


  

  categoryControl = new FormControl('', Validators.required);
  
  stationList: Station[]=[];

  ligne: Ligne;



  constructor(
      public dialogRef: MatDialogRef<DialogLigne>,
      @Inject(MAT_DIALOG_DATA) public data: Ligne,
      private ligneService: LigneService,
      private anneeScolaireService: AnneeScolaireService,
      private stationService: StationService) { }




      ngOnInit(): void {
        this.anneeScolaireService.getAllAnneesScolairesEtatActif().subscribe(
            (an) => {
              // @ts-ignore
              this.anneeScolaires = an;
            },
            (error) => {
              console.error(error);
              // Handle error here
            }
        );

    this.ligneService.listStation().subscribe(listStation =>{
      this.stationList = listStation;
      console.log(listStation);
    })
    
  }

  ngSubmit(){
    this.ligne = new Ligne(
      this.data.nomLigne,
      this.data.typeTrajet,
      this.data.anneeScolaire,
      this.data.stations
    )
    console.log(this.ligne);
    this.ligneService.createLigne(this.ligne).subscribe(data =>{
      console.log(data);
    })
    this.dialogRef.close();
  }

  onCancel(): void {
    // Close the dialog without any action
    this.dialogRef.close();
  }
}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'edit-dialog-ligne',
  templateUrl: 'edit-dialog-ligne.html',
})

// tslint:disable-next-line:component-class-suffix
export class EditDialogLigne implements OnInit {

  anneeScolaires: AnneeScolaire[] = [];

  constructor(
      public dialogRef: MatDialogRef<EditDialogLigne>,
      @Inject(MAT_DIALOG_DATA) public data: Ligne,
      private ligneService: LigneService,
      private anneeScolaireService: AnneeScolaireService) { }

  ngOnInit(): void {
    this.anneeScolaireService.getAllAnneesScolairesEtatActif().subscribe(
        (an) => {
          // @ts-ignore
          this.anneeScolaires = an.filter(annee => annee.id !== this.data.anneeScolaire.id);
        },
        (error) => {
          console.error(error);
          // Handle error here
        }
    );
  }
  submitEdit() {
    const id = this.data.id;
    const ligne: Ligne = {
      id: this.data.id,
      typeTrajet: this.data.typeTrajet,
      nomLigne: this.data.nomLigne,
      stations: this.data.stations,
      anneeScolaire: this.data.anneeScolaire
    };
   // this.ligneService.updateLigne(id, ligne).subscribe((res: any) => {
      // Handle success or show notification
   //   this.dialogRef.close();
   // });
  }

  onCancel(): void {
    // Close the dialog without any action
    this.dialogRef.close();
  }

}


