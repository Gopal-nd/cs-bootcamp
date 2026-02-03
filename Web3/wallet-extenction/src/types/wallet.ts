export type WalletType = "solana" | "ethereum"

export type DerivedWallet = {
  publicKey: string
  privateKey: string
}

export type WalletBundle = Partial<
  Record<WalletType, DerivedWallet>
>

export type VaultData = {
  mnemonic: string
  index: number
  wallets: WalletBundle
}

export type EncryptedVault = {
  ciphertext: string
  iv: string
  salt: string
}


export type FlowStep =
  | "welcome"
  | "import"
  | "create"
  | "show-mnemonic"
  | "password"

export type WordCount = 12 | 24


export type OnboardingContext = {
  step: FlowStep
  mnemonic: string[]
  wordCount: WordCount
  selectedWallets: WalletType[]
}

