import { AfterViewInit, ChangeDetectorRef, Component, ElementRef,  EventEmitter,  Input,  Output,  Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { createIcon } from '@download/blockies';
import { Store } from '@ngrx/store';
import { convertWeiToEther, displayEther, displayUsd, Web3Actions, web3Selectors, Web3State } from 'angular-web3';
import { Signer } from 'ethers';
import {  firstValueFrom } from 'rxjs';
import { netWorkByName, NETWORK_TYPE } from 'src/app/dapp-injector/constants';



@Component({
  selector: 'wallet-display',
  templateUrl: './wallet-display.component.html',
  styleUrls: ['./wallet-display.component.css']
})
export class WalletDisplayComponent implements AfterViewInit {
  blockiesOptions:any;
  address_to_show!:string;
  balance!: { ether: any; usd: any; };
  dollarExhange!: number;
  network!: string;


  constructor(
    private cd: ChangeDetectorRef,
    private renderer:Renderer2, private store: Store<Web3State>) {

   }

   @Input()  public signer!: Signer;

   async convertWeitoDisplay(balance:any) {
    const ehterbalance = convertWeiToEther(balance);
    const dollar =
      ehterbalance * this.dollarExhange
    this.balance = {
      ether: displayEther(ehterbalance),
      usd: displayUsd(dollar),
    };
   }  


  @ViewChild("wallet", {read: ElementRef}) private walletDiv!: ElementRef;
  @Output() doFaucetEvent = new EventEmitter();
  @Output() openTransactionEvent = new EventEmitter();

  openTransaction(){
    this.openTransactionEvent.emit()
  }

  doFaucet(){
    this.doFaucetEvent.emit()
  }


  doDisconnect() {
    this.store.dispatch(Web3Actions.chainStatus({status: 'disconnected'}))
  }

  async doScan(){
    if (this.network == 'localhost') { 
      alert("No scan provider for localhost, please embed the blockchain component")
  
    } else {
      
      const href = netWorkByName(this.network as NETWORK_TYPE);
  
      if (href.blockExplorer) { 
        window.open(
          href.blockExplorer +`/address/${this.address_to_show}` ,
          '_blank' // <- This is what makes it open in a new window.
        );
      }
  
    }
  }


  ngAfterViewInit(): void {

    
    this.store.pipe(web3Selectors.hookContractConnected).subscribe(async (value) => {

      console.log(value)

      this.address_to_show = await this.signer.getAddress()
      const balance = await this.signer.getBalance();

      this.dollarExhange = await firstValueFrom(this.store.pipe(web3Selectors.selectDollarExchange));

      this.blockiesOptions = { // All options are optional
        seed: this.address_to_show, // seed used to generate icon data, default: random
        color: '#dfe', // to manually specify the icon color, default: random
        bgcolor: '#aaa', // choose a different background color, default: random
        size: 8, // width/height of the icon in blocks, default: 8
        scale: 3, // width/height of each block in pixels, default: 4
        spotcolor: '#000' // each pixel has a 13% chance of being of a third color,
        // default: random. Set to -1 to disable it. These "spots" create structures
        // that look like eyes, mouths and noses.
      }
     // await this.myWallet.refreshWalletBalance()
     this.convertWeitoDisplay(balance)
     
    });

    this.store.pipe(web3Selectors.selectWalletBalance).subscribe(balance=>   { 
      this.convertWeitoDisplay(balance)
      this.cd.detectChanges();})

    this.store.select(web3Selectors.selectSignerNetwork).subscribe(network=> this.network = network)

    const icon = createIcon(this.blockiesOptions);
    
    this.renderer.appendChild(this.walletDiv.nativeElement,icon);
    }
  





}
