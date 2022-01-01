import { Component, OnInit } from '@angular/core';

import * as ethers from 'ethers';
import { createProvider } from '../../../app/helpers/helpers';
import { NETWORKS } from '../../../app/constants';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.scss'],
})
export class BasicsComponent implements OnInit {
  constructor() {
    this.handleProviders();
  }

  async handleProviders() {
    const initialNetwork = NETWORKS.localhost; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)
    // 😬 Sorry for all the console logging
    const DEBUG = true;
    const NETWORKCHECK = true;
    const USE_BURNER_WALLET = true; // toggle burner wallet feature
    const USE_NETWORK_SELECTOR = false;
    const networkOptions = [initialNetwork.name, 'mainnet', 'rinkeby'];
    const selectedNetwork = networkOptions[0];
    const targetNetwork = NETWORKS[selectedNetwork];
    console.log(targetNetwork);
    // 🔭 block explorer URL
    const blockExplorer = targetNetwork.blockExplorer;
    console.log('hola')
    const localProvider = await createProvider([targetNetwork.rpcUrl]);
    console.log('hola')
    
    console.log(localProvider);
    if (DEBUG) console.log(`Using ${selectedNetwork} network`);

    // 🛰 providers
    if (DEBUG) console.log('📡 Connecting to Mainnet Ethereum');
  }

  ngOnInit(): void {}
}
