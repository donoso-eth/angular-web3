import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifierService } from './notifier.service';
import { MatIconModule } from '@angular/material/icon';
import { NotifierComponent } from './notifier/notifier.component';




@NgModule({
  declarations: [NotifierComponent],
  imports: [
    CommonModule,
    MatIconModule,
  ]
})
export class NotifierModule {
  static forRoot(): ModuleWithProviders<NotifierModule> {
    return {
      ngModule: NotifierModule,
      providers: [
        {provide: NotifierService}
      ]
    };
  }
 }
