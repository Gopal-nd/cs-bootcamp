import { generateMnemonic, mnemonicToSeedSync } from "bip39"
import { derivePath } from "ed25519-hd-key"
import { Keypair } from "@solana/web3.js"
import nacl from "tweetnacl"
import bs58 from "bs58"

import type { WalletBundle, WalletType } from "@/types/wallet"

export function generateNewMnemonic(): string {
  return generateMnemonic()
}

export function deriveWallets(
  mnemonic: string,
  index: number,
  selected: WalletType[]
): WalletBundle {
  const seed = mnemonicToSeedSync(mnemonic)
  const wallets: WalletBundle = {}

  if (selected.includes("solana")) {
    const path = `m/44'/501'/${index}'/0'`
    const derived = derivePath(path, seed.toString("hex")).key
    const keypair = nacl.sign.keyPair.fromSeed(derived)
    wallets.solana = {
      publicKey: Keypair.fromSecretKey(keypair.secretKey).publicKey.toBase58(),
      privateKey: bs58.encode(keypair.secretKey)
    }
  }

  return wallets
}

