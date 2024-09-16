import Web3 from 'web3';
import dotenv from 'dotenv';

dotenv.config();

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_URL));

const contractABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'pcspAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'docId',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sessionId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'GNFTMinted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'docId',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sessionId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'riskScore',
        type: 'uint256',
      },
    ],
    name: 'PCSPRewarded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'docId',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sessionId',
        type: 'uint256',
      },
    ],
    name: 'UploadData',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'docId',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'contentHash',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'proof',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'sessionId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'riskScore',
        type: 'uint256',
      },
    ],
    name: 'confirm',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'geneNFT',
    outputs: [
      {
        internalType: 'contract GeneNFT',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'docId',
        type: 'string',
      },
    ],
    name: 'getDoc',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'id',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'hashContent',
            type: 'string',
          },
        ],
        internalType: 'struct Controller.DataDoc',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'sessionId',
        type: 'uint256',
      },
    ],
    name: 'getSession',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'proof',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'confirmed',
            type: 'bool',
          },
        ],
        internalType: 'struct Controller.UploadSession',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pcspToken',
    outputs: [
      {
        internalType: 'contract PostCovidStrokePrevention',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'docId',
        type: 'string',
      },
    ],
    name: 'uploadData',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const contractAddress = '0x7B4982e1F7ee384F206417Fb851a1EB143c513F9';

const contract = new web3.eth.Contract(contractABI, contractAddress);

export default contract;
