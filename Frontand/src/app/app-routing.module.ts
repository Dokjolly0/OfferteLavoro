import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddRequestComponent } from './components/add-request/add-request.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddRequestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
