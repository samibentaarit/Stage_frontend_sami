import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClasseService } from 'app/services/classe.service';
import { DialogClasse } from '../classe/classe.component';
import { AnneeScolaire } from 'app/models/anneeScolaire';
import { AffectationLigneBusService } from 'app/services/affectation-ligne-bus.service'; 
import { Station } from 'app/models/Station';
import { Bus } from 'app/models/bus';
import { Ligne } from 'app/models/ligne';
import { Eleve } from 'app/models/eleve';
import { FormControl, Validators } from '@angular/forms';
import { AffectationEleveLigneBus } from 'app/models/affectationEleveLigneBus';
import { DialogAffectationEleveLigneBus } from '../affectation-eleve-ligne-bus/affectation-eleve-ligne-bus.component';
import { LigneService } from 'app/services/ligne.service';
import { BusService } from 'app/services/bus.service';
import { AnneeScolaireService } from 'app/services/annee-scolaire.service';
import { EleveService } from 'app/services/eleve.service';
import { AffectationEleveLigneBusService } from 'app/services/affectation-eleve-ligne-bus.service';
import { AffectationLigneBus } from 'app/models/affectation-ligne-bus';
import { Chauffeur } from 'app/models/chauffeur';
@Component({
  selector: 'app-affectations-bus-ligne',
  templateUrl: './affectation-bus-ligne.component.html',
  styleUrls: ['./affectation-bus-ligne.component.css']
})
export class AffectationBusLigneComponent implements OnInit {

  constructor(private affservice: AffectationLigneBusService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllAffectations();

  }
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
      const fullSearch = `${item.prenom} ${item.niveau} ${item.numClasse}`.toLowerCase();
      return fullSearch.includes(this.searchText.toLowerCase());
    });
  }




  refresh() {
    this.getAllAffectations();
  }

  private getAllAffectations() {
    this.affservice.getAllAffectations().subscribe(
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





  openDialog() {
    const dialogRef = this.dialog.open(DialogAffectationBusLigneComponent, {
      width: '500px',
      data: {
       
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
  selector: 'dialog-affectation-ligne-bus',
  templateUrl: 'dialog-affectation-bus-ligne.component.html',
})

// tslint:disable-next-line:component-class-suffix
export class DialogAffectationBusLigneComponent implements OnInit {
  categoryControl = new FormControl('', Validators.required);
  
  busList: Bus[]=[];
  ligneList: Ligne[]=[];
  anneeScolaires: AnneeScolaire[] = [];
  affectationBusLigne: AffectationLigneBus;
  chauffeurList: Chauffeur[]=[];
  constructor(
      public dialogRef: MatDialogRef<DialogAffectationBusLigneComponent>,
      @Inject(MAT_DIALOG_DATA) public data: AffectationLigneBus,
      private ligneService: LigneService,
      private busService: BusService,
      private anneeScolaireService: AnneeScolaireService,
     
      private affectationLigneBusService: AffectationLigneBusService
      ) { }
      ngOnInit(): void {
    //get all années
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
    //get all bus
    this.busService.getAllBuses().subscribe(busList =>{
      this.busList = busList;
      console.log(busList);
    })
    //get all lignes
    this.ligneService.listLigne().subscribe(ligneList =>{
    this.ligneList = ligneList;
    console.log(ligneList);
    })
        //get all lignes
        this.ligneService.listChauffeur().subscribe(chauffeurList =>{
          this.chauffeurList = chauffeurList;
          console.log(chauffeurList);
          })
  }

  ngSubmit(){
    this.affectationBusLigne = new AffectationLigneBus(
      this.data.anneeScolaire,
      this.data.listDesLignes,
      this.data.listDesBus,
      this.data.listDesChauffeurs
    )
    console.log(this.affectationBusLigne);
    this.affectationLigneBusService.createAffectations(this.affectationBusLigne).subscribe(data =>{
      console.log(data);
    })
    this.dialogRef.close();
  }

  onCancel(): void {
    // Close the dialog without any action
    this.dialogRef.close();
  }
}
