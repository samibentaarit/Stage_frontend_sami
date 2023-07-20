import { Component, OnInit , Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AgenceModel } from 'app/models/agenceModel';
import { AgenceService } from 'app/services/agence.service';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.css']
})
export class AgenceComponent implements OnInit {


  dataSource = [];

  filteredData: any[] = [];
  searchText = '';

  constructor(private agenceService: AgenceService,
    public dialog: MatDialog) { }

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
      const fullName = `${item.nom} ${item.prenom}`.toLowerCase();
      const fullNameInv = `${item.prenom} ${item.nom}`.toLowerCase();

      return (
        fullName.includes(this.searchText.toLowerCase()) ||
        fullNameInv.includes(this.searchText.toLowerCase())
      );
    });
  }

  ngOnInit(): void {
    this.getAllAgencesActive();
    console.log(this.dataSource);
  }

  refresh() {
    this.getAllAgencesActive();
  }

  private getAllAgencesActive() {
    this.agenceService.getAllAgenceEtatActif().subscribe(
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

  archiverAgence(id) {
    this.agenceService.archiverAgence(id).subscribe((res: any) => {
      this.refresh();
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAgence, {
      width: '500px',
      data: {
        nom: '',
        prenom: '',
        email: '',
        etat: '',
        num: [],
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.refresh();
    });
  }

  openEditDialog(id: number, nom: string, prenom: string, email: string, etat: string, num: string[]): void {
    const dialogRef = this.dialog.open(EditDialogAgence, {
      width: '500px',
      data: {
        id: id,
        nom: nom,
        prenom: prenom,
        email: email,
        etat: etat,
        num: num,
        
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }
}

@Component({
  selector: 'dialog-agence',
  templateUrl: 'dialog-agence.html',
})
export class DialogAgence {

  newNum: any;

  constructor(
    public dialogRef: MatDialogRef<DialogAgence>,
    @Inject(MAT_DIALOG_DATA) public data: AgenceModel,
    private agenceService: AgenceService) { }

  submit() {

    this.data.etat = 'activer';

    const perso = {
      nom: this.data.nom,
      nom_responsable: this.data.nom_responsable,
      adresse: this.data.adresse,
      email: this.data.email,
      info_supp: this.data.info_supp,
      etat: this.data.etat,
      num: this.data.num,
    };

    this.agenceService.addAgence(perso).subscribe((res: any) => {
      this.dialogRef.close();
    });
  }

  removeNum(index: number) {
    this.data.num.splice(index, 1);
  }

  addNumTel() {
    if (this.newNum) {
      this.data.num.push(this.newNum);
      this.newNum = '';
    }
  }
}

@Component({
  selector: 'edit-dialog-agence',
  templateUrl: 'edit-dialog-agence.html',
})
export class EditDialogAgence {

  newNum: any;

  constructor(
    public dialogRef: MatDialogRef<EditDialogAgence>,
    @Inject(MAT_DIALOG_DATA) public data: AgenceModel,
    private agenceService: AgenceService) { }

  submitEdit() {
    const id = this.data.id;
    const perso = {
      nom: this.data.nom,
      nom_responsable: this.data.nom_responsable,
      adresse: this.data.adresse,
      email: this.data.email,
      info_supp: this.data.info_supp,
      etat: this.data.etat,
      num: this.data.num,
      
    };

    console.log(id);
    console.log(perso);


    this.agenceService.updateAgence(this.data.id, perso).subscribe((res: any) => {
      this.dialogRef.close();
    });
  }

  removeNum(index: number) {
    this.data.num.splice(index, 1);
  }

  addNumTel() {
    if (this.newNum) {
      this.data.num.push(this.newNum);
      this.newNum = '';
    }
  }
}

