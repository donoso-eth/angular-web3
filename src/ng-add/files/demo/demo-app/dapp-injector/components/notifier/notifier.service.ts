import { AfterViewInit, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from './notifier/notifier.component';

export interface INOTIF {
  function: (args) => any;
  args: any;
  state: 'view' | 'pure' | 'payable' | 'nonpayable';
}

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  constructor(private _snackBar: MatSnackBar) {}


  async showNotification(notification_message){
    this._snackBar.openFromComponent(NotifierComponent, {
      data: notification_message,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: notification_message.class,
    });
  }


}
