import type { WalletType, Account, Chain } from "../types/wallet.ts"

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


export function getAccounts(): Promise<{
  active: Account
  accounts: Account[]
}> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      { type: "GET_ACCOUNTS" },
      resolve
    )
  })
}

export function createAccount(chain: Chain): Promise<Account> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      { type: "CREATE_ACCOUNT", chain },
      resolve
    )
  })
}

export function setActiveAccount(index: number) {
  chrome.runtime.sendMessage({
    type: "SET_ACTIVE_ACCOUNT",
    index
  })
}

