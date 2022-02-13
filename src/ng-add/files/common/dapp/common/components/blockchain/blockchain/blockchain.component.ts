import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { BlockWithTransactions } from '../../../models/models';

@Component({
  selector: 'blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css'],
})
export class BlockchainComponent implements OnInit, OnChanges {
  show_more_blocks = false;
  display_blocks!: Array<{
    display: string;
    number: number;
    hash: string;
    transactions: Array<{ hash: string; display: string }>;
  }>;

  constructor() {}
  @Input() blocks: Array<BlockWithTransactions> = [];
  @Output() private addBlock: EventEmitter<number> = new EventEmitter();

  async addOneBlock() {
    this.addBlock.emit(this.blocks[this.blocks.length - 1].number - 1);
  }

  ngOnChanges() {
    if (
      this.blocks.length == 0 ||
      this.blocks[this.blocks.length - 1].number <= 1
    ) {
      this.show_more_blocks = false;
    } else {
      this.show_more_blocks = true;
    }

    this.display_blocks = [];
    for (const block of this.blocks) {
      const block_object:any = Object.assign({}, block);

      const hashes = [];
      const transactions = [];
      for (const transaction of block.transactions) {
        hashes.push(transaction.hash);
        transaction.data = transaction.data !== "0x" ?  transaction.data.substring(0,50) + '....' : transaction.data
        const newTransaction =  {
          hash: transaction.hash,
          display: JSON.stringify(transaction, undefined, 4),
        }
        transactions.push(newTransaction);
      }
      
      delete block_object.transactions;

      this.display_blocks.push({
        number: block.number,
        hash: block.hash,
        display: JSON.stringify(block_object, undefined, 4),
        transactions: transactions,
      });
    }


  }

  ngOnInit(): void {}
}
