import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FolderTreeComponent } from './components/folder-tree/folder-tree.component';
import {
  DxButtonModule,
  DxDropDownButtonModule,
  DxFormModule,
  DxPopupModule,
  DxScrollViewModule,
  DxToolbarModule,
  DxTreeViewModule,
  DxLoadIndicatorModule
} from 'devextreme-angular';
import { FolderDetailComponent } from './pages/folder-detail/folder-detail.component';
import { BreadcrumbComponent } from './components/layouts/breadcrumb/breadcrumb.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FileComponent } from './components/file/file.component';
import { FileService } from './services/file.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { fileReducer } from './store/file.reducer';
import { AddEditItemComponent } from './components/add-edit-item/add-edit-item.component';
import { FileActionMenuComponent } from './components/file-action-menu/file-action-menu.component';
import { PlaygroundComponent } from './playground/playground.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FolderTreeComponent,
    FolderDetailComponent,
    BreadcrumbComponent,
    HeaderComponent,
    FileComponent,
    AddEditItemComponent,
    FileActionMenuComponent,
    PlaygroundComponent
  ],
  imports: [
    BrowserModule,
    DxTreeViewModule,
    DxScrollViewModule,
    DxButtonModule,
    HttpClientModule,
    DxToolbarModule,
    DxDropDownButtonModule,
    DxLoadIndicatorModule,
    DxFormModule,
    DxPopupModule,
    FormsModule,
    StoreModule.forRoot({
      file: fileReducer
    }, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    AppRoutingModule
  ],
  providers: [FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
