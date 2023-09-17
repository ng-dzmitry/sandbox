import { NgModule } from '@angular/core';
import { DataPresentationComponent } from './data-presentation.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: DataPresentationComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class DataPresentationRoutingModule { }
