import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IBALANCE, ICONTRACT } from '../../../models/models';

@Component({
  selector: 'contract-show',
  templateUrl: './contract-show.component.html',
  styleUrls: ['./contract-show.component.css']
})
export class ContractShowComponent implements OnInit , OnChanges{

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  
  }
  @Input() contract!:ICONTRACT
  @Input() balance!:IBALANCE
  ngOnInit(): void {
  }

}
