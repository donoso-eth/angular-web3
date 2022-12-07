import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'dapp-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnChanges{

  constructor() { }

  @Input() public isBusy:boolean = true;
  @Input() public isBusyMessage:{ header:string, body:string}  = { header:'', body:''};

  ngOnChanges(changes: SimpleChanges): void {
       
  }

}
