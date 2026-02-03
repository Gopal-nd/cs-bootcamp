import { generateKeyPair, sign, verify } from "crypto";

// 🔑 Generate key pair
generateKeyPair("ed25519", async (err, publicKey, privateKey) => {

  if (err) throw err;
  console.log("Public Key:", publicKey.export({ type: "spki", format: "pem" }));
  console.log("Private Key:", privateKey.export({ type: "pkcs8", format: "pem" }));

  const msg = Buffer.from('secret').toString('hex')
  // ✍️ Sign message
  const signature = sign(null, msg, privateKey);

  console.log("Signature (hex):", (signature).toString("hex"));

  // ✅ Verify signature
  // const isValid = verify(null, msg, publicKey, signature);
  const isValid = verify(null, msg, publicKey, signature);

  console.log("Valid:", isValid);
});

