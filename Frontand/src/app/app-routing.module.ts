import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddRequestComponent } from './components/add_request/add-request.component';
import { UpdateRequestComponent } from './components/update-request/update-request.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddRequestComponent },
  { path: 'update', component: UpdateRequestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
