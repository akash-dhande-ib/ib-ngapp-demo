import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private fileService: FileService
  ) { }

  ngOnInit(): void {
    // Reset Selected Item
    this.fileService.itemSelected.next(null);
  }
}
