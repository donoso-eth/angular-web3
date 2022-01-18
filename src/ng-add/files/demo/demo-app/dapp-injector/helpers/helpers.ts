import { ethers} from 'ethers'

export const  convertEtherToWei = (ether_value)=> {
  return (ether_value * 10 ** 18).toFixed(0);
}

export const  convertWeiToEther = (wei_value) => {
  return wei_value / 10 ** 18;
}

export const convertUSDtoEther = (usd_value,dollarExchange)=> {
  return usd_value / dollarExchange;
}

export const  convertEthertoUSD = (ether_value,dollarExchange) => {
  return ether_value * dollarExchange;
}

export const displayEther = (etherBalance)=> {
  return etherBalance.toString().substring(0, 6)
}

export const displayUsd = (usdBalance)=> {
  return usdBalance.toFixed(0, 2)
}

