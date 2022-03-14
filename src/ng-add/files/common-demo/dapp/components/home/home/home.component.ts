import { Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import { Signer } from 'ethers';
import { NETWORK_STATUS, Web3State, web3Selectors } from '../../../store';
import { angular_web3, no_network } from './images';


@Component({
  selector: 'onchain-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  public no_network = no_network;
  public angular_web3 = angular_web3
  constructor(  ) { }
  ngOnChanges(): void {
  }

  @Input() public contractHeader!:any

  @Input() public blockchain_is_busy = false;

  @Input() public blockchain_status:NETWORK_STATUS = 'loading';
  
  @Input() public signer!:Signer;
  @Output() public doFaucetEvent = new EventEmitter();
  @Output() public openTransactionEvent = new EventEmitter();

  ngOnInit(): void {
   
  }

  
}
