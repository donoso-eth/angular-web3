import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { pipe, filter, map } from 'rxjs';
import { Web3State } from './models';
import * as reducer from './reducer';

//export const selectState = (state: Web3State) => state;

export const selectWeb3State = createFeatureSelector<Web3State>(
  reducer.web3FeatureKey
);

//

const selectState  = createSelector(
  selectWeb3State,
  (state: Web3State) => state
);

const chainStatus = createSelector(
  selectWeb3State,
  (state: Web3State) => state.chainStatus
);

const selectChainReady = pipe(
  select(chainStatus),
  filter((val) => val == 'wallet-connected')
);


const pleaseDisconnect = pipe(
  select(chainStatus),
  filter((val) => val == 'disconnected')
);

const isNetworkBusy = createSelector(
  selectWeb3State,
  (state: Web3State) => state.isNetworkBusy
);


const selectSignerNetwork = createSelector(
  selectWeb3State,
  (state: Web3State) => state.signerNetwork
);


const selectWalletBalance= pipe(
  select(selectState),
  map(map=> map.walletBalance)
);

const selectDollarExchange= pipe(
  select(selectState),
  filter((val) => val.etherToDollar !== 0),
  map(map=> map.etherToDollar)
);

export const web3Selectors = {
  chainStatus,
  selectChainReady,
  pleaseDisconnect,
  isNetworkBusy,
  selectSignerNetwork,
  selectWalletBalance,
  selectDollarExchange
};
