import crypto from "crypto";
import { TextEncoder } from "util";

const input = "100xdevs";

const hash = crypto.createHash("SHA-256").update(input).digest("base58");
console.log(Buffer.from(hash).toString('hex'));

function findPrefix(prefix) {
  let input = 0
  while (true) {
    const hash = crypto
      .createHash("SHA-256")
      .update(input.toString() + 'ndgopalreddy')
      .digest("base58");
    if (hash.startsWith(prefix)) {
      return hash;
    }
    input++;
  }
}

function findPrefixWithInputAndNonce(prefix, data) {
  let input = 0;
  while (true) {
    let inputStr = data + input.toString();
    const hash = crypto.createHash("SHA-256").update(inputStr).digest("hex");
    if (hash.startsWith(prefix)) {
      return { hash: hash, input: inputStr };
    }
    input++;
  }
}

function findPrefixWithTransactions(prefix, data) {
  let input = 0;
  while (true) {
    let inputStr = data + input.toString();
    const hash = crypto.createHash("SHA-256").update(inputStr).digest("hex");
    if (hash.startsWith(prefix)) {
      return { hash: hash, input: inputStr };
    }
    input++;
  }
}

// console.log(findPrefix("00"));

console.log(findPrefixWithInputAndNonce("000", "gopal"));
console.log(
  findPrefixWithTransactions("000", "gopal -> 50 to manu| manu -> 20 to ram"),
);
let uint8Arr = new Uint8Array([0, 255, 127, 128]);
uint8Arr[1] = 300;
console.log(uint8Arr)

let name = 'gopal'
console.log(name.charCodeAt(0))
console.log(String.fromCharCode(103))
console.log('gopal'.toString('base64'))
console.log(uint8Arr.map(b => b.toString(2).padStart((8, '0'))))

const str = "Hello";

const bytes = new TextEncoder().encode(str)
console.log(bytes)
console.log(Buffer.from(bytes).toString('ascii'))
console.log(Buffer.from(bytes).toString('hex'))
console.log(Buffer.from(bytes).toString('base64'))

