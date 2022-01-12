import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';

import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

const styles_snack = `.green-snackbar {
  background:rgb(150 241 184);
  color: white;
}
.green-snackbar button {
  background-color: rgb(65, 252, 134);
  color: white;
  border: none;
}
.red-snackbar {
  background: #f5948d;
  color: white;
}
.red-snackbar button {
  background-color: #F44336;
  color: white !important;
  border: none;
}`;

@Component({
  selector: 'transactor-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.css'],
})
export class NotifierComponent implements OnInit, AfterViewInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<NotifierComponent>
  ) {}
  ngAfterViewInit(): void {
    if (document.getElementById('snack_css') === null) {
      const style = document.createElement('style');
      document.getElementsByTagName('head')[0].appendChild(style);
      style.id = 'snack_css';
      const myCss = styles_snack.split('<br>').join('').split('\n').join('');
      style.innerText = myCss;
    }
  }

  ngOnInit(): void {}
}
