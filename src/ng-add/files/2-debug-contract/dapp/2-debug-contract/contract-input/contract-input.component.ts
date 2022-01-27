import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IABI_OBJECT, IINPUT_EVENT } from 'angular-web3';


@Component({
  selector: 'contract-input',
  templateUrl: './contract-input.component.html',
  styleUrls: ['./contract-input.component.css'],
})
export class ContractInputComponent implements OnInit {
  abi_input!: IABI_OBJECT;
  input_form = new FormGroup({});
  labels:Array<any> = [];
  payable_input!: FormControl; 
  constructor(private cd: ChangeDetectorRef) {
 
  }

  @Output() newEventFunction = new EventEmitter<IINPUT_EVENT>();

  runMyFunction() {

    const myValue =this.abi_input.inputs.map(map=> this.input_form.controls[map.name].value)  
    
    const options:IINPUT_EVENT = {
      function: this.abi_input.name as string, 
      state: this.abi_input.stateMutability,
      outputs:this.abi_input.outputs,
      args: myValue,
    }

  

    if (this.abi_input.stateMutability == 'payable') {
    const weivalue = (this.payable_input.value * 1000000000000000000).toString();
     options.args.push( {value:weivalue})
    }

    this.newEventFunction.emit(options)
  }

  refreshUi(_labels:Array<any>) {
    if (_labels.constructor === Array){
      this.labels = _labels
    } else if (typeof(_labels)== 'object') {
      this.labels = [JSON.stringify(_labels)];
    } else {
      this.labels = [_labels]
    }
  
    this.cd.detectChanges();
  }

  initUi(_abi_input:any) {
    this.abi_input = _abi_input;
    this.abi_input.inputs.forEach((input) => {
      const newControl = new FormControl('',Validators.required);
      this.input_form.addControl(input.name, newControl);
    });
    this.labels = this.abi_input.outputs.map(map=> map.name)

    if (this.abi_input.stateMutability == 'payable') {
      this.payable_input = new FormControl(0)
    }
    this.cd.detectChanges();
  }

  ngOnInit(): void {}
}
