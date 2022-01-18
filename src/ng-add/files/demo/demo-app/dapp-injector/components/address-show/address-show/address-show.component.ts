import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { createIcon } from '@download/blockies';
import { IBALANCE } from '../../../models/models';

@Component({
  selector: 'address-show',
  templateUrl: './address-show.component.html',
  styleUrls: ['./address-show.component.css']
})
export class AddressShowComponent implements OnInit,AfterViewInit, OnChanges {
  blockiesOptions:any;

  constructor(private renderer:Renderer2) { }
  ngOnChanges(changes: SimpleChanges): void {
  }
  @ViewChild("wallet", {read: ElementRef}) private walletDiv: ElementRef;
  ngAfterViewInit(): void {
  const icon = createIcon(this.blockiesOptions);
  
  this.renderer.appendChild(this.walletDiv.nativeElement,icon);
  }

  @Input() address_to_show:string;
  @Input() balance:IBALANCE
  @Output() doFaucetEvent = new EventEmitter();
  @Output() openTransactionEvent = new EventEmitter();
  
  openTransaction(){
    this.openTransactionEvent.emit()
  }

  doFaucet(){
    this.doFaucetEvent.emit()
  }

  ngOnInit(): void {
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
  }




}
