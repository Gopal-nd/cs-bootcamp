import "./shims"
import { generateNewMnemonic, deriveWallets } from "../lib/wallet"
import { encryptVault } from "../lib/crypto"
import type { WalletType } from "@/types/wallet"

async function openOnboardingIfNeeded() {
  const { hasOnboarded } = await chrome.storage.local.get("hasOnboarded")

  if (!hasOnboarded) {
    chrome.tabs.create({
      url: chrome.runtime.getURL("onboarding.html")
    })
  }
}

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason !== "install") return
  await openOnboardingIfNeeded()
})

chrome.runtime.onStartup.addListener(() => {
  // Fallback: if user was never onboarded, show onboarding on browser startup
  void openOnboardingIfNeeded()
})

chrome.action.onClicked.addListener(() => {
  // If the user clicks the toolbar icon and is not onboarded yet, open onboarding
  void openOnboardingIfNeeded()
})

chrome.runtime.onMessage.addListener((msg, _s, sendResponse) => {
  if (msg.type === "CREATE_WALLET") {
    const mnemonic = generateNewMnemonic()
    sendResponse({ mnemonic })
  }

  if (msg.type === "IMPORT_OR_FINISH") {
    const { mnemonic, password, wallets } = msg as {
      mnemonic: string
      password: string
      wallets: WalletType[]
    }

    const derived = deriveWallets(mnemonic, 0, wallets)

    encryptVault(
      JSON.stringify({ mnemonic, wallets: derived, index: 0 }),
      password
    ).then(async (vault) => {
      await chrome.storage.local.set({
        vault,
        hasOnboarded: true
      })

      sendResponse({ success: true })
    })

    return true
  }
})

type StoredAccount = {
  index: number
  solana: string
  ethereum: string
}

const state = {
  mnemonic: '',
  activeIndex: 0,
  accounts: [] as StoredAccount[]
}

chrome.runtime.onMessage.addListener((msg, _s, sendResponse) => {
  if (msg.type === "GET_ACCOUNTS") {
    const formatted = state.accounts.map((a) => ({
      index: a.index,
      name: `Account ${a.index + 1}`,
      chain: "solana",
      publicKey: a.solana
    }))

    sendResponse({
      active: formatted[state.activeIndex],
      accounts: formatted
    })
  }

  if (msg.type === "CREATE_ACCOUNT") {
    const index = state.accounts.length
    const wallets = deriveWallets(
      state.mnemonic,
      index,
      ["solana", "ethereum"]
    )

    const account = {
      index,
      solana: wallets.solana!.publicKey,
      ethereum: wallets.ethereum!.publicKey
    }

    state.accounts.push(account)
    state.activeIndex = index

    sendResponse({
      index,
      name: `Account ${index + 1}`,
      chain: msg.chain,
      publicKey:
        msg.chain === "solana"
          ? account.solana
          : account.ethereum
    })
  }

  if (msg.type === "SET_ACTIVE_ACCOUNT") {
    state.activeIndex = msg.index
  }

  return true
})

