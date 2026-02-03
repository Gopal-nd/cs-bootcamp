import { generateNewMnemonic, deriveWallets } from "../lib/wallet"
import { encryptVault } from "../lib/crypto"
import type { WalletType } from "@/types/wallet"



chrome.runtime.onInstalled.addListener(async (details) => {

  if (details.reason !== "install") return
  const { hasOnboarded } = await chrome.storage.local.get("hasOnboarded")

  if (!hasOnboarded) {
    chrome.tabs.create({
      url: chrome.runtime.getURL("onboarding.html")
    })
  }
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

