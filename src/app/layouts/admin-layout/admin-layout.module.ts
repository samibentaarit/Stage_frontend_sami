import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { EleveComponent, DialogEleve, EditDialogEleve } from 'app/pages/eleve/eleve/eleve.component';
import { DialogPersonnel, EditDialogPersonnel, PersonnelComponent } from 'app/pages/personnel/personnel/personnel.component';
import { DialogStation, EditDialogStation, StationComponent } from 'app/pages/station/station/station.component';
import {ClasseComponent, DialogClasse, EditDialogClasse} from 'app/pages/classe/classe/classe.component';
import { BusComponent, DialogBus, EditDialogBus } from 'app/pages/bus/bus/bus.component'; 
import { ChauffeurComponent, DialogChauffeur, EditDialogChauffeur } from 'app/pages/chauffeur/chauffeur.component'; 
import { AgenceComponent, DialogAgence, EditDialogAgence} from 'app/agence/agence/agence.component'; 


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    PersonnelComponent,
    EleveComponent,
    DialogEleve,
    EditDialogEleve,
    DialogPersonnel,
    EditDialogPersonnel,
    StationComponent,
    DialogStation,
    EditDialogStation,
    ClasseComponent,
    DialogClasse,
    EditDialogClasse,
    BusComponent, DialogBus, EditDialogBus ,
    ChauffeurComponent,DialogChauffeur, EditDialogChauffeur ,
    AgenceComponent, DialogAgence, EditDialogAgence
    ],
})
export class AdminLayoutModule {}
