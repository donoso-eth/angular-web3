import { Injectable } from '@angular/core';
import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { resultMemoize } from '@ngrx/store';
import { TransactionComponent } from './transaction/transaction.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog,private modalService: NgbModal) {}
  async openDialog() {
    const modalRef = this.modalService.open(TransactionComponent);
    // const dialogRef = this.dialog.open(TransactionComponent, {
    // //   width: '80%',
    // //   maxWidth: '400px',
    // //   data: {},
    // });

    const result =  await modalRef.closed.toPromise()

   // const result = await dialogRef.afterClosed().toPromise()
    return result
  }
}
