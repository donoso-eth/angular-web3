import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'dapp-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnChanges{

  constructor() { }

  @Input() public isBusy:boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
        console.log(this.isBusy)
  }

}
