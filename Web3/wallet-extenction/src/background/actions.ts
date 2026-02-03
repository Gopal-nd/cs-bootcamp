import type { WalletType } from "../types/wallet.ts"

export function requestNewMnemonic(): Promise<string> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      { type: "CREATE_WALLET" },
      (res: { mnemonic: string }) => resolve(res.mnemonic)
    )
  })
}

export function finishOnboarding(payload: {
  mnemonic: string
  password: string
  wallets: WalletType[]
}): Promise<{ success: boolean }> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      { type: "IMPORT_OR_FINISH", ...payload },
      resolve
    )
  })
}

