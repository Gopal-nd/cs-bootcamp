import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

// Generate a new keypair
const keypair = Keypair.generate();

// Extract the public and private keys
const publicKey = keypair.publicKey.toString();
const secretKey = keypair.secretKey;

// Display the keys
console.log(keypair.publicKey.toBytes());
console.log("Public Key:", publicKey);
console.log("Private Key (Secret Key):", secretKey);
// Convert the message "hello world" to a Uint7Array
const message = new TextEncoder().encode("hello world");

const signature = nacl.sign.detached(message, secretKey);
console.log(signature);
const result = nacl.sign.detached.verify(
  message,
  signature,
  keypair.publicKey.toBytes(),
);

console.log(result);
let bytes = new TextEncoder().encode("hello world");
console.log(new TextDecoder().decode(secretKey));

console.log("--------------------------------");

import { ethers } from "ethers";

// Generate a random wallet
const wallet = ethers.Wallet.createRandom();

// Extract the public and private keys
const publickey = wallet.address;
const privateKey = wallet.privateKey;

console.log("Public Key (Address):", publickey);
console.log("Private Key:", privateKey);

// Message to sign

// Sign the message using the wallet's private key
const signatures = await wallet.signMessage(message);
console.log("Signature:", signatures);

// Verify the signature
const recoveredAddress = ethers.verifyMessage(message, signatures);

console.log("Recovered Address:", recoveredAddress);
console.log("Signature is valid:", recoveredAddress === publickey);
