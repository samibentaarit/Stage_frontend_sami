import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Bus } from 'app/models/busModel';
import { BusService } from 'app/services/bus.service';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent implements OnInit {
  filteredData: any[] = [];
  private dataSource: any;
  searchText = '';

  constructor(private busService: BusService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllBussActive();
  }

  refresh() {
    this.getAllBussActive();
  }

  private getAllBussActive() {
    this.busService.getAllBusEtatActif().subscribe(
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

  archiverBus(id: number) {
    this.busService.archiverBus(id).subscribe((res: any) => {
      // Handle success or show notification
      this.refresh();
    });
  }

  // tslint:disable-next-line:max-line-length
  openEditDialog(id: number, num_bus: string, marque_bus: string, immatriculation_bus: string, nb_places: number, etat: string): void {
    const dialogRef = this.dialog.open(EditDialogBus, {
      width: '500px',
      data: {
        id: id,
        num_bus: num_bus,
        marque_bus: marque_bus,
        immatriculation_bus: immatriculation_bus,
        nb_places: nb_places,
        etat: etat
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBus, {
      width: '500px',
      data: {
        num_bus: '',
        marque_bus: '',
        immatriculation_bus: '',
        nb_places: '',
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
      const fullSearch = `${item.num_bus} ${item.marque_bus}`.toLowerCase();
      return fullSearch.includes(this.searchText.toLowerCase());
    });
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-bus',
  templateUrl: 'dialog-bus.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogBus {
  constructor(
      public dialogRef: MatDialogRef<DialogBus>,
      @Inject(MAT_DIALOG_DATA) public data: Bus,
      private busService: BusService
  ) { }

  submit() {
    const st: { num_bus: string; marque_bus: string; immatriculation_bus: string; nb_places: number; etat: string } = {
      num_bus: this.data.num_bus,
      immatriculation_bus: this.data.immatriculation_bus,
      marque_bus: this.data.marque_bus,
      nb_places: this.data.nb_places,
      etat: 'activer'
    };

    this.busService.addBus(st).subscribe((res: any) => {
      // Handle success or show notification
      this.dialogRef.close();
    });
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'edit-dialog-bus',
  templateUrl: 'edit-dialog-bus.html',
})
// tslint:disable-next-line:component-class-suffix
export class EditDialogBus {
  constructor(
      public dialogRef: MatDialogRef<EditDialogBus>,
      @Inject(MAT_DIALOG_DATA) public data: Bus,
      private busService: BusService
  ) { }

  submitEdit() {
    const id = this.data.id;

    const st: { id: number; nb_places: number; marque_bus: string; num_bus: string; immatriculation_bus: string; etat: string } = {
      id: this.data.id,
      num_bus: this.data.num_bus,
      marque_bus: this.data.marque_bus,
      immatriculation_bus: this.data.immatriculation_bus,
      nb_places: this.data.nb_places,
      etat: this.data.etat
    };

    this.busService.updateBus(id, st).subscribe((res: any) => {
      // Handle success or show notification
      this.dialogRef.close();
    });
  }
}