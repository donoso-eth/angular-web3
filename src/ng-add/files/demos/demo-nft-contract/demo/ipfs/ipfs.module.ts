import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

import { NgJsonEditorModule } from 'ang-jsoneditor';
import { IpfsUploadComponent } from './ipfs-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IpfsDownloadComponent } from './ipfs-download.component';
import { IpfsService } from './ipfs-service';



@NgModule({
  declarations: [
    IpfsUploadComponent,
    IpfsDownloadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    NgJsonEditorModule,
  ],
  providers:[IpfsService],
  exports: [
    IpfsUploadComponent,
    IpfsDownloadComponent
  ]
})
export class IpfsModule { }
