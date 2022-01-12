import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ethers} from 'ethers'
import { Subscription } from 'rxjs';
import { DappInjectorService } from '../../../dapp-injector.service';
import { BlockWithTransactions } from '../../../shared/models';

@Component({
  selector: 'blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent implements OnInit, OnDestroy {
  blocks: Array<BlockWithTransactions> = [];
  blocksSubscription: Subscription;
  show_more_blocks = false;

  constructor(private dappInjectorService: DappInjectorService) { }

  ngOnDestroy(): void {
    this.blocksSubscription.unsubscribe();
  }

  addOneBlock(){
    this.dappInjectorService.getOneMoreBlock(this.blocks[this.blocks.length-1].number -1)
    
  }

  ngOnInit(): void {
    this.blocksSubscription = this.dappInjectorService.blocks.subscribe(blocks=> { 
      this.blocks = blocks
  
      if (this.blocks[this.blocks.length-1].number >1){
        this.show_more_blocks = true;
      } else {
        this.show_more_blocks = false;
      }
    })
  }

}
