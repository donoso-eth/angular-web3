import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'stream-display',
  templateUrl: './stream-display.component.html',
  styleUrls: ['./stream-display.component.scss']
})
export class StreamDisplayComponent implements OnChanges, OnDestroy {
  public destroyHooks: Subject<void> = new Subject();
  flowRate!: number;
  members = [];
  monthlyInflow!: number;
  balanceZeroDec!: string;
  twoDec!: string;
  fourDec!: string;
  constructor() { 
 
  }
  @Input() public stream!: { balance:number, streams:Array<number>}

  ngOnChanges(changes: SimpleChanges): void {
      

  }

  async getStreams() {



    this.flowRate = 0;
    for (const stream of this.stream.streams) {
      console.log(stream);
      this.flowRate = this.flowRate + +stream;
    }
    console.log(this.flowRate);
    this.monthlyInflow = +((this.flowRate * 30 * 24 * 60 * 60)/10**18).toFixed(2);;


    console.log(this.monthlyInflow)
    const source = interval(100);
    //output: 0,1,2,3,4,5....
    const subscribe = source
      .pipe(takeUntil(this.destroyHooks))
      .subscribe((val) => {
        this.prepareNumbers(+this.stream.balance + (val * this.flowRate) / 10);
      });
  }

  prepareNumbers(balance: number) {
    this.balanceZeroDec = (balance / 10 ** 18).toFixed(0);

    const niceTwo = (balance / 10 ** 18).toFixed(2);
    this.twoDec = niceTwo.substring(niceTwo.length - 2, niceTwo.length);

    const niceFour = (balance / 10 ** 18).toFixed(6);

    this.fourDec = niceFour.substring(niceFour.length - 4, niceFour.length);
  }

  ngOnDestroy(): void {
    this.destroyHooks.next();
    this.destroyHooks.complete();
  }
}
