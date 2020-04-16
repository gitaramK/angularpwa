import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsListComponent } from './details-list/details-list.component';
import { ShowListComponent } from './show-list/show-list.component';



const routes: Routes = [
  { path: '', component: ShowListComponent },
  { path: 'detail-list', component: DetailsListComponent },
 
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
