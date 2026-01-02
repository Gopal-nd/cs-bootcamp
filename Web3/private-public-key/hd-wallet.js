// memoics are seed words
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import * as secp from "@noble/secp256k1";
import { HDNodeWallet } from "ethers";

// bitcoin ------------------
import * as bitcoin from "bitcoinjs-lib";
import BIP32Factory from "bip32";
import * as ecc from "tiny-secp256k1";

const bip32 = BIP32Factory(ecc);
const network = bitcoin.networks.bitcoin;
//-----
import nacl from "tweetnacl";
import bs58 from "bs58";
import { ethers } from "ethers";

const mnemonic =
  "invest race fan material girl uncover oppose swallow boring trip sniff garment";
// const memoics = generateMnemonic()
console.log("Generated Mnemonic:", mnemonic);
const seed = mnemonicToSeedSync(mnemonic);
console.log(seed);

// derivation

for (let i = 0; i < 4; i++) {
  // This is the derivation path
  const path = `m/44'/501'/${i}'/0'`;
  const eth = `m/44'/60'/${i}'/0'`;
  const btc = `m/44'/0'/0'/0/${i}`;
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();

  const wallet = HDNodeWallet.fromSeed(seed).derivePath(eth);

  // Extract the public and private keys
  const publickey = wallet.address;
  const privateKey = wallet.privateKey;

  //bitcoin
  const root = bip32.fromSeed(seed, network);
  const child = root.derivePath(btc);

  const { address } = bitcoin.payments.p2wpkh({
    pubkey: child.publicKey,
    network,
  });

  console.log("Wallet : " + i, "-------------------------------------------");
  console.log("solana");
  console.log("Public Key : ", publicKey);
  console.log("Private Key : ", bs58.encode(secret));
  console.log("Ethereum");
  console.log("Public Key : ", publickey);
  console.log("Private Key : ", privateKey);
  console.log("Bitcoin");
  console.log("Public Key:", address);
  console.log("Private Key (WIF):", child.toWIF());

  // const privateKeyBase64 = Buffer.from(secret).toString("base64");
  //console.log("Private Key (Base64):", privateKeyBase64);
  //const privateKeyHex = Buffer.from(secret).toString("hex");
  //console.log("Private Key (Hex):", privateKeyHex);
}

let wallets = `
fro (let i = 0;i<4;i++){
  wallet 1:
  m/44/0/0 -> bitcoin  
  m/44/60/0 -> eth 
  m/44/501/0 ->sol

   wallet 2:
  m/44/0/1 -> bitcoin 
  m/44/60/1 -> eth 
  m/44/501/1 ->sol

 wallet 3:
  m/44/0/2 -> bitcoin 
  m/44/60/2 -> eth 
  m/44/501/2 ->sol

}
`;
