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

const isInitializing = createSelector(
  selectWeb3State,
  (state: Web3State) => state.initializing
);

const selectChainReady = pipe(
  select(isInitializing),
  filter((val) => val == false)
);

const isNetworkBusy = createSelector(
  selectWeb3State,
  (state: Web3State) => state.isNetworkBusy
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
  isInitializing,
  selectChainReady,
  isNetworkBusy,
  selectWalletBalance,
  selectDollarExchange
};
