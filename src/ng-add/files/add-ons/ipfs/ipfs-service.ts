import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';


declare global {
  interface Window {
    IpfsHttpClient: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  ipfs: any;
  loading = true;
  constructor(@Inject(DOCUMENT) private readonly document: any) {}

  // async getFileObervable(hash:string){
  //   let myObject = '';
  //   from(this.ipfs.cat(hash)).pipe(
  //     switchMap((buffer: Buffer) => {

  //     })
  //   )
  // }

  async getblobFile(hash: string): Promise<any> {
    const responseBufferChunks = [];
    for await (const file of this.ipfs.cat(hash)) {
      if (!file) continue;
      responseBufferChunks.push(file);
    }
    const responseBuffer = Buffer.concat(responseBufferChunks);
    return responseBuffer.toString();
  }

  async getFileJSON(hash: string): Promise<any> {
    const responseBufferChunks = [];
    for await (const file of this.ipfs.cat(hash)) {
      if (!file) continue;
      responseBufferChunks.push(file);
    }
    const responseBuffer = Buffer.concat(responseBufferChunks);
    return JSON.parse(responseBuffer.toString());
  }

  loadTagToPromise(options: {
    name: string;
    type: 'script' | 'link';
    args: Array<{ name: string; value: string }>;
  }) {
    if (document.getElementById(options.name) !== null) {
      return true;
    }
    const promiseTag = new Promise<void>((resolve, reject) => {
      let tag = this.document.createElement(options.type);
      try {
        for (const attribute of options.args) {
          tag[attribute.name] = attribute.value;
        }
        console.log(tag);
        tag.onload = () => {
          resolve();
        };
        this.document.body.appendChild(tag);
      } catch (error) {
        reject();
        console.log(error);
      }
    });
    return promiseTag;
  }

  async add(file: any) {
    return await this.ipfs.add(file);
  }
  async init() {
    if (this.loading == true) {
      await this.loadTagToPromise({
        name: 'jsoneditor_css',
        type: 'link',
        args: [
          { name: 'rel', value: 'stylesheet' },
          {
            name: 'href',
            value: 'https://unpkg.com/jsoneditor@9.6.0/dist/jsoneditor.min.css',
          },
        ],
      });
      console.log('doen');
      await this.loadTagToPromise({
        name: 'ipfs_client',
        type: 'script',
        args: [
          {
            name: 'src',
            value:
              'https://cdn.jsdelivr.net/npm/ipfs-http-client/dist/index.min.js',
          },
          { name: 'type', value: 'text/javascript' },
        ],
      });
      console.log('doen');
      this.ipfs = window.IpfsHttpClient.create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
      });
      this.loading = false;
    }
    
  }
}
