export const CoreInternal = 
{
  "contractName": "CoreInternal",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "_factory",
          "type": "address"
        }
      ],
      "name": "validFactories",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_orderHash",
          "type": "bytes32"
        }
      ],
      "name": "orderCancels",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "setTokens",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "transferProxy",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_exchangeId",
          "type": "uint8"
        }
      ],
      "name": "exchanges",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "state",
      "outputs": [
        {
          "name": "transferProxy",
          "type": "address"
        },
        {
          "name": "vault",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_orderHash",
          "type": "bytes32"
        }
      ],
      "name": "orderFills",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "vault",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "factories",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_set",
          "type": "address"
        }
      ],
      "name": "validSets",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipRenounced",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_factory",
          "type": "address"
        }
      ],
      "name": "enableFactory",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_factory",
          "type": "address"
        }
      ],
      "name": "disableFactory",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_set",
          "type": "address"
        }
      ],
      "name": "disableSet",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405260008054600160a060020a03191633179055610aa0806100256000396000f3006080604052600436106100e55763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100ea5780631a1f2b3e1461011f5780631e912bd614610142578063559ed3391461016c5780636e667db3146101d1578063715018a61461020257806377274ff0146102175780638da5cb5b146102385780639f80ee881461024d578063a003e0691461026e578063c19d93fb14610289578063f2fde38b146102c4578063f7213db6146102e5578063fbfa77cf146102fd578063fe5b38e414610312578063fef3ee7314610327575b600080fd5b3480156100f657600080fd5b5061010b600160a060020a0360043516610348565b604080519115158252519081900360200190f35b34801561012b57600080fd5b50610140600160a060020a0360043516610366565b005b34801561014e57600080fd5b5061015a600435610449565b60408051918252519081900360200190f35b34801561017857600080fd5b5061018161045b565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101bd5781810151838201526020016101a5565b505050509050019250505060405180910390f35b3480156101dd57600080fd5b506101e66104c1565b60408051600160a060020a039092168252519081900360200190f35b34801561020e57600080fd5b506101406104d0565b34801561022357600080fd5b50610140600160a060020a036004351661053c565b34801561024457600080fd5b506101e6610619565b34801561025957600080fd5b50610140600160a060020a0360043516610628565b34801561027a57600080fd5b506101e660ff600435166106b2565b34801561029557600080fd5b5061029e6106d0565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b3480156102d057600080fd5b50610140600160a060020a03600435166106e6565b3480156102f157600080fd5b5061015a600435610709565b34801561030957600080fd5b506101e661071b565b34801561031e57600080fd5b5061018161072a565b34801561033357600080fd5b5061010b600160a060020a036004351661078d565b600160a060020a031660009081526004602052604090205460ff1690565b600054600160a060020a0316331461037d57600080fd5b600160a060020a03811660009081526004602052604090205460ff1615156103a457600080fd5b600160a060020a038116600090815260046020908152604091829020805460ff19169055600580548351818402810184019094528084526104319385939092919083018282801561041e57602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610400575b50505050506107ab90919063ffffffff16565b8051610445916005916020909101906109d1565b5050565b60009081526009602052604090205490565b606060016006018054806020026020016040519081016040528092919081815260200182805480156104b657602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610498575b505050505090505b90565b600254600160a060020a031690565b600054600160a060020a031633146104e757600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a0316331461055357600080fd5b600160a060020a03811660009081526006602052604090205460ff16151561057a57600080fd5b600160a060020a038116600090815260066020908152604091829020805460ff19169055600780548351818402810184019094528084526106059385939092919083018282801561041e57602002820191906000526020600020908154600160a060020a031681526001909101906020018083116104005750505050506107ab90919063ffffffff16565b8051610445916007916020909101906109d1565b600054600160a060020a031681565b600054600160a060020a0316331461063f57600080fd5b600160a060020a03166000818152600460205260408120805460ff191660019081179091556005805491820181559091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db001805473ffffffffffffffffffffffffffffffffffffffff19169091179055565b60ff16600090815260016020526040902054600160a060020a031690565b600254600354600160a060020a03918216911682565b600054600160a060020a031633146106fd57600080fd5b610706816107e1565b50565b60009081526008602052604090205490565b600354600160a060020a031690565b606060016004018054806020026020016040519081016040528092919081815260200182805480156104b657602002820191906000526020600020908154600160a060020a03168152600190910190602001808311610498575050505050905090565b600160a060020a031660009081526006602052604090205460ff1690565b606060008060606107bc868661085e565b925092508115156107cc57600080fd5b6107d686846108c5565b509695505050505050565b600160a060020a03811615156107f657600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b81516000908190815b818110156108b45784600160a060020a0316868281518110151561088757fe5b90602001906020020151600160a060020a031614156108ac57806001935093506108bc565b600101610867565b600093508392505b50509250929050565b60606000806060600086519250600183036040519080825280602002602001820160405280156108ff578160200160208202803883390190505b509150600090505b8581101561095457868181518110151561091d57fe5b90602001906020020151828281518110151561093557fe5b600160a060020a03909216602092830290910190910152600101610907565b50600185015b828110156109aa57868181518110151561097057fe5b90602001906020020151826001830381518110151561098b57fe5b600160a060020a0390921660209283029091019091015260010161095a565b8187878151811015156109b957fe5b90602001906020020151945094505050509250929050565b828054828255906000526020600020908101928215610a33579160200282015b82811115610a33578251825473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039091161782556020909201916001909101906109f1565b50610a3f929150610a43565b5090565b6104be91905b80821115610a3f57805473ffffffffffffffffffffffffffffffffffffffff19168155600101610a495600a165627a7a72305820b040f7daa38bc3e91242f8998bebb5350fb4738b691a09c7d5a2090c2a2f847f0029",
  "deployedBytecode": "0x6080604052600436106100e55763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100ea5780631a1f2b3e1461011f5780631e912bd614610142578063559ed3391461016c5780636e667db3146101d1578063715018a61461020257806377274ff0146102175780638da5cb5b146102385780639f80ee881461024d578063a003e0691461026e578063c19d93fb14610289578063f2fde38b146102c4578063f7213db6146102e5578063fbfa77cf146102fd578063fe5b38e414610312578063fef3ee7314610327575b600080fd5b3480156100f657600080fd5b5061010b600160a060020a0360043516610348565b604080519115158252519081900360200190f35b34801561012b57600080fd5b50610140600160a060020a0360043516610366565b005b34801561014e57600080fd5b5061015a600435610449565b60408051918252519081900360200190f35b34801561017857600080fd5b5061018161045b565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101bd5781810151838201526020016101a5565b505050509050019250505060405180910390f35b3480156101dd57600080fd5b506101e66104c1565b60408051600160a060020a039092168252519081900360200190f35b34801561020e57600080fd5b506101406104d0565b34801561022357600080fd5b50610140600160a060020a036004351661053c565b34801561024457600080fd5b506101e6610619565b34801561025957600080fd5b50610140600160a060020a0360043516610628565b34801561027a57600080fd5b506101e660ff600435166106b2565b34801561029557600080fd5b5061029e6106d0565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b3480156102d057600080fd5b50610140600160a060020a03600435166106e6565b3480156102f157600080fd5b5061015a600435610709565b34801561030957600080fd5b506101e661071b565b34801561031e57600080fd5b5061018161072a565b34801561033357600080fd5b5061010b600160a060020a036004351661078d565b600160a060020a031660009081526004602052604090205460ff1690565b600054600160a060020a0316331461037d57600080fd5b600160a060020a03811660009081526004602052604090205460ff1615156103a457600080fd5b600160a060020a038116600090815260046020908152604091829020805460ff19169055600580548351818402810184019094528084526104319385939092919083018282801561041e57602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610400575b50505050506107ab90919063ffffffff16565b8051610445916005916020909101906109d1565b5050565b60009081526009602052604090205490565b606060016006018054806020026020016040519081016040528092919081815260200182805480156104b657602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610498575b505050505090505b90565b600254600160a060020a031690565b600054600160a060020a031633146104e757600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a0316331461055357600080fd5b600160a060020a03811660009081526006602052604090205460ff16151561057a57600080fd5b600160a060020a038116600090815260066020908152604091829020805460ff19169055600780548351818402810184019094528084526106059385939092919083018282801561041e57602002820191906000526020600020908154600160a060020a031681526001909101906020018083116104005750505050506107ab90919063ffffffff16565b8051610445916007916020909101906109d1565b600054600160a060020a031681565b600054600160a060020a0316331461063f57600080fd5b600160a060020a03166000818152600460205260408120805460ff191660019081179091556005805491820181559091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db001805473ffffffffffffffffffffffffffffffffffffffff19169091179055565b60ff16600090815260016020526040902054600160a060020a031690565b600254600354600160a060020a03918216911682565b600054600160a060020a031633146106fd57600080fd5b610706816107e1565b50565b60009081526008602052604090205490565b600354600160a060020a031690565b606060016004018054806020026020016040519081016040528092919081815260200182805480156104b657602002820191906000526020600020908154600160a060020a03168152600190910190602001808311610498575050505050905090565b600160a060020a031660009081526006602052604090205460ff1690565b606060008060606107bc868661085e565b925092508115156107cc57600080fd5b6107d686846108c5565b509695505050505050565b600160a060020a03811615156107f657600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b81516000908190815b818110156108b45784600160a060020a0316868281518110151561088757fe5b90602001906020020151600160a060020a031614156108ac57806001935093506108bc565b600101610867565b600093508392505b50509250929050565b60606000806060600086519250600183036040519080825280602002602001820160405280156108ff578160200160208202803883390190505b509150600090505b8581101561095457868181518110151561091d57fe5b90602001906020020151828281518110151561093557fe5b600160a060020a03909216602092830290910190910152600101610907565b50600185015b828110156109aa57868181518110151561097057fe5b90602001906020020151826001830381518110151561098b57fe5b600160a060020a0390921660209283029091019091015260010161095a565b8187878151811015156109b957fe5b90602001906020020151945094505050509250929050565b828054828255906000526020600020908101928215610a33579160200282015b82811115610a33578251825473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039091161782556020909201916001909101906109f1565b50610a3f929150610a43565b5090565b6104be91905b80821115610a3f57805473ffffffffffffffffffffffffffffffffffffffff19168155600101610a495600a165627a7a72305820b040f7daa38bc3e91242f8998bebb5350fb4738b691a09c7d5a2090c2a2f847f0029",
  "sourceMap": "1009:1828:14:-;;;567:5:68;:18;;-1:-1:-1;;;;;;567:18:68;575:10;567:18;;;1009:1828:14;;;;;;",
  "deployedSourceMap": "1009:1828:14:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2803:164:26;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2803:164:26;-1:-1:-1;;;;;2803:164:26;;;;;;;;;;;;;;;;;;;;;;;1841:412:14;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1841:412:14;-1:-1:-1;;;;;1841:412:14;;;;;;;4385:167:26;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4385:167:26;;;;;;;;;;;;;;;;;;;;;3685:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3685:119:26;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;3685:119:26;;;;;;;;;;;;;;;;;2263:125;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2263:125:26;;;;;;;;-1:-1:-1;;;;;2263:125:26;;;;;;;;;;;;;;1001:111:68;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1001:111:68;;;;2454:381:14;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2454:381:14;-1:-1:-1;;;;;2454:381:14;;;;;238:20:68;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:68;;;;1359:273:14;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1359:273:14;-1:-1:-1;;;;;1359:273:14;;;;;1985:161:26;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1985:161:26;;;;;;;1710:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1710:18:26;;;;;;;;-1:-1:-1;;;;;1710:18:26;;;;;;;;;;;;;;;;;;;;;;;;1274:103:68;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1274:103:68;-1:-1:-1;;;;;1274:103:68;;;;;4011:163:26;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4011:163:26;;;;;2489:109;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2489:109:26;;;;3099:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3099:119:26;;;;3409:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3409:146:26;-1:-1:-1;;;;;3409:146:26;;;;;2803:164;-1:-1:-1;;;;;2930:30:26;2903:4;2930:30;;;:20;:30;;;;;;;;;2803:164::o;1841:412:14:-;719:5:68;;-1:-1:-1;;;;;719:5:68;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;1998:30:14;;;;;;:20;:30;;;;;;;;1990:39;;;;;;;;-1:-1:-1;;;;;2091:30:14;;2124:5;2091:30;;;:20;:30;;;;;;;;;:38;;-1:-1:-1;;2091:38:14;;;2214:15;:22;;;;;;;;;;;;;;;;;:32;;2112:8;;2214:22;;:15;:22;;;:15;:22;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;2214:22:14;;;;;;;;;;;;;;;;;;;;;;;:32;;;;:::i;:::-;2196:50;;;;:15;;:50;;;;;;:::i;:::-;;1841:412;:::o;4385:167:26:-;4485:7;4515:30;;;:18;:30;;;;;;;4385:167::o;3685:119::-;3750:9;3782:5;:15;;3775:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3775:22:26;;;;;;;;;;;;;;;;;;;;;;;3685:119;;:::o;2263:125::-;2362:19;;-1:-1:-1;;;;;2362:19:26;2263:125;:::o;1001:111:68:-;719:5;;-1:-1:-1;;;;;719:5:68;705:10;:19;697:28;;;;;;1077:5;;;1058:25;;-1:-1:-1;;;;;1077:5:68;;;;1058:25;;;1105:1;1089:18;;-1:-1:-1;;1089:18:68;;;1001:111::o;2454:381:14:-;719:5:68;;-1:-1:-1;;;;;719:5:68;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;2616:21:14;;;;;;:15;:21;;;;;;;;2608:30;;;;;;;;-1:-1:-1;;;;;2694:21:14;;2718:5;2694:21;;;:15;:21;;;;;;;;;:29;;-1:-1:-1;;2694:29:14;;;2800:15;:22;;;;;;;;;;;;;;;;;:28;;2710:4;;2800:22;;:15;:22;;;:15;:22;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;2800:22:14;;;;;;;;;;;;;;;;;;;;;;:28;;;;:::i;:::-;2782:46;;;;:15;;:46;;;;;;:::i;238:20:68:-;;;-1:-1:-1;;;;;238:20:68;;:::o;1359:273:14:-;719:5:68;;-1:-1:-1;;;;;719:5:68;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;1513:30:14;;;;;:20;:30;;;;;:37;;-1:-1:-1;;1513:37:14;1546:4;1513:37;;;;;;1595:15;27:10:-1;;23:18;;;45:23;;1595:30:14;;;;;;;-1:-1:-1;;1595:30:14;;;;;;1359:273::o;1985:161:26:-;2111:28;;2081:7;2111:28;;;:5;:28;;;;;;-1:-1:-1;;;;;2111:28:26;;1985:161::o;1710:18::-;;;;;-1:-1:-1;;;;;1710:18:26;;;;;;:::o;1274:103:68:-;719:5;;-1:-1:-1;;;;;719:5:68;705:10;:19;697:28;;;;;;1343:29;1362:9;1343:18;:29::i;:::-;1274:103;:::o;4011:163:26:-;4109:7;4139:28;;;:16;:28;;;;;;;4011:163::o;2489:109::-;2580:11;;-1:-1:-1;;;;;2580:11:26;2489:109;:::o;3099:119::-;3164:9;3196:5;:15;;3189:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3189:22:26;;;;;;;;;;;;;;;;;;;;;;3099:119;:::o;3409:146::-;-1:-1:-1;;;;;3527:21:26;3500:4;3527:21;;;:15;:21;;;;;;;;;3409:146::o;6618:270:48:-;6700:9;6727:13;6742:9;6823:19;6755:13;6763:1;6766;6755:7;:13::i;:::-;6726:42;;;;6779:4;6778:5;6774:110;;;6793:8;;;6774:110;6847:13;6851:1;6854:5;6847:3;:13::i;:::-;-1:-1:-1;6822:38:48;6618:270;-1:-1:-1;;;;;;6618:270:48:o;1512:171:68:-;-1:-1:-1;;;;;1582:23:68;;;;1574:32;;;;;;1638:5;;;1617:38;;-1:-1:-1;;;;;1617:38:68;;;;1638:5;;;1617:38;;;1661:5;:17;;-1:-1:-1;;1661:17:68;-1:-1:-1;;;;;1661:17:68;;;;;;;;;;1512:171::o;293:251:48:-;402:8;;364:7;;;;;416:101;440:6;436:1;:10;416:101;;;473:1;-1:-1:-1;;;;;465:9:48;:1;467;465:4;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;465:9:48;;461:50;;;494:1;497:4;486:16;;;;;;461:50;448:3;;416:101;;;530:1;;-1:-1:-1;530:1:48;;-1:-1:-1;293:251:48;;;;;;;;:::o;6158:409::-;6241:9;6259:7;6276:14;6307:29;6375:9;6293:1;:8;6276:25;;6362:1;6353:6;:10;6339:25;;;;;;;;;;;;;;;;;;;;;;29:2:-1;21:6;17:15;117:4;105:10;97:6;88:34;136:17;;-1:-1;6339:25:48;;6307:57;;6387:1;6375:13;;6370:73;6394:5;6390:1;:9;6370:73;;;6432:1;6434;6432:4;;;;;;;;;;;;;;;;;;6414:12;6427:1;6414:15;;;;;;;;;;-1:-1:-1;;;;;6414:22:48;;;:15;;;;;;;;;;:22;6401:3;;6370:73;;;-1:-1:-1;6465:1:48;6457:9;;6448:78;6472:6;6468:1;:10;6448:78;;;6515:1;6517;6515:4;;;;;;;;;;;;;;;;;;6493:12;6510:1;6506;:5;6493:19;;;;;;;;;;-1:-1:-1;;;;;6493:26:48;;;:19;;;;;;;;;;:26;6480:3;;6448:78;;;6539:12;6553:1;6555:5;6553:8;;;;;;;;;;;;;;;;;;6531:31;;;;6158:409;;;;;;;;:::o;1009:1828:14:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;1009:1828:14;-1:-1:-1;;;;;1009:1828:14;;;;;;;;;;;-1:-1:-1;1009:1828:14;;;;;;;-1:-1:-1;1009:1828:14;;;-1:-1:-1;1009:1828:14;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;1009:1828:14;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { Ownable } from \"zeppelin-solidity/contracts/ownership/Ownable.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\nimport { AddressArrayUtils } from \"../../external/cryptofin/AddressArrayUtils.sol\";\n\n\n/**\n * @title Core Internal\n * @author Set Protocol\n *\n * The CoreInternal contract contains methods to alter state of variables that track\n * Core dependency addresses.\n */\ncontract CoreInternal is\n    Ownable,\n    CoreState\n{\n    using AddressArrayUtils for address[];\n    /* ============ External Functions ============ */\n\n    /**\n     * Add a factory to the mapping of tracked factories. Can only be set by\n     * owner of Core.\n     *\n     * @param  _factory   The address of the SetTokenFactory to enable\n     */\n    function enableFactory(\n        address _factory\n    )\n        external\n        onlyOwner\n    {\n        // Mark as true in validFactories mapping\n        state.validFactories[_factory] = true;\n\n        // Add to factories array\n        state.factories.push(_factory);\n    }\n\n    /**\n     * Disable a factory in the mapping of tracked factories. Can only be disabled\n     * by owner of Core.\n     *\n     * @param  _factory   The address of the SetTokenFactory to disable\n     */\n    function disableFactory(\n        address _factory\n    )\n        external\n        onlyOwner\n    {\n        // Verify Factory is linked to Core\n        require(state.validFactories[_factory]);\n\n        // Mark as false in validFactories mapping\n        state.validFactories[_factory] = false;\n\n        // Find and remove factory from factories array\n        state.factories = state.factories.remove(_factory);\n    }\n\n    /**\n     * Disable a set token in the mapping of tracked set tokens. Can only\n     * be disables by owner of Core.\n     *\n     * @param  _set   The address of the SetToken to disable\n     */\n    function disableSet(\n        address _set\n    )\n        external\n        onlyOwner\n    {\n        // Verify Set was created by Core and is enabled\n        require(state.validSets[_set]);\n\n        // Mark as false in validSet mapping\n        state.validSets[_set] = false;\n\n        // Find and remove from setTokens array\n        state.setTokens = state.setTokens.remove(_set);\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
    "exportedSymbols": {
      "CoreInternal": [
        2611
      ]
    },
    "id": 2612,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2506,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:14"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 2508,
        "nodeType": "ImportDirective",
        "scope": 2612,
        "sourceUnit": 8841,
        "src": "622:76:14",
        "symbolAliases": [
          {
            "foreign": 2507,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 2510,
        "nodeType": "ImportDirective",
        "scope": 2612,
        "sourceUnit": 4525,
        "src": "699:49:14",
        "symbolAliases": [
          {
            "foreign": 2509,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/cryptofin/AddressArrayUtils.sol",
        "file": "../../external/cryptofin/AddressArrayUtils.sol",
        "id": 2512,
        "nodeType": "ImportDirective",
        "scope": 2612,
        "sourceUnit": 6715,
        "src": "749:83:14",
        "symbolAliases": [
          {
            "foreign": 2511,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 2513,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 8840,
              "src": "1038:7:14",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$8840",
                "typeString": "contract Ownable"
              }
            },
            "id": 2514,
            "nodeType": "InheritanceSpecifier",
            "src": "1038:7:14"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 2515,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4524,
              "src": "1051:9:14",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$4524",
                "typeString": "contract CoreState"
              }
            },
            "id": 2516,
            "nodeType": "InheritanceSpecifier",
            "src": "1051:9:14"
          }
        ],
        "contractDependencies": [
          4524,
          8840
        ],
        "contractKind": "contract",
        "documentation": "@title Core Internal\n@author Set Protocol\n * The CoreInternal contract contains methods to alter state of variables that track\nCore dependency addresses.",
        "fullyImplemented": true,
        "id": 2611,
        "linearizedBaseContracts": [
          2611,
          4524,
          8840
        ],
        "name": "CoreInternal",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 2520,
            "libraryName": {
              "contractScope": null,
              "id": 2517,
              "name": "AddressArrayUtils",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6714,
              "src": "1073:17:14",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_AddressArrayUtils_$6714",
                "typeString": "library AddressArrayUtils"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1067:38:14",
            "typeName": {
              "baseType": {
                "id": 2518,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1095:7:14",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "id": 2519,
              "length": null,
              "nodeType": "ArrayTypeName",
              "src": "1095:9:14",
              "typeDescriptions": {
                "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                "typeString": "address[]"
              }
            }
          },
          {
            "body": {
              "id": 2543,
              "nodeType": "Block",
              "src": "1453:179:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2533,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2527,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4420,
                          "src": "1513:5:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$4418_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 2530,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4399,
                        "src": "1513:20:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 2531,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 2529,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2522,
                        "src": "1534:8:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "1513:30:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "74727565",
                      "id": 2532,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1546:4:14",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "1513:37:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 2534,
                  "nodeType": "ExpressionStatement",
                  "src": "1513:37:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2540,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2522,
                        "src": "1616:8:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2535,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4420,
                          "src": "1595:5:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$4418_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 2538,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4402,
                        "src": "1595:15:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 2539,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "1595:20:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 2541,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1595:30:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 2542,
                  "nodeType": "ExpressionStatement",
                  "src": "1595:30:14"
                }
              ]
            },
            "documentation": "Add a factory to the mapping of tracked factories. Can only be set by\nowner of Core.\n     * @param  _factory   The address of the SetTokenFactory to enable",
            "id": 2544,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 2525,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 2524,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 8788,
                  "src": "1439:9:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1439:9:14"
              }
            ],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2523,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2522,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 2544,
                  "src": "1391:16:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2521,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1391:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1381:32:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2526,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1453:0:14"
            },
            "scope": 2611,
            "src": "1359:273:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2576,
              "nodeType": "Block",
              "src": "1936:317:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2552,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4420,
                            "src": "1998:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$4418_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2553,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validFactories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4399,
                          "src": "1998:20:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 2555,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 2554,
                          "name": "_factory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2546,
                          "src": "2019:8:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "1998:30:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 2551,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        9310,
                        9311
                      ],
                      "referencedDeclaration": 9310,
                      "src": "1990:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 2556,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1990:39:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2557,
                  "nodeType": "ExpressionStatement",
                  "src": "1990:39:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2564,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2558,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4420,
                          "src": "2091:5:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$4418_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 2561,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4399,
                        "src": "2091:20:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 2562,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 2560,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2546,
                        "src": "2112:8:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "2091:30:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "66616c7365",
                      "id": 2563,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2124:5:14",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2091:38:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 2565,
                  "nodeType": "ExpressionStatement",
                  "src": "2091:38:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2574,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2566,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4420,
                        "src": "2196:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$4418_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2568,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "factories",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4402,
                      "src": "2196:15:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_storage",
                        "typeString": "address[] storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 2572,
                          "name": "_factory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2546,
                          "src": "2237:8:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        ],
                        "expression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2569,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4420,
                            "src": "2214:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$4418_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2570,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "factories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4402,
                          "src": "2214:15:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$dyn_storage",
                            "typeString": "address[] storage ref"
                          }
                        },
                        "id": 2571,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "remove",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6408,
                        "src": "2214:22:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$dyn_memory_ptr_$_t_address_$returns$_t_array$_t_address_$dyn_memory_ptr_$bound_to$_t_array$_t_address_$dyn_memory_ptr_$",
                          "typeString": "function (address[] memory,address) pure returns (address[] memory)"
                        }
                      },
                      "id": 2573,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2214:32:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                        "typeString": "address[] memory"
                      }
                    },
                    "src": "2196:50:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "id": 2575,
                  "nodeType": "ExpressionStatement",
                  "src": "2196:50:14"
                }
              ]
            },
            "documentation": "Disable a factory in the mapping of tracked factories. Can only be disabled\nby owner of Core.\n     * @param  _factory   The address of the SetTokenFactory to disable",
            "id": 2577,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 2549,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 2548,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 8788,
                  "src": "1922:9:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1922:9:14"
              }
            ],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2547,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2546,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 2577,
                  "src": "1874:16:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2545,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1874:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1864:32:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2550,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1936:0:14"
            },
            "scope": 2611,
            "src": "1841:412:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2609,
              "nodeType": "Block",
              "src": "2541:294:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2585,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4420,
                            "src": "2616:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$4418_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2586,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validSets",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4406,
                          "src": "2616:15:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 2588,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 2587,
                          "name": "_set",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2579,
                          "src": "2632:4:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "2616:21:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 2584,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        9310,
                        9311
                      ],
                      "referencedDeclaration": 9310,
                      "src": "2608:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 2589,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2608:30:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2590,
                  "nodeType": "ExpressionStatement",
                  "src": "2608:30:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2597,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2591,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4420,
                          "src": "2694:5:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$4418_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 2594,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4406,
                        "src": "2694:15:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 2595,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 2593,
                        "name": "_set",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2579,
                        "src": "2710:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "2694:21:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "66616c7365",
                      "id": 2596,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2718:5:14",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2694:29:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 2598,
                  "nodeType": "ExpressionStatement",
                  "src": "2694:29:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2607,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2599,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4420,
                        "src": "2782:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$4418_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2601,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "setTokens",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4409,
                      "src": "2782:15:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_storage",
                        "typeString": "address[] storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 2605,
                          "name": "_set",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2579,
                          "src": "2823:4:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        ],
                        "expression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2602,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4420,
                            "src": "2800:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$4418_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2603,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "setTokens",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4409,
                          "src": "2800:15:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$dyn_storage",
                            "typeString": "address[] storage ref"
                          }
                        },
                        "id": 2604,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "remove",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6408,
                        "src": "2800:22:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$dyn_memory_ptr_$_t_address_$returns$_t_array$_t_address_$dyn_memory_ptr_$bound_to$_t_array$_t_address_$dyn_memory_ptr_$",
                          "typeString": "function (address[] memory,address) pure returns (address[] memory)"
                        }
                      },
                      "id": 2606,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2800:28:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                        "typeString": "address[] memory"
                      }
                    },
                    "src": "2782:46:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "id": 2608,
                  "nodeType": "ExpressionStatement",
                  "src": "2782:46:14"
                }
              ]
            },
            "documentation": "Disable a set token in the mapping of tracked set tokens. Can only\nbe disables by owner of Core.\n     * @param  _set   The address of the SetToken to disable",
            "id": 2610,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 2582,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 2581,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 8788,
                  "src": "2527:9:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2527:9:14"
              }
            ],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2580,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2579,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 2610,
                  "src": "2483:12:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2578,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2483:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2473:28:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2583,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2541:0:14"
            },
            "scope": 2611,
            "src": "2454:381:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2612,
        "src": "1009:1828:14"
      }
    ],
    "src": "597:2241:14"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
    "exportedSymbols": {
      "CoreInternal": [
        2611
      ]
    },
    "id": 2612,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2506,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:14"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 2508,
        "nodeType": "ImportDirective",
        "scope": 2612,
        "sourceUnit": 8841,
        "src": "622:76:14",
        "symbolAliases": [
          {
            "foreign": 2507,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 2510,
        "nodeType": "ImportDirective",
        "scope": 2612,
        "sourceUnit": 4525,
        "src": "699:49:14",
        "symbolAliases": [
          {
            "foreign": 2509,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/cryptofin/AddressArrayUtils.sol",
        "file": "../../external/cryptofin/AddressArrayUtils.sol",
        "id": 2512,
        "nodeType": "ImportDirective",
        "scope": 2612,
        "sourceUnit": 6715,
        "src": "749:83:14",
        "symbolAliases": [
          {
            "foreign": 2511,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 2513,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 8840,
              "src": "1038:7:14",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$8840",
                "typeString": "contract Ownable"
              }
            },
            "id": 2514,
            "nodeType": "InheritanceSpecifier",
            "src": "1038:7:14"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 2515,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4524,
              "src": "1051:9:14",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$4524",
                "typeString": "contract CoreState"
              }
            },
            "id": 2516,
            "nodeType": "InheritanceSpecifier",
            "src": "1051:9:14"
          }
        ],
        "contractDependencies": [
          4524,
          8840
        ],
        "contractKind": "contract",
        "documentation": "@title Core Internal\n@author Set Protocol\n * The CoreInternal contract contains methods to alter state of variables that track\nCore dependency addresses.",
        "fullyImplemented": true,
        "id": 2611,
        "linearizedBaseContracts": [
          2611,
          4524,
          8840
        ],
        "name": "CoreInternal",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 2520,
            "libraryName": {
              "contractScope": null,
              "id": 2517,
              "name": "AddressArrayUtils",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6714,
              "src": "1073:17:14",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_AddressArrayUtils_$6714",
                "typeString": "library AddressArrayUtils"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1067:38:14",
            "typeName": {
              "baseType": {
                "id": 2518,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1095:7:14",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "id": 2519,
              "length": null,
              "nodeType": "ArrayTypeName",
              "src": "1095:9:14",
              "typeDescriptions": {
                "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                "typeString": "address[]"
              }
            }
          },
          {
            "body": {
              "id": 2543,
              "nodeType": "Block",
              "src": "1453:179:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2533,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2527,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4420,
                          "src": "1513:5:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$4418_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 2530,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4399,
                        "src": "1513:20:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 2531,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 2529,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2522,
                        "src": "1534:8:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "1513:30:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "74727565",
                      "id": 2532,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1546:4:14",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "1513:37:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 2534,
                  "nodeType": "ExpressionStatement",
                  "src": "1513:37:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2540,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2522,
                        "src": "1616:8:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2535,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4420,
                          "src": "1595:5:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$4418_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 2538,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4402,
                        "src": "1595:15:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 2539,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "1595:20:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 2541,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1595:30:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 2542,
                  "nodeType": "ExpressionStatement",
                  "src": "1595:30:14"
                }
              ]
            },
            "documentation": "Add a factory to the mapping of tracked factories. Can only be set by\nowner of Core.\n     * @param  _factory   The address of the SetTokenFactory to enable",
            "id": 2544,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 2525,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 2524,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 8788,
                  "src": "1439:9:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1439:9:14"
              }
            ],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2523,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2522,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 2544,
                  "src": "1391:16:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2521,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1391:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1381:32:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2526,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1453:0:14"
            },
            "scope": 2611,
            "src": "1359:273:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2576,
              "nodeType": "Block",
              "src": "1936:317:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2552,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4420,
                            "src": "1998:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$4418_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2553,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validFactories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4399,
                          "src": "1998:20:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 2555,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 2554,
                          "name": "_factory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2546,
                          "src": "2019:8:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "1998:30:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 2551,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        9310,
                        9311
                      ],
                      "referencedDeclaration": 9310,
                      "src": "1990:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 2556,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1990:39:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2557,
                  "nodeType": "ExpressionStatement",
                  "src": "1990:39:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2564,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2558,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4420,
                          "src": "2091:5:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$4418_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 2561,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4399,
                        "src": "2091:20:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 2562,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 2560,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2546,
                        "src": "2112:8:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "2091:30:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "66616c7365",
                      "id": 2563,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2124:5:14",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2091:38:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 2565,
                  "nodeType": "ExpressionStatement",
                  "src": "2091:38:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2574,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2566,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4420,
                        "src": "2196:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$4418_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2568,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "factories",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4402,
                      "src": "2196:15:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_storage",
                        "typeString": "address[] storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 2572,
                          "name": "_factory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2546,
                          "src": "2237:8:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        ],
                        "expression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2569,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4420,
                            "src": "2214:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$4418_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2570,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "factories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4402,
                          "src": "2214:15:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$dyn_storage",
                            "typeString": "address[] storage ref"
                          }
                        },
                        "id": 2571,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "remove",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6408,
                        "src": "2214:22:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$dyn_memory_ptr_$_t_address_$returns$_t_array$_t_address_$dyn_memory_ptr_$bound_to$_t_array$_t_address_$dyn_memory_ptr_$",
                          "typeString": "function (address[] memory,address) pure returns (address[] memory)"
                        }
                      },
                      "id": 2573,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2214:32:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                        "typeString": "address[] memory"
                      }
                    },
                    "src": "2196:50:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "id": 2575,
                  "nodeType": "ExpressionStatement",
                  "src": "2196:50:14"
                }
              ]
            },
            "documentation": "Disable a factory in the mapping of tracked factories. Can only be disabled\nby owner of Core.\n     * @param  _factory   The address of the SetTokenFactory to disable",
            "id": 2577,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 2549,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 2548,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 8788,
                  "src": "1922:9:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1922:9:14"
              }
            ],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2547,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2546,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 2577,
                  "src": "1874:16:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2545,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1874:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1864:32:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2550,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1936:0:14"
            },
            "scope": 2611,
            "src": "1841:412:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2609,
              "nodeType": "Block",
              "src": "2541:294:14",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2585,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4420,
                            "src": "2616:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$4418_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2586,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validSets",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4406,
                          "src": "2616:15:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 2588,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 2587,
                          "name": "_set",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2579,
                          "src": "2632:4:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "2616:21:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 2584,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        9310,
                        9311
                      ],
                      "referencedDeclaration": 9310,
                      "src": "2608:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 2589,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2608:30:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2590,
                  "nodeType": "ExpressionStatement",
                  "src": "2608:30:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2597,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2591,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4420,
                          "src": "2694:5:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$4418_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 2594,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4406,
                        "src": "2694:15:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 2595,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 2593,
                        "name": "_set",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2579,
                        "src": "2710:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "2694:21:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "66616c7365",
                      "id": 2596,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2718:5:14",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2694:29:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 2598,
                  "nodeType": "ExpressionStatement",
                  "src": "2694:29:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2607,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2599,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4420,
                        "src": "2782:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$4418_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 2601,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "setTokens",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4409,
                      "src": "2782:15:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_storage",
                        "typeString": "address[] storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 2605,
                          "name": "_set",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2579,
                          "src": "2823:4:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        ],
                        "expression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2602,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4420,
                            "src": "2800:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$4418_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2603,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "setTokens",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4409,
                          "src": "2800:15:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$dyn_storage",
                            "typeString": "address[] storage ref"
                          }
                        },
                        "id": 2604,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "remove",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6408,
                        "src": "2800:22:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$dyn_memory_ptr_$_t_address_$returns$_t_array$_t_address_$dyn_memory_ptr_$bound_to$_t_array$_t_address_$dyn_memory_ptr_$",
                          "typeString": "function (address[] memory,address) pure returns (address[] memory)"
                        }
                      },
                      "id": 2606,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2800:28:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                        "typeString": "address[] memory"
                      }
                    },
                    "src": "2782:46:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "id": 2608,
                  "nodeType": "ExpressionStatement",
                  "src": "2782:46:14"
                }
              ]
            },
            "documentation": "Disable a set token in the mapping of tracked set tokens. Can only\nbe disables by owner of Core.\n     * @param  _set   The address of the SetToken to disable",
            "id": 2610,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 2582,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 2581,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 8788,
                  "src": "2527:9:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2527:9:14"
              }
            ],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2580,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2579,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 2610,
                  "src": "2483:12:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2578,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2483:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2473:28:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2583,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2541:0:14"
            },
            "scope": 2611,
            "src": "2454:381:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2612,
        "src": "1009:1828:14"
      }
    ],
    "src": "597:2241:14"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.095Z"
}