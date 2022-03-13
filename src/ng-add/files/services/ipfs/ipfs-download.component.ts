import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { IpfsService } from './ipfs-service';
declare global {
  interface Window {
    IpfsHttpClient:any;
  }
}


@Component({

  selector: 'ipfs-download',
  template: `
    <p>
    <mat-form-field   style="margin-top: 10px;width: 100%;background: #d3d3d39e;" class="example-full-width" appearance="fill">
      <input [formControl]="ipfs_cid"   matInput placeholder="Your CID"  />
      </mat-form-field>
      <button  (click)="downloadJson()" style="margin-top: 40px;" mat-raised-button color="accent">Donwload from</button>

    </p>
    <pre style="text-align:left">{{ipfs_input.value}}</pre>
  `,
  styles: [`:host ::ng-deep json-editor,
  :host ::ng-deep json-editor .jsoneditor,
  :host ::ng-deep json-editor > div,
  :host ::ng-deep json-editor jsoneditor-outer {
    height: 375px;
  }`],
})
export class IpfsDownloadComponent implements OnInit {
  ipfs_cid: FormControl = new FormControl('Qmc9hvaC9EUK7efbCfJc2QESB9NxW84jbPiTvz1p6Lh91d');
  ipfs_input: FormControl = new FormControl();
  uploading = true;
  editorOptions: JsonEditorOptions;
  id!: string;
  version!: string;
  status!: string;
  constructor(public ipfsService:IpfsService) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = 'code'; // set all allowed modes
  }

  async downloadJson(){
    const ipfs = window.IpfsHttpClient.create({ host: "ipfs.infura.io", port: 5001, protocol: "https" })

    this.uploading = true;
    const result = await this.ipfsService.getFileJSON(this.ipfs_cid.value)
    console.log(result)
   
      this.ipfs_input.setValue( JSON.stringify(result, undefined, 4))
    
    this.uploading = false;
  }

  getData(json: any) {
    console.log(json);
    //this.myJson = json
  }



  ngOnInit(): void {

  }
}
