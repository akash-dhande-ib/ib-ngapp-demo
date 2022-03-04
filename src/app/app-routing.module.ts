import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FolderDetailComponent } from './pages/folder-detail/folder-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { PlaygroundComponent } from './playground/playground.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'playground',
    component: PlaygroundComponent,
    children: []
  },
  {
    path: ':slug',
    component: FolderDetailComponent,
    children: []
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
