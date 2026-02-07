import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Account, EncryptedVault } from "@/types/wallet"
import { decryptVault } from "@/lib/crypto"
import { getAccounts } from "@/background/actions"
import { storageGet, storageSet } from "@/lib/chromeStorage"

const POPUP_W = 360
const POPUP_H = 600
const LOCK_AFTER_MS = 10 * 60 * 1000

type View = "loading" | "needsOnboarding" | "locked" | "ready"

function shortAddr(addr: string) {
  if (!addr) return ""
  if (addr.length <= 12) return addr
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`
}

async function openOnboardingTab() {
  await chrome.tabs.create({
    url: chrome.runtime.getURL("onboarding.html")
  })
}

export default function Popup() {
  const [view, setView] = useState<View>("loading")
  const [active, setActive] = useState<Account | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [unlockPassword, setUnlockPassword] = useState("")
  const [unlockError, setUnlockError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const activeAccountName = useMemo(() => {
    if (!active) return "Account 1"
    return active.name
  }, [active])

  const selectedAddress = active?.publicKey ?? ""

  const boot = async () => {
    const { hasOnboarded, lastUnlockedAt } = await storageGet<{
      hasOnboarded?: boolean
      lastUnlockedAt?: number
    }>(["hasOnboarded", "lastUnlockedAt"])

    if (!hasOnboarded) {
      setView("needsOnboarding")
      return
    }

    const last = typeof lastUnlockedAt === "number" ? lastUnlockedAt : 0
    const isLocked = Date.now() - last > LOCK_AFTER_MS

    try {
      const res = await getAccounts()
      setActive(res.active)
    } catch {
      // if accounts can't be fetched, still allow unlock UI
    }

    setView(isLocked ? "locked" : "ready")
  }

  useEffect(() => {
    void boot()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (view !== "ready") return
    setDropdownOpen(false)
  }, [view])

  const copy = async (text: string) => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopied(text)
    window.setTimeout(() => setCopied(null), 900)
  }

  const unlock = async () => {
    setUnlockError(null)
    const { vault } = await storageGet<{ vault?: EncryptedVault }>("vault")
    if (!vault) {
      setUnlockError("Vault not found. Please re-onboard.")
      return
    }

    try {
      await decryptVault(vault, unlockPassword)
      await storageSet({ lastUnlockedAt: Date.now() })
      setUnlockPassword("")
      const res = await getAccounts()
      setActive(res.active)
      setView("ready")
    } catch {
      setUnlockError("Wrong password")
    }
  }

  if (view === "loading") {
    return (
      <div
        className="bg-background text-foreground flex items-center justify-center"
        style={{ width: POPUP_W, height: POPUP_H }}
      >
        <div className="text-sm text-muted-foreground">Loading…</div>
      </div>
    )
  }

  if (view === "needsOnboarding") {
    return (
      <div
        className="bg-background text-foreground p-4 flex"
        style={{ width: POPUP_W, height: POPUP_H }}
      >
        <div className="w-full rounded-2xl border bg-card p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold">
              ₿
            </div>
            <div>
              <div className="font-semibold">Cryptex</div>
              <div className="text-xs text-muted-foreground">
                Securely manage your crypto assets
              </div>
            </div>
          </div>

          <div className="mt-2 space-y-2">
            <Button className="w-full" onClick={() => void openOnboardingTab()}>
              Open Onboarding
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-auto">
            Your keys never leave this device.
          </p>
        </div>
      </div>
    )
  }

  if (view === "locked") {
    return (
      <div
        className="bg-background text-foreground p-4 flex"
        style={{ width: POPUP_W, height: POPUP_H }}
      >
        <div className="w-full rounded-2xl border bg-card p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Unlock</div>
              <div className="text-xs text-muted-foreground">
                Enter your password to continue
              </div>
            </div>
            <div className="text-xs text-muted-foreground">10 min lock</div>
          </div>

          <Input
            type="password"
            placeholder="Password"
            value={unlockPassword}
            onChange={(e) => setUnlockPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void unlock()
            }}
          />

          {unlockError && (
            <div className="text-sm text-red-500">{unlockError}</div>
          )}

          <Button className="w-full" onClick={() => void unlock()}>
            Unlock
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => void openOnboardingTab()}
          >
            Open Onboarding
          </Button>

          <p className="text-xs text-muted-foreground mt-auto">
            Tip: you’ll be asked again if you open the popup after 10 minutes.
          </p>
        </div>
      </div>
    )
  }

  // READY
  return (
    <div
      className="bg-background text-foreground p-3"
      style={{ width: POPUP_W, height: POPUP_H }}
      onClick={() => setDropdownOpen(false)}
    >
      <div className="w-full h-full rounded-2xl border bg-card shadow-sm overflow-hidden">
        {/* Top navbar */}
        <div className="p-3 border-b bg-card/60 backdrop-blur flex items-center justify-between">
          <button
            className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-accent"
            onClick={(e) => {
              e.stopPropagation()
              setDropdownOpen((v) => !v)
            }}
          >
            <div className="font-semibold text-sm">{activeAccountName}</div>
            <div className="text-xs text-muted-foreground">▾</div>
          </button>

          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-violet-500" />
            <div className="text-sm">Solana</div>
          </div>
        </div>

        {/* Dropdown (account) */}
        {dropdownOpen && (
          <div
            className="absolute z-50 mt-2 w-[330px] rounded-xl border bg-popover shadow-lg p-2"
            style={{ left: 15, top: 52 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-2 py-1 text-xs text-muted-foreground">
              {activeAccountName}
            </div>

            <div className="mt-1 space-y-1">
              <button
                className="w-full flex items-center justify-between gap-3 rounded-lg px-2 py-2 hover:bg-accent bg-accent"
                onClick={() => setDropdownOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-violet-500 opacity-90" />
                  <div className="text-left">
                    <div className="text-sm font-medium">Solana</div>
                    <div className="text-xs text-muted-foreground">
                      {shortAddr(selectedAddress)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {copied === selectedAddress ? (
                    <div className="text-xs text-muted-foreground">Copied</div>
                  ) : (
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        void copy(selectedAddress)
                      }}
                    >
                      Copy
                    </Button>
                  )}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="p-4 space-y-4">
          <div className="rounded-xl border p-4">
            <div className="text-xs text-muted-foreground">Selected address</div>
            <div className="mt-1 flex items-center justify-between gap-2">
              <div className="font-mono text-sm">{shortAddr(selectedAddress)}</div>
              <Button
                size="xs"
                variant="outline"
                onClick={() => void copy(selectedAddress)}
              >
                {copied === selectedAddress ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full">
              Send
            </Button>
            <Button variant="outline" className="w-full">
              Receive
            </Button>
            <Button variant="outline" className="w-full">
              Swap
            </Button>
            <Button className="w-full">Buy</Button>
          </div>

          <div className="rounded-xl border p-4 text-xs text-muted-foreground">
            You’ll be asked for your password again if you open the popup after 10
            minutes.
          </div>
        </div>
      </div>
    </div>
  )
}

