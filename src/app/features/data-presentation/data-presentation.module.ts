import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataPresentationComponent } from './data-presentation.component';
import { DataTableComponent } from './data-table/data-table.component';
import { DataManagementComponent } from './data-management/data-management.component';
import { DataPresentationRoutingModule } from './data-presentation-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DataManagementComponent,
    DataTableComponent,
    DataPresentationComponent
  ],
  imports: [
    CommonModule,
    DataPresentationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DataPresentationModule { }
