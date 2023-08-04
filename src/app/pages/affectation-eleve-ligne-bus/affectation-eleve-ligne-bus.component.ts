import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Station } from 'app/models/Station';
import { AffectationEleveLigneBus } from 'app/models/affectationEleveLigneBus';
import { AnneeScolaire } from 'app/models/anneeScolaire';
import { Bus } from 'app/models/bus';
import { Eleve } from 'app/models/eleve';
import { Ligne } from 'app/models/ligne';
import { AffectationEleveLigneBusService } from 'app/services/affectation-eleve-ligne-bus.service';
import { AnneeScolaireService } from 'app/services/annee-scolaire.service';
import { BusService } from 'app/services/bus.service';
import { EleveService } from 'app/services/eleve.service';
import { LigneService } from 'app/services/ligne.service';

@Component({
  selector: 'app-affectation-eleve-ligne-bus',
  templateUrl: './affectation-eleve-ligne-bus.component.html',
  styleUrls: ['./affectation-eleve-ligne-bus.component.css']
})
export class AffectationEleveLigneBusComponent implements OnInit {
  filteredData: any[] = [];
  private dataSource: any;
  searchText = '';
  constructor(public dialog: MatDialog,private AffectationEleveLigneBus:AffectationEleveLigneBusService) { }

  ngOnInit(): void {
    this.getAffectationEleveLigneBus() 
  }

  refresh() {
    this.getAffectationEleveLigneBus() ;
  }

  private getAffectationEleveLigneBus() {
    this.AffectationEleveLigneBus.getAffectationEleveLigneBus().subscribe(
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
    const dialogRef = this.dialog.open(DialogAffectationEleveLigneBus, {
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
}





@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-affectation-eleve-ligne-bus',
  templateUrl: 'dialog-affectation-eleve-ligne-bus.html',
})

// tslint:disable-next-line:component-class-suffix
export class DialogAffectationEleveLigneBus implements OnInit {

  categoryControl = new FormControl('', Validators.required);
  listStation: Station[]=[];
  busList: Bus[]=[];
  ligneList: Ligne[]=[];
  eleveList: Eleve[]=[];
  anneeScolaires: AnneeScolaire[] = [];
  affectationEleveLigneBus: AffectationEleveLigneBus;
 



  constructor(
      public dialogRef: MatDialogRef<DialogAffectationEleveLigneBus>,
      @Inject(MAT_DIALOG_DATA) public data: AffectationEleveLigneBus,
      private ligneService: LigneService,
      private busService: BusService,
      private anneeScolaireService: AnneeScolaireService,
      private eleveService: EleveService,
      private affectationEleveLigneBusService: AffectationEleveLigneBusService
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
    //get all stations
    this.ligneService.listStation().subscribe(listStation =>{
      this.listStation = listStation;
      console.log(listStation);
    })
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
    //get all eleves
    this.eleveService.listEleve().subscribe(eleveList =>{
    this.eleveList = eleveList;
    console.log(eleveList);
    })
    
  }

  ngSubmit(){
    this.affectationEleveLigneBus = new AffectationEleveLigneBus(
      this.data.anneeScolaire,
      this.data.eleves,
      this.data.listDesLignes,
      this.data.listDesBus,
      this.data.stationAller,
      this.data.stationRetour,
      this.data.etat = 'activer',
    )
    console.log(this.affectationEleveLigneBus);
    this.affectationEleveLigneBusService.createAffectationEleveLigneBus(this.affectationEleveLigneBus).subscribe(data =>{
      console.log(data);
    })
    this.dialogRef.close();
  }

  onCancel(): void {
    // Close the dialog without any action
    this.dialogRef.close();
  }
}
