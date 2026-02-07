import "./shims"
import { generateNewMnemonic, deriveWallets } from "../lib/wallet"
import { encryptVault } from "../lib/crypto"
import type { WalletType } from "@/types/wallet"
import { storageGet, storageSet } from "@/lib/chromeStorage"

async function openOnboardingIfNeeded() {
  const { hasOnboarded } = await storageGet<{ hasOnboarded?: boolean }>(
    "hasOnboarded"
  )

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
  const type = msg?.type as string | undefined

  if (type === "CREATE_WALLET") {
    try {
      const mnemonic = generateNewMnemonic()
      sendResponse({ mnemonic })
    } catch (e) {
      sendResponse({ error: (e as Error).message })
    }
    return true
  }

  if (type === "IMPORT_OR_FINISH") {
    ;(async () => {
      try {
        const { mnemonic, password, wallets } = msg as {
          mnemonic: string
          password: string
          wallets: WalletType[]
        }

        const derived = deriveWallets(mnemonic, 0, wallets)
        const vault = await encryptVault(
          JSON.stringify({ mnemonic, wallets: derived, index: 0 }),
          password
        )

        // Store encrypted vault + minimal public metadata used by the popup UI
        await storageSet({
          vault,
          hasOnboarded: true,
          accounts: [
            {
              index: 0,
              solana: derived.solana?.publicKey ?? ""
            }
          ],
          activeAccountIndex: 0
        })

        sendResponse({ success: true })
      } catch (e) {
        sendResponse({ success: false, error: (e as Error).message })
      }
    })()

    return true
  }

  if (type === "GET_ACCOUNTS") {
    ;(async () => {
      try {
        const stored = await storageGet<{
          accounts?: Array<{ index: number; solana: string }>
          activeAccountIndex?: number
        }>(["accounts", "activeAccountIndex"])

        const accounts = stored.accounts ?? []
        const activeAccountIndex = stored.activeAccountIndex ?? 0
        const selected = accounts[activeAccountIndex] ?? accounts[0] ?? null

        if (!selected || !selected.solana) {
          sendResponse({ active: null, accounts: [] })
          return
        }

        const active = {
          index: selected.index,
          name: `Account ${selected.index + 1}`,
          publicKey: selected.solana
        }

        sendResponse({ active, accounts: [active] })
      } catch (e) {
        sendResponse({ error: (e as Error).message })
      }
    })()

    return true
  }

  if (type === "SET_ACTIVE_ACCOUNT") {
    ;(async () => {
      try {
        const { index } = msg as { index: number }
        await storageSet({ activeAccountIndex: index })
        sendResponse({ success: true })
      } catch (e) {
        sendResponse({ success: false, error: (e as Error).message })
      }
    })()
    return true
  }

  // Unknown message type
  return false
})

