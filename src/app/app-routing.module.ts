import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FolderDetailComponent } from './pages/folder-detail/folder-detail.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: ':slug',
    component: FolderDetailComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
