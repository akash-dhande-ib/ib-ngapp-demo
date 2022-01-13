import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SET_DATA } from 'src/app/store/file.actions';
import { FileService } from 'src/app/services/file.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-folder-tree',
  templateUrl: './folder-tree.component.html',
  styleUrls: ['./folder-tree.component.scss']
})
export class FolderTreeComponent implements OnInit {
  showFilePopup: boolean = false;
  folders: {}[] = [];
  dataLoaded: boolean = false;
  currentItem: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fileService: FileService,
    private store: Store<{ file: { folders: [], dataLoaded: boolean } }>
  ) {

  }

  ngOnInit(): void {
    this.fileService.fetchFiles().subscribe((data: any) => {
      setTimeout(() => {
        this.store.dispatch({
          type: SET_DATA,
          payload: data
        })
      }, 1000);
    });

    const result = this.store.select('file');
    result.subscribe((data: any) => {
      this.folders = [...data.folders];
      this.dataLoaded = data.dataLoaded;
    })
  }

  selectItem(e: any) {
    let slug = e.slug;
    if (slug) {
      this.showFilePopup = false;
      this.router.navigate([slug], { relativeTo: this.route });
    } else {
      this.showFilePopup = true;
    }
    this.currentItem = e;
  }
}
