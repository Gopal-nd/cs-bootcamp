import crypto from "crypto";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  const chiper = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = chiper.update(text, "utf8", "hex");
  encrypted += chiper.final("hex");

  return encrypted;
}

function decrypt(encryptedText) {
  const dchiper = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = dchiper.update(encryptedText, "hex", "utf8");
  decrypted += dchiper.final("utf8");
  return decrypted;
}

const text = "Hello World";
const encryptedText = encrypt(text);
const decryptedtext = decrypt(encryptedText);

console.log(text, encryptedText, decryptedtext);
