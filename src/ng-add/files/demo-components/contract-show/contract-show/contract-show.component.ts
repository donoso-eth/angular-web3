import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { web3Selectors } from '../../../store';
import { IBALANCE, ICONTRACT } from '../../../models/models';

@Component({
  selector: 'contract-show',
  templateUrl: './contract-show.component.html',
  styleUrls: ['./contract-show.component.css']
})
export class ContractShowComponent implements OnInit , OnChanges{
  network!: string;

  constructor(private store:Store) { }
  ngOnChanges(changes: SimpleChanges): void {
  
  }
  @Input() contract!:ICONTRACT
  @Input() balance!:IBALANCE
  ngOnInit(): void {
    this.store.select(web3Selectors.selectSignerNetwork).subscribe(network=> this.network = network )
  }

}
