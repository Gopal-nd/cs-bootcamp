import bs56 from "bs58";
// bit

import { constants } from "buffer";

// byte = 8bit

// array of bytes = [byte,byte,202,0,1,255]  up to 255 which is 2^8

let bytes = new Uint8Array([72, 72, 72, 111]);

console.log(bytes);

// if number excreeds more than 255 it will mode % it

//bytes to ascii

console.log(String.fromCharCode(72));
console.log("H".charCodeAt(0));

const ascii = new TextDecoder().decode(bytes);
console.log(ascii);

function convertToBytes(val) {
  return new Uint8Array([...val].map((i) => i.charCodeAt(0)));
}

console.log(convertToBytes("gopal"));

function asciiToBinary(asc) {
  const buffer = Buffer.from(asc, "utf8");
  const binary = Array.from(buffer).map((byte) =>
    byte.toString(2).padStart(8, "0"),
  );
  console.log(typeof binary);
}
asciiToBinary("hellijkmnopqrestuv"); // going as hex

const bufFromString = Buffer.from("gopal").toString("base64");
// Default encoding is 'utf8'
console.log(bufFromString);

function uint8ArrayToBase58(uint8Array) {
  return bs58.encode(uint8Array);
}

// Example usage:
const byteArray = new Uint8Array([72, 101, 108, 108, 111]); // Corresponds to "Hello"
const base58String = uint8ArrayToBase58(byteArray);
console.log(base58String); // Output: Base58 encoded string
