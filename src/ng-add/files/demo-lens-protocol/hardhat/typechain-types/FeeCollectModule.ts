/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export type ProfilePublicationDataStruct = {
  amount: BigNumberish;
  recipient: string;
  currency: string;
  referralFee: BigNumberish;
};

export type ProfilePublicationDataStructOutput = [
  BigNumber,
  string,
  string,
  number
] & {
  amount: BigNumber;
  recipient: string;
  currency: string;
  referralFee: number;
};

export interface FeeCollectModuleInterface extends utils.Interface {
  functions: {
    "HUB()": FunctionFragment;
    "MODULE_GLOBALS()": FunctionFragment;
    "getPublicationData(uint256,uint256)": FunctionFragment;
    "initializePublicationCollectModule(uint256,uint256,bytes)": FunctionFragment;
    "processCollect(uint256,address,uint256,uint256,bytes)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "HUB", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "MODULE_GLOBALS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPublicationData",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initializePublicationCollectModule",
    values: [BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "processCollect",
    values: [BigNumberish, string, BigNumberish, BigNumberish, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "HUB", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "MODULE_GLOBALS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPublicationData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initializePublicationCollectModule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "processCollect",
    data: BytesLike
  ): Result;

  events: {};
}

export interface FeeCollectModule extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FeeCollectModuleInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    HUB(overrides?: CallOverrides): Promise<[string]>;

    MODULE_GLOBALS(overrides?: CallOverrides): Promise<[string]>;

    getPublicationData(
      profileId: BigNumberish,
      pubId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[ProfilePublicationDataStructOutput]>;

    initializePublicationCollectModule(
      profileId: BigNumberish,
      pubId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    processCollect(
      referrerProfileId: BigNumberish,
      collector: string,
      profileId: BigNumberish,
      pubId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  HUB(overrides?: CallOverrides): Promise<string>;

  MODULE_GLOBALS(overrides?: CallOverrides): Promise<string>;

  getPublicationData(
    profileId: BigNumberish,
    pubId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<ProfilePublicationDataStructOutput>;

  initializePublicationCollectModule(
    profileId: BigNumberish,
    pubId: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  processCollect(
    referrerProfileId: BigNumberish,
    collector: string,
    profileId: BigNumberish,
    pubId: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    HUB(overrides?: CallOverrides): Promise<string>;

    MODULE_GLOBALS(overrides?: CallOverrides): Promise<string>;

    getPublicationData(
      profileId: BigNumberish,
      pubId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<ProfilePublicationDataStructOutput>;

    initializePublicationCollectModule(
      profileId: BigNumberish,
      pubId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    processCollect(
      referrerProfileId: BigNumberish,
      collector: string,
      profileId: BigNumberish,
      pubId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    HUB(overrides?: CallOverrides): Promise<BigNumber>;

    MODULE_GLOBALS(overrides?: CallOverrides): Promise<BigNumber>;

    getPublicationData(
      profileId: BigNumberish,
      pubId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initializePublicationCollectModule(
      profileId: BigNumberish,
      pubId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    processCollect(
      referrerProfileId: BigNumberish,
      collector: string,
      profileId: BigNumberish,
      pubId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    HUB(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MODULE_GLOBALS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPublicationData(
      profileId: BigNumberish,
      pubId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initializePublicationCollectModule(
      profileId: BigNumberish,
      pubId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    processCollect(
      referrerProfileId: BigNumberish,
      collector: string,
      profileId: BigNumberish,
      pubId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
