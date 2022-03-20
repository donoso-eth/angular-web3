/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  LimitedFeeCollectModule,
  LimitedFeeCollectModuleInterface,
} from "../LimitedFeeCollectModule";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "hub",
        type: "address",
      },
      {
        internalType: "address",
        name: "moduleGlobals",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "FollowInvalid",
    type: "error",
  },
  {
    inputs: [],
    name: "InitParamsInvalid",
    type: "error",
  },
  {
    inputs: [],
    name: "MintLimitExceeded",
    type: "error",
  },
  {
    inputs: [],
    name: "ModuleDataMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "NotHub",
    type: "error",
  },
  {
    inputs: [],
    name: "HUB",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MODULE_GLOBALS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pubId",
        type: "uint256",
      },
    ],
    name: "getPublicationData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "collectLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentCollects",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "address",
            name: "currency",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "referralFee",
            type: "uint16",
          },
        ],
        internalType: "struct ProfilePublicationData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pubId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "initializePublicationCollectModule",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "referrerProfileId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "collector",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pubId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "processCollect",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b506040516112ce3803806112ce83398101604081905261002f91610128565b81816001600160a01b038116610058576040516348be0eb360e01b815260040160405180910390fd5b6001600160a01b03811660808190526040514281527f4e84a529f4c627b5e787037d117873af1018768804cca3c7f0d47041fe2c89ed9060200160405180910390a2506001600160a01b0381166100c2576040516348be0eb360e01b815260040160405180910390fd5b6001600160a01b03811660a08190526040514281527ff1a1fa6b64aa95186f5a1285e76198d0da80d9c5a88062641d447f1d7c54e56c9060200160405180910390a250505061015b565b80516001600160a01b038116811461012357600080fd5b919050565b6000806040838503121561013b57600080fd5b6101448361010c565b91506101526020840161010c565b90509250929050565b60805160a05161111d6101b1600039600081816101b90152818161021d0152818161038c0152818161051a01528181610623015261090801526000818161017a0152818161048e0152610a3d015261111d6000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80633f5038921461005c57806388ffe85114610175578063a4c52b86146101b4578063c233f951146101db578063e49c3dda146101fb575b600080fd5b61011061006a366004610d61565b6040805160c081018252600080825260208201819052918101829052606081018290526080810182905260a08101919091525060009182526020828152604080842092845291815291819020815160c0810183528154815260018201549381019390935260028101549183019190915260038101546001600160a01b0390811660608401526004909101549081166080830152600160a01b900461ffff1660a082015290565b60405161016c91908151815260208083015190820152604080830151908201526060808301516001600160a01b03908116918301919091526080808401519091169082015260a09182015161ffff169181019190915260c00190565b60405180910390f35b61019c7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200161016c565b61019c7f000000000000000000000000000000000000000000000000000000000000000081565b6101ee6101e9366004610dcc565b610210565b60405161016c9190610e77565b61020e610209366004610ea2565b610381565b005b6060336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461025b576040516313bd2e8360e31b815260040160405180910390fd5b60008080808061026d87890189610f25565b94509450945094509450846000148061028c575061028a8361046c565b155b8061029e57506001600160a01b038216155b806102ae575061271061ffff8216115b806102ba575061271084105b156102d8576040516348be0eb360e01b815260040160405180910390fd5b60008a8152602081815260408083208c845282529182902087815560028101879055600481018054600390920180546001600160a01b0319166001600160a01b038881169190911790915587166001600160b01b031990921691909117600160a01b61ffff8616021790558151601f8a018290048202810182019092528882528990899081908401838280828437600092019190915250929d9c50505050505050505050505050565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146103ca576040516313bd2e8360e31b815260040160405180910390fd5b6103d48486610501565b600084815260208181526040808320868452909152902080546001909101541061041157604051635b21dfd360e11b815260040160405180910390fd5b600084815260208181526040808320868452909152812060010180549161043783610f9a565b91905055508386141561045657610451858585858561074d565b610464565b61046486868686868661081f565b505050505050565b6040516343b938c560e01b81526001600160a01b0382811660048301526000917f0000000000000000000000000000000000000000000000000000000000000000909116906343b938c590602401602060405180830381865afa1580156104d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104fb9190610fb5565b92915050565b604051633648f48360e21b8152600481018390526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063d923d20c90602401602060405180830381865afa158015610569573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061058d9190610fd7565b90506001600160a01b0381161561060a57604051635a30b51560e11b8152600481018490526001600160a01b0383811660248301526000604483015282169063b4616a2a9060640160006040518083038186803b1580156105ed57600080fd5b505afa158015610601573d6000803e3d6000fd5b50505050505050565b60405163a9ec656360e01b8152600481018490526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063a9ec656390602401602060405180830381865afa158015610672573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106969190610fd7565b90506001600160a01b0381166106bf57604051636992d36b60e11b815260040160405180910390fd5b6040516370a0823160e01b81526001600160a01b0384811660048301528216906370a0823190602401602060405180830381865afa158015610705573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107299190610ff4565b61074657604051636992d36b60e11b815260040160405180910390fd5b505b505050565b600084815260208181526040808320868452909152902060028101546004909101546001600160a01b0316610784848483856109e6565b60008061078f610a38565b60008a8152602081815260408083208c84529091528120600301549294509092506001600160a01b03909116906127106107cd61ffff85168861100d565b6107d7919061102c565b905060006107e5828861104e565b90506107fc6001600160a01b0387168d8584610ac4565b6108116001600160a01b0387168d8785610ac4565b505050505050505050505050565b600084815260208181526040808320868452909152902060028101546004909101546001600160a01b0316610856848483856109e6565b600086815260208181526040808320888452909152812060040154600160a01b900461ffff16908080610887610a38565b909350905061271061089d61ffff83168861100d565b6108a7919061102c565b9150600090506108b7828761104e565b9050831561098d5760006127106108ce868461100d565b6108d8919061102c565b90506108e4818361104e565b6040516331a9108f60e11b8152600481018f90529092506000906001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690636352211e90602401602060405180830381865afa15801561094f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109739190610fd7565b905061098a6001600160a01b0388168e8385610ac4565b50505b60008a8152602081815260408083208c84529091529020600301546001600160a01b03908116906109c29087168d8385610ac4565b6109d76001600160a01b0387168d8686610ac4565b50505050505050505050505050565b6000806109f585870187611065565b915091508281141580610a1a5750836001600160a01b0316826001600160a01b031614155b15610464576040516346308bd560e01b815260040160405180910390fd5b6000807f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166398f965d16040518163ffffffff1660e01b81526004016040805180830381865afa158015610a98573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610abc9190611091565b915091509091565b604080516001600160a01b038581166024830152848116604483015260648083018590528351808403909101815260849092018352602080830180516001600160e01b03166323b872dd60e01b17905283518085019094528084527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65649084015261074692879291600091610b5c918516908490610bde565b8051909150156107485780806020019051810190610b7a9190610fb5565b6107485760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084015b60405180910390fd5b6060610bed8484600085610bf7565b90505b9392505050565b606082471015610c585760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401610bd5565b6001600160a01b0385163b610caf5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610bd5565b600080866001600160a01b03168587604051610ccb91906110cb565b60006040518083038185875af1925050503d8060008114610d08576040519150601f19603f3d011682016040523d82523d6000602084013e610d0d565b606091505b5091509150610d1d828286610d28565b979650505050505050565b60608315610d37575081610bf0565b825115610d475782518084602001fd5b8160405162461bcd60e51b8152600401610bd59190610e77565b60008060408385031215610d7457600080fd5b50508035926020909101359150565b60008083601f840112610d9557600080fd5b50813567ffffffffffffffff811115610dad57600080fd5b602083019150836020828501011115610dc557600080fd5b9250929050565b60008060008060608587031215610de257600080fd5b8435935060208501359250604085013567ffffffffffffffff811115610e0757600080fd5b610e1387828801610d83565b95989497509550505050565b60005b83811015610e3a578181015183820152602001610e22565b838111156107465750506000910152565b60008151808452610e63816020860160208601610e1f565b601f01601f19169290920160200192915050565b602081526000610bf06020830184610e4b565b6001600160a01b0381168114610e9f57600080fd5b50565b60008060008060008060a08789031215610ebb57600080fd5b863595506020870135610ecd81610e8a565b94506040870135935060608701359250608087013567ffffffffffffffff811115610ef757600080fd5b610f0389828a01610d83565b979a9699509497509295939492505050565b61ffff81168114610e9f57600080fd5b600080600080600060a08688031215610f3d57600080fd5b85359450602086013593506040860135610f5681610e8a565b92506060860135610f6681610e8a565b91506080860135610f7681610f15565b809150509295509295909350565b634e487b7160e01b600052601160045260246000fd5b6000600019821415610fae57610fae610f84565b5060010190565b600060208284031215610fc757600080fd5b81518015158114610bf057600080fd5b600060208284031215610fe957600080fd5b8151610bf081610e8a565b60006020828403121561100657600080fd5b5051919050565b600081600019048311821515161561102757611027610f84565b500290565b60008261104957634e487b7160e01b600052601260045260246000fd5b500490565b60008282101561106057611060610f84565b500390565b6000806040838503121561107857600080fd5b823561108381610e8a565b946020939093013593505050565b600080604083850312156110a457600080fd5b82516110af81610e8a565b60208401519092506110c081610f15565b809150509250929050565b600082516110dd818460208701610e1f565b919091019291505056fea2646970667358221220194a0b99845e42d58bfca3b329014dd5db24bc965123141cd3d7ca907c13164964736f6c634300080a0033";

type LimitedFeeCollectModuleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LimitedFeeCollectModuleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LimitedFeeCollectModule__factory extends ContractFactory {
  constructor(...args: LimitedFeeCollectModuleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    hub: string,
    moduleGlobals: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<LimitedFeeCollectModule> {
    return super.deploy(
      hub,
      moduleGlobals,
      overrides || {}
    ) as Promise<LimitedFeeCollectModule>;
  }
  getDeployTransaction(
    hub: string,
    moduleGlobals: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(hub, moduleGlobals, overrides || {});
  }
  attach(address: string): LimitedFeeCollectModule {
    return super.attach(address) as LimitedFeeCollectModule;
  }
  connect(signer: Signer): LimitedFeeCollectModule__factory {
    return super.connect(signer) as LimitedFeeCollectModule__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LimitedFeeCollectModuleInterface {
    return new utils.Interface(_abi) as LimitedFeeCollectModuleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LimitedFeeCollectModule {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as LimitedFeeCollectModule;
  }
}
