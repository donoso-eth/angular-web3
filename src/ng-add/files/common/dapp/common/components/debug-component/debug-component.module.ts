import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractInputComponent } from './contract-input/contract-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugComponent } from './debug-component/debug.component';


@NgModule({
  declarations: [DebugComponent,
    ContractInputComponent,
 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
    exports: [DebugComponent
  ]
})
export class DebugComponentModule { }
