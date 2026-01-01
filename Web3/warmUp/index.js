import crypto from "crypto";

const input = "100xdevs";

const hash = crypto.createHash("SHA-256").update(input).digest("hex");
console.log(hash);

function findPrefix(prefix) {
  let input = 0;
  while (true) {
    const hash = crypto
      .createHash("SHA-256")
      .update(input.toString())
      .digest("hex");
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

console.log(findPrefix("000000"));

console.log(findPrefixWithInputAndNonce("000", "gopal"));
console.log(
  findPrefixWithTransactions("000", "gopal -> 50 to manu| manu -> 20 to ram"),
);
