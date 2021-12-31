import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicsRoutingModule } from './basics-routing.module';
import { HomeComponent } from './home/home.component';
import { BasicsComponent } from './basics/basics.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs'
@NgModule({
  declarations: [
    HomeComponent,
    BasicsComponent
  ],
  imports: [
    CommonModule,
    BasicsRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule
  ],
  exports:[BasicsComponent]
})
export class BasicsModule { }
