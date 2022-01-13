import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { DxFormComponent } from 'devextreme-angular';
import { FolderDetailComponent } from '../../pages/folder-detail/folder-detail.component';
import { ADD_FILE, ADD_FOLDER, EDIT_FILE, EDIT_FOLDER } from 'src/app/store/file.actions';
import { FileService } from 'src/app/services/file.service';
import { FileFolder } from '../../model/file-folder';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.scss']
})
export class AddEditItemComponent implements OnInit {
  @ViewChild(DxFormComponent) form!: DxFormComponent;
  itemLength!: number;
  showAddPopup: boolean = false;
  itemSelected!: number | null;
  editId!: number;
  folders!: [];
  type!: string;
  formTitle: string = 'Add/Edit File/Folder';
  mode: string = 'add';
  buttonOptions: any = {
    text: 'Add',
    type: 'success',
    useSubmitBehavior: true,
  };
  formData: { name: string } = { name: '' };

  constructor(
    private fileService: FileService,
    private store: Store<{ file: { folders: [], addEdit: any } }>
  ) { }

  ngOnInit(): void {

    // Watch store change
    const result = this.store.select('file');
    result.subscribe((data: any) => {
      this.itemLength = data.folders.length;
      this.folders = data.folders;
    })

    // Watch selected item call
    this.fileService.itemSelected.subscribe((val: any) => {
      this.itemSelected = val;
    })

    // Watch add/edit action call
    this.fileService.addEditAction.subscribe((val: any) => {
      this.showAddPopup = val.show;
      this.type = val.type;
      this.editId = val.id;
    })
  }

  /**
   * When Form Submits
   */
  onFormSubmit(e: any) {
    let data: FileFolder = {
      id: this.itemLength * 2,
      name: this.formData.name,
      icon: this.type,
    };
    let type = this.type === 'folder' ? ADD_FOLDER : ADD_FILE;

    // For Add Action
    if (this.mode === 'add') {
      data.parentId = this.itemSelected;
    }

    // For Edit Action
    if (this.mode === 'edit') {
      data.id = this.editId;
      type = this.type === 'folder' ? EDIT_FOLDER : EDIT_FILE;
    }

    // Add Slug for Folders
    if (this.type === 'folder' && this.mode === 'add') {
      data.slug = this.formData.name.split(' ').join('-').toLowerCase() + '-' + +this.itemLength * 2;
    }

    console.log(data)

    // Dispatch the action to store
    this.store.dispatch({
      type,
      payload: data
    });

    // Reset the Dialog
    this.onPopupHidden();
  }

  /**
   * When Popup Opens
   */
  onPopupShowing(): void {
    // Set the TItle
    if (this.type === 'folder') {
      this.formTitle = 'Add Folder';
    } else {
      this.formTitle = 'Add File';
    }

    // For Edit Action
    if (this.editId) {
      this.mode = 'edit';

      // Update Title
      if (this.type === 'folder') {
        this.formTitle = 'Edit Folder';
      } else {
        this.formTitle = 'Edit File';
      }

      this.buttonOptions.text = 'Update';

      // Set the name in the form
      let item: any = this.folders.find((item: FileFolder) => item.id === +this.editId);
      this.formData.name = item.name;
    }
  }

  /**
   * When Popup Closes
   */
  onPopupHidden(): void {
    this.form.instance.resetValues();
    this.fileService.addEditAction.next({ show: false });
  }
}
