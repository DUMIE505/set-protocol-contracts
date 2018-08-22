export const OrderLibrary = 
{
  "contractName": "OrderLibrary",
  "abi": [],
  "bytecode": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a165627a7a72305820013a512bd9b396c272b8e38267165aecf5b2ad37713775df5aa8c31eb4e62f170029",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a165627a7a72305820013a512bd9b396c272b8e38267165aecf5b2ad37713775df5aa8c31eb4e62f170029",
  "sourceMap": "856:6213:28:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "856:6213:28:-;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\n\n\n/**\n * @title OrderLibrary\n * @author Set Protocol\n *\n * The Order Library contains functions for checking validation and hashing of Issuance Orders.\n *\n */\n\nlibrary OrderLibrary {\n    using SafeMath for uint256;\n\n    /* ============ Structs ============ */\n\n    /**\n     * Struct containing all parameters for the issuance order\n     *\n     * @param  setAddress                   Set the maker wants to mint\n     * @param  makerAddress                 Address of maker of the Issuance Order\n     * @param  makerToken                   Address of token maker wants to exchange for filling issuance order\n     * @param  relayerAddress               Address of relayer\n     * @param  relayerToken                 Token relayer wants to be compensated in\n     * @param  quantity                     Amount of Sets maker is looking to mint\n     * @param  makerTokenAmount             Amount of makerToken to be used to fill the order\n     * @param  expiration                   Timestamp marking when the order expires\n     * @param  makerRelayerFee              Amount of relayer tokens maker must pay for execution\n     * @param  takerRelayerFee              Amount of relayer tokens taker must pay for execution\n     * @param  salt                         Random number used to create unique orderHash\n     * @param  requiredComponents           Components to be acquired by taker's exchange orders\n     * @param  requiredComponentAmounts     Amounts of each component to be acquired by exchange order\n     * @param  orderHash                    Unique order identifier used to log information about the order in the protocol\n     */\n    struct IssuanceOrder {\n        address setAddress;                 // _addresses[0]\n        address makerAddress;               // _addresses[1]\n        address makerToken;                 // _addresses[2]\n        address relayerAddress;             // _addresses[3]\n        address relayerToken;               // _addresses[4]\n        uint256 quantity;                   // _values[0]\n        uint256 makerTokenAmount;           // _values[1]\n        uint256 expiration;                 // _values[2]\n        uint256 makerRelayerFee;            // _values[3]\n        uint256 takerRelayerFee;            // _values[4]\n        uint256 salt;                       // _values[5]\n        address[] requiredComponents;       // _requiredComponents\n        uint256[] requiredComponentAmounts;    // _requiredComponentAmounts\n        bytes32 orderHash;\n    }\n\n    /* ============ Internal Functions ============ */\n\n    /**\n     * Create hash of order parameters\n     *\n     * @param  _addresses                   [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n     * @param  _values                      [quantity, makerTokenAmount, expiration, makerRelayerFee, takerRelayerFee, salt]\n     * @param  _requiredComponents          Components to be acquired by exchange order\n     * @param  _requiredComponentAmounts    Amounts of each component to be acquired by exchange order\n     */\n    function generateOrderHash(\n        address[5] _addresses,\n        uint256[6] _values,\n        address[] _requiredComponents,\n        uint256[] _requiredComponentAmounts\n    )\n        internal\n        pure\n        returns(bytes32)\n    {\n        // Hash the order parameters\n        return keccak256(\n            abi.encodePacked(\n                _addresses[0],              // setAddress\n                _addresses[1],              // makerAddress\n                _addresses[2],              // makerToken\n                _addresses[3],              // relayerAddress\n                _addresses[4],              // relayerToken\n                _values[0],                 // quantity\n                _values[1],                 // makerTokenAmount\n                _values[2],                 // expiration\n                _values[3],                 // makerRelayerFee\n                _values[4],                 // takerRelayerFee\n                _values[5],                 // salt\n                _requiredComponents,        // _requiredComponents\n                _requiredComponentAmounts   // _requiredComponentAmounts\n            )\n        );\n    }\n\n    /**\n     * Validate order signature\n     *\n     * @param  _orderHash       Hash of issuance order\n     * @param  _signerAddress   Address of Issuance Order signer\n     * @param  _v               v element of ECDSA signature\n     * @param  _r               r element of ECDSA signature\n     * @param  _s               s element of ECDSA signature\n     */\n    function validateSignature(\n        bytes32 _orderHash,\n        address _signerAddress,\n        uint8 _v,\n        bytes32 _r,\n        bytes32 _s\n    )\n        internal\n        pure\n        returns(bool)\n    {\n        // Public address returned by ecrecover function\n        address recAddress;\n\n        // Ethereum msg prefix\n        bytes memory msgPrefix = \"\\x19Ethereum Signed Message:\\n32\";\n\n        // Find what address signed the order\n        recAddress = ecrecover(\n            keccak256(abi.encodePacked(msgPrefix, _orderHash)),\n            _v,\n            _r,\n            _s\n        );\n\n        return recAddress == _signerAddress;\n    }\n\n    /**\n     * Checks for rounding errors and returns value of potential partial amounts of a principal\n     *\n     * @param  _principal       Number fractional amount is derived from\n     * @param  _numerator       Numerator of fraction\n     * @param  _denominator     Denominator of fraction\n     * @return uint256          Fractional amount of principal calculated\n     */\n    function getPartialAmount(\n        uint256 _principal,\n        uint256 _numerator,\n        uint256 _denominator\n    )\n        internal\n        returns (uint256)\n    {\n        // Get remainder of partial amount (if 0 not a partial amount)\n        uint256 remainder = mulmod(_principal, _numerator, _denominator);\n\n        // Return if not a partial amount\n        if (remainder == 0) {\n            return _principal.mul(_numerator).div(_denominator);\n        }\n\n        // Calculate error percentage\n        uint256 errPercentageTimes1000000 = remainder.mul(1000000).div(_numerator.mul(_principal));\n\n        // Require error percentage is less than 0.1%.\n        require(errPercentageTimes1000000 < 1000);\n        \n        return _principal.mul(_numerator).div(_denominator);\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
    "exportedSymbols": {
      "OrderLibrary": [
        4776
      ]
    },
    "id": 4777,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4576,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:28"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 4578,
        "nodeType": "ImportDirective",
        "scope": 4777,
        "sourceUnit": 8755,
        "src": "622:73:28",
        "symbolAliases": [
          {
            "foreign": 4577,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title OrderLibrary\n@author Set Protocol\n * The Order Library contains functions for checking validation and hashing of Issuance Orders.\n ",
        "fullyImplemented": true,
        "id": 4776,
        "linearizedBaseContracts": [
          4776
        ],
        "name": "OrderLibrary",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 4581,
            "libraryName": {
              "contractScope": null,
              "id": 4579,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 8754,
              "src": "889:8:28",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$8754",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "883:27:28",
            "typeName": {
              "id": 4580,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "902:7:28",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "canonicalName": "OrderLibrary.IssuanceOrder",
            "id": 4612,
            "members": [
              {
                "constant": false,
                "id": 4583,
                "name": "setAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2366:18:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4582,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2366:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4585,
                "name": "makerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2427:20:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4584,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2427:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4587,
                "name": "makerToken",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2488:18:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4586,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2488:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4589,
                "name": "relayerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2549:22:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4588,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2549:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4591,
                "name": "relayerToken",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2610:20:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4590,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2610:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4593,
                "name": "quantity",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2671:16:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4592,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2671:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4595,
                "name": "makerTokenAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2729:24:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4594,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2729:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4597,
                "name": "expiration",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2787:18:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4596,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2787:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4599,
                "name": "makerRelayerFee",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2845:23:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4598,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2845:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4601,
                "name": "takerRelayerFee",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2903:23:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4600,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2903:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4603,
                "name": "salt",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2961:12:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4602,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2961:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4606,
                "name": "requiredComponents",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "3019:28:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 4604,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3019:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 4605,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "3019:9:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                    "typeString": "address[]"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4609,
                "name": "requiredComponentAmounts",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "3086:34:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                  "typeString": "uint256[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 4607,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3086:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 4608,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "3086:9:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                    "typeString": "uint256[]"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4611,
                "name": "orderHash",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "3162:17:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes32",
                  "typeString": "bytes32"
                },
                "typeName": {
                  "id": 4610,
                  "name": "bytes32",
                  "nodeType": "ElementaryTypeName",
                  "src": "3162:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "IssuanceOrder",
            "nodeType": "StructDefinition",
            "scope": 4776,
            "src": "2335:851:28",
            "visibility": "public"
          },
          {
            "body": {
              "id": 4672,
              "nodeType": "Block",
              "src": "3974:919:28",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4634,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4616,
                              "src": "4085:10:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 4636,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 4635,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4096:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4085:13:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4637,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4616,
                              "src": "4143:10:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 4639,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 4638,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4154:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_1_by_1",
                                "typeString": "int_const 1"
                              },
                              "value": "1"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4143:13:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4640,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4616,
                              "src": "4203:10:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 4642,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "32",
                              "id": 4641,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4214:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_2_by_1",
                                "typeString": "int_const 2"
                              },
                              "value": "2"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4203:13:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4643,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4616,
                              "src": "4261:10:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 4645,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "33",
                              "id": 4644,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4272:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_3_by_1",
                                "typeString": "int_const 3"
                              },
                              "value": "3"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4261:13:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4646,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4616,
                              "src": "4323:10:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 4648,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "34",
                              "id": 4647,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4334:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_4_by_1",
                                "typeString": "int_const 4"
                              },
                              "value": "4"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4323:13:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4649,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4620,
                              "src": "4383:7:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 4651,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 4650,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4391:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4383:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4652,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4620,
                              "src": "4439:7:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 4654,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 4653,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4447:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_1_by_1",
                                "typeString": "int_const 1"
                              },
                              "value": "1"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4439:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4655,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4620,
                              "src": "4503:7:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 4657,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "32",
                              "id": 4656,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4511:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_2_by_1",
                                "typeString": "int_const 2"
                              },
                              "value": "2"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4503:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4658,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4620,
                              "src": "4561:7:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 4660,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "33",
                              "id": 4659,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4569:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_3_by_1",
                                "typeString": "int_const 3"
                              },
                              "value": "3"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4561:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4661,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4620,
                              "src": "4624:7:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 4663,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "34",
                              "id": 4662,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4632:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_4_by_1",
                                "typeString": "int_const 4"
                              },
                              "value": "4"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4624:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4664,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4620,
                              "src": "4687:7:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 4666,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "35",
                              "id": 4665,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4695:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_5_by_1",
                                "typeString": "int_const 5"
                              },
                              "value": "5"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4687:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 4667,
                            "name": "_requiredComponents",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4623,
                            "src": "4739:19:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 4668,
                            "name": "_requiredComponentAmounts",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4626,
                            "src": "4806:25:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            },
                            {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 4632,
                            "name": "abi",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 9294,
                            "src": "4051:3:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_abi",
                              "typeString": "abi"
                            }
                          },
                          "id": 4633,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "memberName": "encodePacked",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "4051:16:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                            "typeString": "function () pure returns (bytes memory)"
                          }
                        },
                        "id": 4669,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4051:825:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      ],
                      "id": 4631,
                      "name": "keccak256",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 9301,
                      "src": "4028:9:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                        "typeString": "function () pure returns (bytes32)"
                      }
                    },
                    "id": 4670,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4028:858:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 4630,
                  "id": 4671,
                  "nodeType": "Return",
                  "src": "4021:865:28"
                }
              ]
            },
            "documentation": "Create hash of order parameters\n     * @param  _addresses                   [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                      [quantity, makerTokenAmount, expiration, makerRelayerFee, takerRelayerFee, salt]\n@param  _requiredComponents          Components to be acquired by exchange order\n@param  _requiredComponentAmounts    Amounts of each component to be acquired by exchange order",
            "id": 4673,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "generateOrderHash",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4627,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4616,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 4673,
                  "src": "3775:21:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4613,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3775:7:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4615,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 4614,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3783:1:28",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "3775:10:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$5_storage_ptr",
                      "typeString": "address[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4620,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 4673,
                  "src": "3806:18:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                    "typeString": "uint256[6]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4617,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3806:7:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4619,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "36",
                      "id": 4618,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3814:1:28",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "6"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "3806:10:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$6_storage_ptr",
                      "typeString": "uint256[6]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4623,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 4673,
                  "src": "3834:29:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4621,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3834:7:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4622,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3834:9:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4626,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4673,
                  "src": "3873:35:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4624,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3873:7:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4625,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3873:9:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3765:149:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4630,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4629,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4673,
                  "src": "3961:7:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4628,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "3961:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3960:9:28"
            },
            "scope": 4776,
            "src": "3739:1154:28",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4714,
              "nodeType": "Block",
              "src": "5464:440:28",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 4689,
                      "name": "recAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 4715,
                      "src": "5531:18:28",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 4688,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "5531:7:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 4690,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5531:18:28"
                },
                {
                  "assignments": [
                    4692
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 4692,
                      "name": "msgPrefix",
                      "nodeType": "VariableDeclaration",
                      "scope": 4715,
                      "src": "5591:22:28",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 4691,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "5591:5:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 4694,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "19457468657265756d205369676e6564204d6573736167653a0a3332",
                    "id": 4693,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "string",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "5616:34:28",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_stringliteral_178a2411ab6fbc1ba11064408972259c558d0e82fd48b0aba3ad81d14f065e73",
                      "typeString": "literal_string \"\u0019Ethereum Signed Message:\n32\""
                    },
                    "value": "\u0019Ethereum Signed Message:\n32"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5591:59:28"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4708,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 4695,
                      "name": "recAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4689,
                      "src": "5707:10:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "id": 4700,
                                  "name": "msgPrefix",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 4692,
                                  "src": "5770:9:28",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bytes_memory_ptr",
                                    "typeString": "bytes memory"
                                  }
                                },
                                {
                                  "argumentTypes": null,
                                  "id": 4701,
                                  "name": "_orderHash",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 4675,
                                  "src": "5781:10:28",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bytes32",
                                    "typeString": "bytes32"
                                  }
                                }
                              ],
                              "expression": {
                                "argumentTypes": [
                                  {
                                    "typeIdentifier": "t_bytes_memory_ptr",
                                    "typeString": "bytes memory"
                                  },
                                  {
                                    "typeIdentifier": "t_bytes32",
                                    "typeString": "bytes32"
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 4698,
                                  "name": "abi",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 9294,
                                  "src": "5753:3:28",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_magic_abi",
                                    "typeString": "abi"
                                  }
                                },
                                "id": 4699,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "lValueRequested": false,
                                "memberName": "encodePacked",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": null,
                                "src": "5753:16:28",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                                  "typeString": "function () pure returns (bytes memory)"
                                }
                              },
                              "id": 4702,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "5753:39:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            ],
                            "id": 4697,
                            "name": "keccak256",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 9301,
                            "src": "5743:9:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                              "typeString": "function () pure returns (bytes32)"
                            }
                          },
                          "id": 4703,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "5743:50:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 4704,
                          "name": "_v",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4679,
                          "src": "5807:2:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 4705,
                          "name": "_r",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4681,
                          "src": "5823:2:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 4706,
                          "name": "_s",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4683,
                          "src": "5839:2:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          },
                          {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          },
                          {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          },
                          {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        ],
                        "id": 4696,
                        "name": "ecrecover",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 9299,
                        "src": "5720:9:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_ecrecover_pure$_t_bytes32_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_address_$",
                          "typeString": "function (bytes32,uint8,bytes32,bytes32) pure returns (address)"
                        }
                      },
                      "id": 4707,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "5720:131:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "5707:144:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 4709,
                  "nodeType": "ExpressionStatement",
                  "src": "5707:144:28"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "id": 4712,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 4710,
                      "name": "recAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4689,
                      "src": "5869:10:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 4711,
                      "name": "_signerAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4677,
                      "src": "5883:14:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "5869:28:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 4687,
                  "id": 4713,
                  "nodeType": "Return",
                  "src": "5862:35:28"
                }
              ]
            },
            "documentation": "Validate order signature\n     * @param  _orderHash       Hash of issuance order\n@param  _signerAddress   Address of Issuance Order signer\n@param  _v               v element of ECDSA signature\n@param  _r               r element of ECDSA signature\n@param  _s               s element of ECDSA signature",
            "id": 4715,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validateSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4684,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4675,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 4715,
                  "src": "5293:18:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4674,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "5293:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4677,
                  "name": "_signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4715,
                  "src": "5321:22:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4676,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5321:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4679,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 4715,
                  "src": "5353:8:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 4678,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "5353:5:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4681,
                  "name": "_r",
                  "nodeType": "VariableDeclaration",
                  "scope": 4715,
                  "src": "5371:10:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4680,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "5371:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4683,
                  "name": "_s",
                  "nodeType": "VariableDeclaration",
                  "scope": 4715,
                  "src": "5391:10:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4682,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "5391:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5283:124:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4687,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4686,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4715,
                  "src": "5454:4:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 4685,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "5454:4:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5453:6:28"
            },
            "scope": 4776,
            "src": "5257:647:28",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4774,
              "nodeType": "Block",
              "src": "6451:616:28",
              "statements": [
                {
                  "assignments": [
                    4727
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 4727,
                      "name": "remainder",
                      "nodeType": "VariableDeclaration",
                      "scope": 4775,
                      "src": "6532:17:28",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 4726,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "6532:7:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 4733,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4729,
                        "name": "_principal",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4717,
                        "src": "6559:10:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4730,
                        "name": "_numerator",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4719,
                        "src": "6571:10:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4731,
                        "name": "_denominator",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4721,
                        "src": "6583:12:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 4728,
                      "name": "mulmod",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 9308,
                      "src": "6552:6:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_mulmod_pure$_t_uint256_$_t_uint256_$_t_uint256_$returns$_t_uint256_$",
                        "typeString": "function (uint256,uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 4732,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6552:44:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6532:64:28"
                },
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 4736,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 4734,
                      "name": "remainder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4727,
                      "src": "6653:9:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 4735,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6666:1:28",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "src": "6653:14:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 4746,
                  "nodeType": "IfStatement",
                  "src": "6649:96:28",
                  "trueBody": {
                    "id": 4745,
                    "nodeType": "Block",
                    "src": "6669:76:28",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 4742,
                              "name": "_denominator",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4721,
                              "src": "6721:12:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "id": 4739,
                                  "name": "_numerator",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 4719,
                                  "src": "6705:10:28",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                }
                              ],
                              "expression": {
                                "argumentTypes": [
                                  {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 4737,
                                  "name": "_principal",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 4717,
                                  "src": "6690:10:28",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 4738,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "mul",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 8695,
                                "src": "6690:14:28",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 4740,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "6690:26:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 4741,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "div",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 8709,
                            "src": "6690:30:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 4743,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "6690:44:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "functionReturnParameters": 4725,
                        "id": 4744,
                        "nodeType": "Return",
                        "src": "6683:51:28"
                      }
                    ]
                  }
                },
                {
                  "assignments": [
                    4748
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 4748,
                      "name": "errPercentageTimes1000000",
                      "nodeType": "VariableDeclaration",
                      "scope": 4775,
                      "src": "6793:33:28",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 4747,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "6793:7:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 4759,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 4756,
                            "name": "_principal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4717,
                            "src": "6871:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 4754,
                            "name": "_numerator",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4719,
                            "src": "6856:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 4755,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 8695,
                          "src": "6856:14:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 4757,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6856:26:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "hexValue": "31303030303030",
                            "id": 4751,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "6843:7:28",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_1000000_by_1",
                              "typeString": "int_const 1000000"
                            },
                            "value": "1000000"
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_rational_1000000_by_1",
                              "typeString": "int_const 1000000"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 4749,
                            "name": "remainder",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4727,
                            "src": "6829:9:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 4750,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 8695,
                          "src": "6829:13:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 4752,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6829:22:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 4753,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "div",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 8709,
                      "src": "6829:26:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 4758,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6829:54:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6793:90:28"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 4763,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 4761,
                          "name": "errPercentageTimes1000000",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4748,
                          "src": "6957:25:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "31303030",
                          "id": 4762,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6985:4:28",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1000_by_1",
                            "typeString": "int_const 1000"
                          },
                          "value": "1000"
                        },
                        "src": "6957:32:28",
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
                      "id": 4760,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        9310,
                        9311
                      ],
                      "referencedDeclaration": 9310,
                      "src": "6949:7:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 4764,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6949:41:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4765,
                  "nodeType": "ExpressionStatement",
                  "src": "6949:41:28"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4771,
                        "name": "_denominator",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4721,
                        "src": "7047:12:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 4768,
                            "name": "_numerator",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4719,
                            "src": "7031:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 4766,
                            "name": "_principal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4717,
                            "src": "7016:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 4767,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 8695,
                          "src": "7016:14:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 4769,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "7016:26:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 4770,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "div",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 8709,
                      "src": "7016:30:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 4772,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7016:44:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 4725,
                  "id": 4773,
                  "nodeType": "Return",
                  "src": "7009:51:28"
                }
              ]
            },
            "documentation": "Checks for rounding errors and returns value of potential partial amounts of a principal\n     * @param  _principal       Number fractional amount is derived from\n@param  _numerator       Numerator of fraction\n@param  _denominator     Denominator of fraction\n@return uint256          Fractional amount of principal calculated",
            "id": 4775,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getPartialAmount",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4722,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4717,
                  "name": "_principal",
                  "nodeType": "VariableDeclaration",
                  "scope": 4775,
                  "src": "6321:18:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4716,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6321:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4719,
                  "name": "_numerator",
                  "nodeType": "VariableDeclaration",
                  "scope": 4775,
                  "src": "6349:18:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4718,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6349:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4721,
                  "name": "_denominator",
                  "nodeType": "VariableDeclaration",
                  "scope": 4775,
                  "src": "6377:20:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4720,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6377:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6311:92:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4725,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4724,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4775,
                  "src": "6438:7:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4723,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6438:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6437:9:28"
            },
            "scope": 4776,
            "src": "6286:781:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 4777,
        "src": "856:6213:28"
      }
    ],
    "src": "597:6473:28"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
    "exportedSymbols": {
      "OrderLibrary": [
        4776
      ]
    },
    "id": 4777,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4576,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:28"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 4578,
        "nodeType": "ImportDirective",
        "scope": 4777,
        "sourceUnit": 8755,
        "src": "622:73:28",
        "symbolAliases": [
          {
            "foreign": 4577,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title OrderLibrary\n@author Set Protocol\n * The Order Library contains functions for checking validation and hashing of Issuance Orders.\n ",
        "fullyImplemented": true,
        "id": 4776,
        "linearizedBaseContracts": [
          4776
        ],
        "name": "OrderLibrary",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 4581,
            "libraryName": {
              "contractScope": null,
              "id": 4579,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 8754,
              "src": "889:8:28",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$8754",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "883:27:28",
            "typeName": {
              "id": 4580,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "902:7:28",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "canonicalName": "OrderLibrary.IssuanceOrder",
            "id": 4612,
            "members": [
              {
                "constant": false,
                "id": 4583,
                "name": "setAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2366:18:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4582,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2366:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4585,
                "name": "makerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2427:20:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4584,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2427:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4587,
                "name": "makerToken",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2488:18:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4586,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2488:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4589,
                "name": "relayerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2549:22:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4588,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2549:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4591,
                "name": "relayerToken",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2610:20:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4590,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2610:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4593,
                "name": "quantity",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2671:16:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4592,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2671:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4595,
                "name": "makerTokenAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2729:24:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4594,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2729:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4597,
                "name": "expiration",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2787:18:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4596,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2787:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4599,
                "name": "makerRelayerFee",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2845:23:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4598,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2845:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4601,
                "name": "takerRelayerFee",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2903:23:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4600,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2903:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4603,
                "name": "salt",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "2961:12:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4602,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2961:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4606,
                "name": "requiredComponents",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "3019:28:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 4604,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3019:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 4605,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "3019:9:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                    "typeString": "address[]"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4609,
                "name": "requiredComponentAmounts",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "3086:34:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                  "typeString": "uint256[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 4607,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3086:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 4608,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "3086:9:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                    "typeString": "uint256[]"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4611,
                "name": "orderHash",
                "nodeType": "VariableDeclaration",
                "scope": 4612,
                "src": "3162:17:28",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes32",
                  "typeString": "bytes32"
                },
                "typeName": {
                  "id": 4610,
                  "name": "bytes32",
                  "nodeType": "ElementaryTypeName",
                  "src": "3162:7:28",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "IssuanceOrder",
            "nodeType": "StructDefinition",
            "scope": 4776,
            "src": "2335:851:28",
            "visibility": "public"
          },
          {
            "body": {
              "id": 4672,
              "nodeType": "Block",
              "src": "3974:919:28",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4634,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4616,
                              "src": "4085:10:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 4636,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 4635,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4096:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4085:13:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4637,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4616,
                              "src": "4143:10:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 4639,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 4638,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4154:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_1_by_1",
                                "typeString": "int_const 1"
                              },
                              "value": "1"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4143:13:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4640,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4616,
                              "src": "4203:10:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 4642,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "32",
                              "id": 4641,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4214:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_2_by_1",
                                "typeString": "int_const 2"
                              },
                              "value": "2"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4203:13:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4643,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4616,
                              "src": "4261:10:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 4645,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "33",
                              "id": 4644,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4272:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_3_by_1",
                                "typeString": "int_const 3"
                              },
                              "value": "3"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4261:13:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4646,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4616,
                              "src": "4323:10:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 4648,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "34",
                              "id": 4647,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4334:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_4_by_1",
                                "typeString": "int_const 4"
                              },
                              "value": "4"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4323:13:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4649,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4620,
                              "src": "4383:7:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 4651,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 4650,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4391:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4383:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4652,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4620,
                              "src": "4439:7:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 4654,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 4653,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4447:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_1_by_1",
                                "typeString": "int_const 1"
                              },
                              "value": "1"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4439:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4655,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4620,
                              "src": "4503:7:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 4657,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "32",
                              "id": 4656,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4511:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_2_by_1",
                                "typeString": "int_const 2"
                              },
                              "value": "2"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4503:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4658,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4620,
                              "src": "4561:7:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 4660,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "33",
                              "id": 4659,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4569:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_3_by_1",
                                "typeString": "int_const 3"
                              },
                              "value": "3"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4561:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4661,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4620,
                              "src": "4624:7:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 4663,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "34",
                              "id": 4662,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4632:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_4_by_1",
                                "typeString": "int_const 4"
                              },
                              "value": "4"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4624:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4664,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4620,
                              "src": "4687:7:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                                "typeString": "uint256[6] memory"
                              }
                            },
                            "id": 4666,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "35",
                              "id": 4665,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4695:1:28",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_5_by_1",
                                "typeString": "int_const 5"
                              },
                              "value": "5"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4687:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 4667,
                            "name": "_requiredComponents",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4623,
                            "src": "4739:19:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 4668,
                            "name": "_requiredComponentAmounts",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4626,
                            "src": "4806:25:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            },
                            {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 4632,
                            "name": "abi",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 9294,
                            "src": "4051:3:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_abi",
                              "typeString": "abi"
                            }
                          },
                          "id": 4633,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "memberName": "encodePacked",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "4051:16:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                            "typeString": "function () pure returns (bytes memory)"
                          }
                        },
                        "id": 4669,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4051:825:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      ],
                      "id": 4631,
                      "name": "keccak256",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 9301,
                      "src": "4028:9:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                        "typeString": "function () pure returns (bytes32)"
                      }
                    },
                    "id": 4670,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4028:858:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 4630,
                  "id": 4671,
                  "nodeType": "Return",
                  "src": "4021:865:28"
                }
              ]
            },
            "documentation": "Create hash of order parameters\n     * @param  _addresses                   [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                      [quantity, makerTokenAmount, expiration, makerRelayerFee, takerRelayerFee, salt]\n@param  _requiredComponents          Components to be acquired by exchange order\n@param  _requiredComponentAmounts    Amounts of each component to be acquired by exchange order",
            "id": 4673,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "generateOrderHash",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4627,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4616,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 4673,
                  "src": "3775:21:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4613,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3775:7:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4615,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 4614,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3783:1:28",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "3775:10:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$5_storage_ptr",
                      "typeString": "address[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4620,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 4673,
                  "src": "3806:18:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                    "typeString": "uint256[6]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4617,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3806:7:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4619,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "36",
                      "id": 4618,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3814:1:28",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "6"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "3806:10:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$6_storage_ptr",
                      "typeString": "uint256[6]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4623,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 4673,
                  "src": "3834:29:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4621,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3834:7:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4622,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3834:9:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4626,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 4673,
                  "src": "3873:35:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4624,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3873:7:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4625,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3873:9:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3765:149:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4630,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4629,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4673,
                  "src": "3961:7:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4628,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "3961:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3960:9:28"
            },
            "scope": 4776,
            "src": "3739:1154:28",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4714,
              "nodeType": "Block",
              "src": "5464:440:28",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 4689,
                      "name": "recAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 4715,
                      "src": "5531:18:28",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 4688,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "5531:7:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 4690,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5531:18:28"
                },
                {
                  "assignments": [
                    4692
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 4692,
                      "name": "msgPrefix",
                      "nodeType": "VariableDeclaration",
                      "scope": 4715,
                      "src": "5591:22:28",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 4691,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "5591:5:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 4694,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "19457468657265756d205369676e6564204d6573736167653a0a3332",
                    "id": 4693,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "string",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "5616:34:28",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_stringliteral_178a2411ab6fbc1ba11064408972259c558d0e82fd48b0aba3ad81d14f065e73",
                      "typeString": "literal_string \"\u0019Ethereum Signed Message:\n32\""
                    },
                    "value": "\u0019Ethereum Signed Message:\n32"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5591:59:28"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4708,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 4695,
                      "name": "recAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4689,
                      "src": "5707:10:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "id": 4700,
                                  "name": "msgPrefix",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 4692,
                                  "src": "5770:9:28",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bytes_memory_ptr",
                                    "typeString": "bytes memory"
                                  }
                                },
                                {
                                  "argumentTypes": null,
                                  "id": 4701,
                                  "name": "_orderHash",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 4675,
                                  "src": "5781:10:28",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bytes32",
                                    "typeString": "bytes32"
                                  }
                                }
                              ],
                              "expression": {
                                "argumentTypes": [
                                  {
                                    "typeIdentifier": "t_bytes_memory_ptr",
                                    "typeString": "bytes memory"
                                  },
                                  {
                                    "typeIdentifier": "t_bytes32",
                                    "typeString": "bytes32"
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 4698,
                                  "name": "abi",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 9294,
                                  "src": "5753:3:28",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_magic_abi",
                                    "typeString": "abi"
                                  }
                                },
                                "id": 4699,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "lValueRequested": false,
                                "memberName": "encodePacked",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": null,
                                "src": "5753:16:28",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                                  "typeString": "function () pure returns (bytes memory)"
                                }
                              },
                              "id": 4702,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "5753:39:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            ],
                            "id": 4697,
                            "name": "keccak256",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 9301,
                            "src": "5743:9:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                              "typeString": "function () pure returns (bytes32)"
                            }
                          },
                          "id": 4703,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "5743:50:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 4704,
                          "name": "_v",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4679,
                          "src": "5807:2:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 4705,
                          "name": "_r",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4681,
                          "src": "5823:2:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 4706,
                          "name": "_s",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4683,
                          "src": "5839:2:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          },
                          {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          },
                          {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          },
                          {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        ],
                        "id": 4696,
                        "name": "ecrecover",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 9299,
                        "src": "5720:9:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_ecrecover_pure$_t_bytes32_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_address_$",
                          "typeString": "function (bytes32,uint8,bytes32,bytes32) pure returns (address)"
                        }
                      },
                      "id": 4707,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "5720:131:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "5707:144:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 4709,
                  "nodeType": "ExpressionStatement",
                  "src": "5707:144:28"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "id": 4712,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 4710,
                      "name": "recAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4689,
                      "src": "5869:10:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 4711,
                      "name": "_signerAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4677,
                      "src": "5883:14:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "5869:28:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 4687,
                  "id": 4713,
                  "nodeType": "Return",
                  "src": "5862:35:28"
                }
              ]
            },
            "documentation": "Validate order signature\n     * @param  _orderHash       Hash of issuance order\n@param  _signerAddress   Address of Issuance Order signer\n@param  _v               v element of ECDSA signature\n@param  _r               r element of ECDSA signature\n@param  _s               s element of ECDSA signature",
            "id": 4715,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validateSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4684,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4675,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 4715,
                  "src": "5293:18:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4674,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "5293:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4677,
                  "name": "_signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4715,
                  "src": "5321:22:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4676,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5321:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4679,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 4715,
                  "src": "5353:8:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 4678,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "5353:5:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4681,
                  "name": "_r",
                  "nodeType": "VariableDeclaration",
                  "scope": 4715,
                  "src": "5371:10:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4680,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "5371:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4683,
                  "name": "_s",
                  "nodeType": "VariableDeclaration",
                  "scope": 4715,
                  "src": "5391:10:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4682,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "5391:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5283:124:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4687,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4686,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4715,
                  "src": "5454:4:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 4685,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "5454:4:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5453:6:28"
            },
            "scope": 4776,
            "src": "5257:647:28",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4774,
              "nodeType": "Block",
              "src": "6451:616:28",
              "statements": [
                {
                  "assignments": [
                    4727
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 4727,
                      "name": "remainder",
                      "nodeType": "VariableDeclaration",
                      "scope": 4775,
                      "src": "6532:17:28",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 4726,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "6532:7:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 4733,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4729,
                        "name": "_principal",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4717,
                        "src": "6559:10:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4730,
                        "name": "_numerator",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4719,
                        "src": "6571:10:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4731,
                        "name": "_denominator",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4721,
                        "src": "6583:12:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 4728,
                      "name": "mulmod",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 9308,
                      "src": "6552:6:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_mulmod_pure$_t_uint256_$_t_uint256_$_t_uint256_$returns$_t_uint256_$",
                        "typeString": "function (uint256,uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 4732,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6552:44:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6532:64:28"
                },
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 4736,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 4734,
                      "name": "remainder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4727,
                      "src": "6653:9:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 4735,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6666:1:28",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "src": "6653:14:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 4746,
                  "nodeType": "IfStatement",
                  "src": "6649:96:28",
                  "trueBody": {
                    "id": 4745,
                    "nodeType": "Block",
                    "src": "6669:76:28",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 4742,
                              "name": "_denominator",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4721,
                              "src": "6721:12:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "id": 4739,
                                  "name": "_numerator",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 4719,
                                  "src": "6705:10:28",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                }
                              ],
                              "expression": {
                                "argumentTypes": [
                                  {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 4737,
                                  "name": "_principal",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 4717,
                                  "src": "6690:10:28",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 4738,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "mul",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 8695,
                                "src": "6690:14:28",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 4740,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "6690:26:28",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 4741,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "div",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 8709,
                            "src": "6690:30:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 4743,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "6690:44:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "functionReturnParameters": 4725,
                        "id": 4744,
                        "nodeType": "Return",
                        "src": "6683:51:28"
                      }
                    ]
                  }
                },
                {
                  "assignments": [
                    4748
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 4748,
                      "name": "errPercentageTimes1000000",
                      "nodeType": "VariableDeclaration",
                      "scope": 4775,
                      "src": "6793:33:28",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 4747,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "6793:7:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 4759,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 4756,
                            "name": "_principal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4717,
                            "src": "6871:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 4754,
                            "name": "_numerator",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4719,
                            "src": "6856:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 4755,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 8695,
                          "src": "6856:14:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 4757,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6856:26:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "hexValue": "31303030303030",
                            "id": 4751,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "6843:7:28",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_1000000_by_1",
                              "typeString": "int_const 1000000"
                            },
                            "value": "1000000"
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_rational_1000000_by_1",
                              "typeString": "int_const 1000000"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 4749,
                            "name": "remainder",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4727,
                            "src": "6829:9:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 4750,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 8695,
                          "src": "6829:13:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 4752,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6829:22:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 4753,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "div",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 8709,
                      "src": "6829:26:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 4758,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6829:54:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6793:90:28"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 4763,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 4761,
                          "name": "errPercentageTimes1000000",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4748,
                          "src": "6957:25:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "31303030",
                          "id": 4762,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6985:4:28",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1000_by_1",
                            "typeString": "int_const 1000"
                          },
                          "value": "1000"
                        },
                        "src": "6957:32:28",
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
                      "id": 4760,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        9310,
                        9311
                      ],
                      "referencedDeclaration": 9310,
                      "src": "6949:7:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 4764,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6949:41:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4765,
                  "nodeType": "ExpressionStatement",
                  "src": "6949:41:28"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4771,
                        "name": "_denominator",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4721,
                        "src": "7047:12:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 4768,
                            "name": "_numerator",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4719,
                            "src": "7031:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 4766,
                            "name": "_principal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4717,
                            "src": "7016:10:28",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 4767,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 8695,
                          "src": "7016:14:28",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 4769,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "7016:26:28",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 4770,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "div",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 8709,
                      "src": "7016:30:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 4772,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7016:44:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 4725,
                  "id": 4773,
                  "nodeType": "Return",
                  "src": "7009:51:28"
                }
              ]
            },
            "documentation": "Checks for rounding errors and returns value of potential partial amounts of a principal\n     * @param  _principal       Number fractional amount is derived from\n@param  _numerator       Numerator of fraction\n@param  _denominator     Denominator of fraction\n@return uint256          Fractional amount of principal calculated",
            "id": 4775,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getPartialAmount",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4722,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4717,
                  "name": "_principal",
                  "nodeType": "VariableDeclaration",
                  "scope": 4775,
                  "src": "6321:18:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4716,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6321:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4719,
                  "name": "_numerator",
                  "nodeType": "VariableDeclaration",
                  "scope": 4775,
                  "src": "6349:18:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4718,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6349:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4721,
                  "name": "_denominator",
                  "nodeType": "VariableDeclaration",
                  "scope": 4775,
                  "src": "6377:20:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4720,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6377:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6311:92:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 4725,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4724,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4775,
                  "src": "6438:7:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4723,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6438:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6437:9:28"
            },
            "scope": 4776,
            "src": "6286:781:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 4777,
        "src": "856:6213:28"
      }
    ],
    "src": "597:6473:28"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.125Z"
}