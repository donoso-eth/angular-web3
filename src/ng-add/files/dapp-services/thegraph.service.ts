import { Injectable } from '@angular/core';
import { GRAPH_APIURL } from 'angular-web3';
import { createClient } from 'urql';
@Injectable({
  providedIn: 'root'
})
export class ThegraphService {

  constructor() { }

async querySubgraph(query:string){

    const client = createClient({
      url: GRAPH_APIURL,
    });

    const data = await client.query(query).toPromise();

    console.log(data)
    return data.data

  }
}
