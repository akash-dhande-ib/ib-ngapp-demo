import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { FileService } from 'src/app/services/file.service';
import { FileFolder } from '../../../model/file-folder';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  links: FileFolder[] = [];
  folders!: [];

  constructor(
    private fileService: FileService,
    private store: Store<{ file: { folders: [] } }>
  ) { }

  ngOnInit(): void {
    const result = this.store.select('file');
    result.subscribe(data => {
      this.folders = data.folders;
    })

    this.fileService.itemSelected.subscribe((val) => {
      this.getBreadcrumb(val, true);
    })
  }


  /**
   * Filter items and generate breadcrumb
   */
  getBreadcrumb(id: number | null, first = true) {
    // Reset Links
    if (first) this.links = [];

    // Loop through to generate links
    this.folders.forEach((item: any) => {
      if (item.id === id) {
        this.links.unshift(item);
        if (item.parentId) {
          this.getBreadcrumb(item.parentId, false);
        }
      }
    })
  }

}
