import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private fileService: FileService) { }

  ngOnInit(): void { }

  /**
   * Add Content Item
   */
  addContentItem() {
    this.fileService.addEditAction.next({
      show: true,
      type: 'copy'
    })
  }

  /**
   * Add Folder
   */
  addFolder() {
    this.fileService.addEditAction.next({
      show: true,
      type: 'folder'
    })
  }
}
