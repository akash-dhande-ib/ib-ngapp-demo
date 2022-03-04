import { Component, HostListener, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'F7':
        event.preventDefault();
        this.onAddNew();
        break;
      case 'ArrowLeft':
        this.onPrev();
        break;
      case 'ArrowRight':
        this.onNext();
        break;
    }
  }
  public selectedSampleIndex = 0;
  public disableNextButton = false;
  public disablePreviousButton = true;
  samples: string[] = ['First Sample', 'Second', 'Third'];

  constructor() { }

  ngOnInit(): void {

  }

  onNext() {
    if (this.selectedSampleIndex < this.samples.length - 2) {
      this.selectedSampleIndex++;
      this.disablePreviousButton = false;
    }else{
      this.disableNextButton = true;
    }
  }

  onPrev() {
    if (this.selectedSampleIndex > 0) {
      this.selectedSampleIndex--;
      this.disableNextButton = false;
    }else{
      this.disablePreviousButton = true;
    }
  }

  ngOnChanges(changes: SimpleChange) {
    console.log('ngOnChanges', changes)
  }

  ngDoCheck() {
    console.log('Do Check')
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked')
  }

  onAddNew() {
    this.samples.push(`New Sample ${this.samples.length}`);
  }

}
