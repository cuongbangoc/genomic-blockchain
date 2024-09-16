# Genomic System User Flow

## Flow Overview

1. User Registration with email, password and private/public key generated
2. User Login: The user is authenticated using their email.
3. Generate mock geneData with randomString
4. EncryptedGenData with user publickey, create signature by privatekey and securely stored
5. Verification signature with publicKey
6. Get Risk Score by the gene data
7. Call Upload geneData function to blockchain with Controller Smart Contract
8. Listen UploadData Event from blockchain
9. Call Confirmation function to end session and minting NFTs and rewarding tokens.
10. Decrypt and get original gene data

## Folder Structure

1. contracts: Defining Contract Details and Creating Contract Instance
2. helpers: Defining crypto helper to encrypted, decrypted data
3. models: Defining user model to save user, gendata model to save gene data
4. services: Defining function to work with user model, gendata model and TEE service.
5. utils: Some util function
6. index.js: start script

## Configuration
```bash
cd api
cp .env.example .env
```
Then replace `BLOCKCHAIN_URL` with your url.

## Run

```bash
cd api
node src/index.js
```
