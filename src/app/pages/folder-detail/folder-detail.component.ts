import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FileService } from 'src/app/services/file.service';
import { FileFolder } from 'src/app/model/file-folder';

@Component({
  selector: 'app-folder-detail',
  templateUrl: './folder-detail.component.html',
  styleUrls: ['./folder-detail.component.scss']
})
export class FolderDetailComponent implements OnInit {
  paramSubscription!: Subscription;
  selectedId!: number;
  folders: FileFolder[] = [];
  allFolders: FileFolder[] = [];

  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private store: Store<{ file: { folders: [], dataLoaded: boolean } }>
  ) { }

  ngOnInit(): void {

    // Get data on route change
    this.paramSubscription = this.route.params.subscribe(param => {
      let slug = param['slug'].split('-');
      let itemSelected = slug.pop();
      this.selectedId = +itemSelected;
      this.fileService.itemSelected.next(+itemSelected);
      this.getData();
    })

    // Get data on store update
    const result = this.store.select('file');
    result.subscribe((data) => {
      this.allFolders = data.folders;
      if (data.dataLoaded) {
        this.getData();
      }
    })
  }

  getData() {
    this.folders = this.allFolders.filter((item: FileFolder) => item.parentId === this.selectedId);
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }
}
