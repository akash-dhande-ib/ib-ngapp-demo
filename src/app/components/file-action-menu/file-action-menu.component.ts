import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FileFolder } from 'src/app/model/file-folder';
import { FileService } from 'src/app/services/file.service';
import { DELETE_FILE, DELETE_FOLDER } from 'src/app/store/file.actions';

@Component({
  selector: 'app-file-action-menu',
  templateUrl: './file-action-menu.component.html',
  styleUrls: ['./file-action-menu.component.scss']
})
export class FileActionMenuComponent implements OnInit {
  @Input() info!: FileFolder;
  showDeleteConfirmation: boolean = false;
  actionItems = [
    { name: 'Edit' },
    { name: 'Delete' }
  ]

  constructor(
    private fileService: FileService,
    private store: Store
  ) { }

  ngOnInit(): void {
  }


  /**
   * Dropdown Action
   */
  dropdownAction(e: any) {
    if (e.itemData.name === 'Edit') {
      this.editAction();
    } else {
      this.showDeleteConfirmation = true;
    }
  }

  /**
   * Edit Action
   */
  editAction() {
    this.fileService.addEditAction.next({
      show: true,
      id: this.info.id,
      type: this.info.icon
    })
  }

  /**
   * Delete Action
   */
  deleteAction() {
    this.store.dispatch({
      type: this.info.icon === 'folder' ? DELETE_FOLDER : DELETE_FILE,
      payload: this.info.id
    })
  }
}
