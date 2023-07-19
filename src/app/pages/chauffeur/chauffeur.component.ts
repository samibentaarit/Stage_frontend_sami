import { Component, OnInit , Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChauffeurModel } from 'app/models/chauffeurModel';
import { ChauffeurService } from 'app/services/chauffeur.service';

@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.css']
})
export class ChauffeurComponent implements OnInit {


  dataSource = [];

  filteredData: any[] = [];
  searchText = '';

  constructor(private chauffeurService: ChauffeurService,
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
    this.getAllChauffeursActive();
    console.log(this.dataSource);
  }

  refresh() {
    this.getAllChauffeursActive();
  }

  private getAllChauffeursActive() {
    this.chauffeurService.getAllChauffeurEtatActif().subscribe(
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

  archiverChauffeur(id) {
    this.chauffeurService.archiverChauffeur(id).subscribe((res: any) => {
      this.refresh();
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogChauffeur, {
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
    const dialogRef = this.dialog.open(EditDialogChauffeur, {
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
  selector: 'dialog-chauffeur',
  templateUrl: 'dialog-chauffeur.html',
})
export class DialogChauffeur {

  newNum: any;

  constructor(
    public dialogRef: MatDialogRef<DialogChauffeur>,
    @Inject(MAT_DIALOG_DATA) public data: ChauffeurModel,
    private chauffeurService: ChauffeurService) { }

  submit() {

    this.data.etat = 'activer';

    const perso = {
      nom: this.data.nom,
      prenom: this.data.prenom,
      email: this.data.email,
      etat: this.data.etat,
      num: this.data.num,
    };

    this.chauffeurService.addChauffeur(perso).subscribe((res: any) => {
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
  selector: 'edit-dialog-chauffeur',
  templateUrl: 'edit-dialog-chauffeur.html',
})
export class EditDialogChauffeur {

  newNum: any;

  constructor(
    public dialogRef: MatDialogRef<EditDialogChauffeur>,
    @Inject(MAT_DIALOG_DATA) public data: ChauffeurModel,
    private chauffeurService: ChauffeurService) { }

  submitEdit() {
    const id = this.data.id;
    const perso = {
      id: this.data.id,
      nom: this.data.nom,
      prenom: this.data.prenom,
      email: this.data.email,
      
      etat: this.data.etat,
      num: this.data.num,
      
    };

    console.log(id);
    console.log(perso);


    this.chauffeurService.updateChauffeur(this.data.id, perso).subscribe((res: any) => {
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

