import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

// Connect to devnet
const connection = new Connection(clusterApiUrl("devnet"), "finalized");

// Your wallet (sender) — load from secret key
const sender = Keypair.fromSecretKey(Uint8Array.from([36, 99, 216, 223, 108, 63, 172, 182, 18, 146, 206, 8, 172, 14, 145, 82, 75, 17, 223, 87, 224, 214, 163, 40, 249, 4, 220, 99, 8, 231
  , 230, 183, 88, 100, 70, 50, 217, 96, 174, 160, 34, 53, 95, 55, 237, 189, 151, 79, 185, 167, 250, 54, 128, 116, 166, 78, 239, 167, 133, 114, 133, 28, 3, 176]));

// Recipient address
const recipient = new PublicKey("5g8vGHiTJMa9V7WHu6SLZwE9LbYP2zCpCujEa38vXRc6");

// Build the transaction
const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: recipient,
    lamports: 0.1 * LAMPORTS_PER_SOL,
  })
);

// Send and confirm
const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);
console.log("SOL Transfer signature:", signature);
