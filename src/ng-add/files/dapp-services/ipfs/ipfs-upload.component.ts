import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { IpfsService } from './ipfs-service';
declare global {
  interface Window {
    IpfsHttpClient: any;
  }
}

@Component({
  selector: 'ipfs-upload',
  template: `
    <p>
      <json-editor
        [formControl]="ipfs_input"
        [options]="editorOptions"
      ></json-editor>
      <button
        (click)="uploadJson()"
        style="margin-top: 40px;"
        mat-raised-button
        color="accent"
      >
        Upload to IPFS
      </button>
      <mat-form-field
        style="margin-top: 10px;width: 100%;background: #d3d3d39e;"
        class="example-full-width"
        appearance="fill"
      >
        <input [formControl]="ipfs_cid" matInput placeholder="Your CID" />
      </mat-form-field>
    </p>
    <input  #imageInput class="image-input fileinput-new" type="file" accept="image/*"
      (change)="processFile(imageInput)">
      <img *ngIf="!!srcEncoded" src="{{srcEncoded}}">
  `,
  styles: [
    `
      :host ::ng-deep json-editor,
      :host ::ng-deep json-editor .jsoneditor,
      :host ::ng-deep json-editor > div,
      :host ::ng-deep json-editor jsoneditor-outer {
        height: 375px;
      }
    `,
  ],
})
export class IpfsUploadComponent implements AfterViewInit {
  ipfs_cid: FormControl = new FormControl('');
  ipfs_input: FormControl = new FormControl();
  srcEncoded!: string;
  myJson = {
    description: "It's actually a bison?",
    external_url: 'https://austingriffith.com/portfolio/paintings/',
    image: 'https://austingriffith.com/images/paintings/buffalo.jpg',
    name: 'Buffalo',
    attributes: [
      { trait_type: 'BackgroundColor', value: 'green' },
      { trait_type: 'Eyes', value: 'googly' },
    ],
  };
  uploading = true;
  editorOptions: JsonEditorOptions;
  id!: string;
  version!: string;
  status!: string;
  constructor(public ipfsService: IpfsService) {
    this.ipfs_input.setValue(this.myJson);
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = 'code'; // set all allowed modes
  }

  async uploadJson() {
    this.uploading = true;
    const result = await this.ipfsService.add(
      JSON.stringify(this.ipfs_input.value)
    );

    if (result && result.path) {
      this.ipfs_cid.setValue(result.path);
    }
    this.uploading = false;
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', async (event: any) => {
      const buf = Buffer.from(reader.result as ArrayBuffer)
      const result = await this.ipfsService.add(buf);
      console.log(result)
      console.log(`https://ipfs.io/ipfs/${result[0].hash}`)
      let img = new Image()
      img.src = event.target.result;
      img.onload = (el:any) => {

      let height;
      let width;

      const aspectRatio = el.target['width'] / el.target['height']
  

      if (aspectRatio > 1.33) {
        height= 240;
        width = 240 * aspectRatio
      } else {
        width=  320;
        height =  320 / aspectRatio;
      }


      const elem = document.createElement('canvas');//create a canvas


      elem.width = width
      elem.height = height

      //draw in canvas
      var ctx = elem.getContext('2d')!;
      ctx.drawImage(img, 0, 0, elem.width, elem.height);

      //get the base64-encoded Data URI from the resize image
      this.srcEncoded = ctx.canvas.toDataURL('image/png', 0);



     // this.selectedFile = new ImageSnippet(this.srcEncoded, file);




      this.srcEncoded = event.target.result;
    //  this.photoStatus = PHOTO_STATUS.SELECTED;
    //  this.sendPhoto({available: true, image:this.selectedFile.src});

      }
    });
    reader.readAsArrayBuffer(file);
  //  reader.readAsDataURL(file);
  }

  ngAfterViewInit(): void {
    this.ipfsService.init();
  }
}
