export const Migrations = 
{
  "contractName": "Migrations",
  "abi": [
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
      "inputs": [],
      "name": "lastCompletedMigration",
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
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "completed",
          "type": "uint256"
        }
      ],
      "name": "setCompleted",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newAddress",
          "type": "address"
        }
      ],
      "name": "upgrade",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b5060008054600160a060020a0319163317905561023c806100326000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630900f01081146100665780638da5cb5b14610096578063fbdbad3c146100d4578063fdacd576146100fb575b600080fd5b34801561007257600080fd5b5061009473ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100a257600080fd5b506100ab6101c5565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b3480156100e057600080fd5b506100e96101e1565b60408051918252519081900360200190f35b34801561010757600080fd5b506100946004356101e7565b6000805473ffffffffffffffffffffffffffffffffffffffff163314156101c1578190508073ffffffffffffffffffffffffffffffffffffffff1663fdacd5766001546040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b1580156101a857600080fd5b505af11580156101bc573d6000803e3d6000fd5b505050505b5050565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60015481565b60005473ffffffffffffffffffffffffffffffffffffffff1633141561020d5760018190555b505600a165627a7a72305820bc78d1a84d0e526531424546a4e6ec78ae6292872f60aba17d2679e3e899f6480029",
  "deployedBytecode": "0x6080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630900f01081146100665780638da5cb5b14610096578063fbdbad3c146100d4578063fdacd576146100fb575b600080fd5b34801561007257600080fd5b5061009473ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100a257600080fd5b506100ab6101c5565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b3480156100e057600080fd5b506100e96101e1565b60408051918252519081900360200190f35b34801561010757600080fd5b506100946004356101e7565b6000805473ffffffffffffffffffffffffffffffffffffffff163314156101c1578190508073ffffffffffffffffffffffffffffffffffffffff1663fdacd5766001546040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b1580156101a857600080fd5b505af11580156101bc573d6000803e3d6000fd5b505050505b5050565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60015481565b60005473ffffffffffffffffffffffffffffffffffffffff1633141561020d5760018190555b505600a165627a7a72305820bc78d1a84d0e526531424546a4e6ec78ae6292872f60aba17d2679e3e899f6480029",
  "sourceMap": "26:478:0:-;;;179:50;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;206:5:0;:18;;-1:-1:-1;;;;;;206:18:0;214:10;206:18;;;26:478;;;;;;",
  "deployedSourceMap": "26:478:0:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;341:161;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;341:161:0;;;;;;;;;50:20;;8:9:-1;5:2;;;30:1;27;20:12;5:2;50:20:0;;;;;;;;;;;;;;;;;;;;;;;74:37;;8:9:-1;5:2;;;30:1;27;20:12;5:2;74:37:0;;;;;;;;;;;;;;;;;;;;233:104;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;233:104:0;;;;;341:161;402:19;162:5;;;;148:10;:19;144:26;;;435:10;402:44;;452:8;:21;;;474:22;;452:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;452:45:0;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;452:45:0;;;;144:26;341:161;;:::o;50:20::-;;;;;;:::o;74:37::-;;;;:::o;233:104::-;162:5;;;;148:10;:19;144:26;;;298:22;:34;;;144:26;233:104;:::o",
  "source": "pragma solidity 0.4.24;\n\n\ncontract Migrations {\n  address public owner;\n  uint256 public lastCompletedMigration;\n\n  modifier restricted() {\n    if (msg.sender == owner) _;\n  }\n\n  constructor() public {\n    owner = msg.sender;\n  }\n\n  function setCompleted(uint256 completed) public restricted {\n    lastCompletedMigration = completed;\n  }\n\n  function upgrade(address newAddress) public restricted {\n    Migrations upgraded = Migrations(newAddress);\n    upgraded.setCompleted(lastCompletedMigration);\n  }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/Migrations.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/Migrations.sol",
    "exportedSymbols": {
      "Migrations": [
        56
      ]
    },
    "id": 57,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:0"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 56,
        "linearizedBaseContracts": [
          56
        ],
        "name": "Migrations",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 3,
            "name": "owner",
            "nodeType": "VariableDeclaration",
            "scope": 56,
            "src": "50:20:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 2,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "50:7:0",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 5,
            "name": "lastCompletedMigration",
            "nodeType": "VariableDeclaration",
            "scope": 56,
            "src": "74:37:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 4,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "74:7:0",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 13,
              "nodeType": "Block",
              "src": "138:37:0",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "id": 10,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 7,
                        "name": "msg",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 9307,
                        "src": "148:3:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_magic_message",
                          "typeString": "msg"
                        }
                      },
                      "id": 8,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sender",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "148:10:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 9,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3,
                      "src": "162:5:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "148:19:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 12,
                  "nodeType": "IfStatement",
                  "src": "144:26:0",
                  "trueBody": {
                    "id": 11,
                    "nodeType": "PlaceholderStatement",
                    "src": "169:1:0"
                  }
                }
              ]
            },
            "documentation": null,
            "id": 14,
            "name": "restricted",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 6,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "135:2:0"
            },
            "src": "116:59:0",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 22,
              "nodeType": "Block",
              "src": "200:29:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 20,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 17,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3,
                      "src": "206:5:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 18,
                        "name": "msg",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 9307,
                        "src": "214:3:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_magic_message",
                          "typeString": "msg"
                        }
                      },
                      "id": 19,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sender",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "214:10:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "206:18:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 21,
                  "nodeType": "ExpressionStatement",
                  "src": "206:18:0"
                }
              ]
            },
            "documentation": null,
            "id": 23,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 15,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "190:2:0"
            },
            "payable": false,
            "returnParameters": {
              "id": 16,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "200:0:0"
            },
            "scope": 56,
            "src": "179:50:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 34,
              "nodeType": "Block",
              "src": "292:45:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 32,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 30,
                      "name": "lastCompletedMigration",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5,
                      "src": "298:22:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 31,
                      "name": "completed",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 25,
                      "src": "323:9:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "298:34:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 33,
                  "nodeType": "ExpressionStatement",
                  "src": "298:34:0"
                }
              ]
            },
            "documentation": null,
            "id": 35,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 28,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 27,
                  "name": "restricted",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 14,
                  "src": "281:10:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "281:10:0"
              }
            ],
            "name": "setCompleted",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 26,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 25,
                  "name": "completed",
                  "nodeType": "VariableDeclaration",
                  "scope": 35,
                  "src": "255:17:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 24,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "255:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "254:19:0"
            },
            "payable": false,
            "returnParameters": {
              "id": 29,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "292:0:0"
            },
            "scope": 56,
            "src": "233:104:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 54,
              "nodeType": "Block",
              "src": "396:106:0",
              "statements": [
                {
                  "assignments": [
                    43
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 43,
                      "name": "upgraded",
                      "nodeType": "VariableDeclaration",
                      "scope": 55,
                      "src": "402:19:0",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Migrations_$56",
                        "typeString": "contract Migrations"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 42,
                        "name": "Migrations",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 56,
                        "src": "402:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Migrations_$56",
                          "typeString": "contract Migrations"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 47,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 45,
                        "name": "newAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 37,
                        "src": "435:10:0",
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
                      "id": 44,
                      "name": "Migrations",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 56,
                      "src": "424:10:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_contract$_Migrations_$56_$",
                        "typeString": "type(contract Migrations)"
                      }
                    },
                    "id": 46,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "424:22:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Migrations_$56",
                      "typeString": "contract Migrations"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "402:44:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 51,
                        "name": "lastCompletedMigration",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5,
                        "src": "474:22:0",
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
                        "id": 48,
                        "name": "upgraded",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 43,
                        "src": "452:8:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Migrations_$56",
                          "typeString": "contract Migrations"
                        }
                      },
                      "id": 50,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "setCompleted",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 35,
                      "src": "452:21:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_uint256_$returns$__$",
                        "typeString": "function (uint256) external"
                      }
                    },
                    "id": 52,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "452:45:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 53,
                  "nodeType": "ExpressionStatement",
                  "src": "452:45:0"
                }
              ]
            },
            "documentation": null,
            "id": 55,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 40,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 39,
                  "name": "restricted",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 14,
                  "src": "385:10:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "385:10:0"
              }
            ],
            "name": "upgrade",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 38,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 37,
                  "name": "newAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 55,
                  "src": "358:18:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 36,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "358:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "357:20:0"
            },
            "payable": false,
            "returnParameters": {
              "id": 41,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "396:0:0"
            },
            "scope": 56,
            "src": "341:161:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 57,
        "src": "26:478:0"
      }
    ],
    "src": "0:505:0"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/Migrations.sol",
    "exportedSymbols": {
      "Migrations": [
        56
      ]
    },
    "id": 57,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:0"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 56,
        "linearizedBaseContracts": [
          56
        ],
        "name": "Migrations",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 3,
            "name": "owner",
            "nodeType": "VariableDeclaration",
            "scope": 56,
            "src": "50:20:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 2,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "50:7:0",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 5,
            "name": "lastCompletedMigration",
            "nodeType": "VariableDeclaration",
            "scope": 56,
            "src": "74:37:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 4,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "74:7:0",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 13,
              "nodeType": "Block",
              "src": "138:37:0",
              "statements": [
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "id": 10,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 7,
                        "name": "msg",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 9307,
                        "src": "148:3:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_magic_message",
                          "typeString": "msg"
                        }
                      },
                      "id": 8,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sender",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "148:10:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 9,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3,
                      "src": "162:5:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "148:19:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 12,
                  "nodeType": "IfStatement",
                  "src": "144:26:0",
                  "trueBody": {
                    "id": 11,
                    "nodeType": "PlaceholderStatement",
                    "src": "169:1:0"
                  }
                }
              ]
            },
            "documentation": null,
            "id": 14,
            "name": "restricted",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 6,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "135:2:0"
            },
            "src": "116:59:0",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 22,
              "nodeType": "Block",
              "src": "200:29:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 20,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 17,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3,
                      "src": "206:5:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 18,
                        "name": "msg",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 9307,
                        "src": "214:3:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_magic_message",
                          "typeString": "msg"
                        }
                      },
                      "id": 19,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sender",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "214:10:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "206:18:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 21,
                  "nodeType": "ExpressionStatement",
                  "src": "206:18:0"
                }
              ]
            },
            "documentation": null,
            "id": 23,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 15,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "190:2:0"
            },
            "payable": false,
            "returnParameters": {
              "id": 16,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "200:0:0"
            },
            "scope": 56,
            "src": "179:50:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 34,
              "nodeType": "Block",
              "src": "292:45:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 32,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 30,
                      "name": "lastCompletedMigration",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5,
                      "src": "298:22:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 31,
                      "name": "completed",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 25,
                      "src": "323:9:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "298:34:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 33,
                  "nodeType": "ExpressionStatement",
                  "src": "298:34:0"
                }
              ]
            },
            "documentation": null,
            "id": 35,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 28,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 27,
                  "name": "restricted",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 14,
                  "src": "281:10:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "281:10:0"
              }
            ],
            "name": "setCompleted",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 26,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 25,
                  "name": "completed",
                  "nodeType": "VariableDeclaration",
                  "scope": 35,
                  "src": "255:17:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 24,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "255:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "254:19:0"
            },
            "payable": false,
            "returnParameters": {
              "id": 29,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "292:0:0"
            },
            "scope": 56,
            "src": "233:104:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 54,
              "nodeType": "Block",
              "src": "396:106:0",
              "statements": [
                {
                  "assignments": [
                    43
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 43,
                      "name": "upgraded",
                      "nodeType": "VariableDeclaration",
                      "scope": 55,
                      "src": "402:19:0",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Migrations_$56",
                        "typeString": "contract Migrations"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 42,
                        "name": "Migrations",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 56,
                        "src": "402:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Migrations_$56",
                          "typeString": "contract Migrations"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 47,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 45,
                        "name": "newAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 37,
                        "src": "435:10:0",
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
                      "id": 44,
                      "name": "Migrations",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 56,
                      "src": "424:10:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_contract$_Migrations_$56_$",
                        "typeString": "type(contract Migrations)"
                      }
                    },
                    "id": 46,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "424:22:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Migrations_$56",
                      "typeString": "contract Migrations"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "402:44:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 51,
                        "name": "lastCompletedMigration",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5,
                        "src": "474:22:0",
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
                        "id": 48,
                        "name": "upgraded",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 43,
                        "src": "452:8:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Migrations_$56",
                          "typeString": "contract Migrations"
                        }
                      },
                      "id": 50,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "setCompleted",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 35,
                      "src": "452:21:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_uint256_$returns$__$",
                        "typeString": "function (uint256) external"
                      }
                    },
                    "id": 52,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "452:45:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 53,
                  "nodeType": "ExpressionStatement",
                  "src": "452:45:0"
                }
              ]
            },
            "documentation": null,
            "id": 55,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 40,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 39,
                  "name": "restricted",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 14,
                  "src": "385:10:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "385:10:0"
              }
            ],
            "name": "upgrade",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 38,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 37,
                  "name": "newAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 55,
                  "src": "358:18:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 36,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "358:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "357:20:0"
            },
            "payable": false,
            "returnParameters": {
              "id": 41,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "396:0:0"
            },
            "scope": 56,
            "src": "341:161:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 57,
        "src": "26:478:0"
      }
    ],
    "src": "0:505:0"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.059Z"
}