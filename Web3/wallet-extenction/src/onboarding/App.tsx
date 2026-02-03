import { useState } from "react"
import type {
  FlowStep,
  OnboardingContext,
  WalletType
} from "../types/wallet.ts"

import Welcome from "./steps/Welcome"
import ImportWallet from "./steps/ImportWallet"
import CreateWallet from "./steps/CreateWallet"
import ShowMnemonic from "./steps/ShowMnemonic"
import SetPassword from "./steps/SetPassword"

const DEFAULT_WALLETS: WalletType[] = ["solana"]

export default function App() {
  const [state, setState] = useState<OnboardingContext>({
    step: "welcome",
    mnemonic: [],
    wordCount: 12,
    selectedWallets: DEFAULT_WALLETS
  })

  const go = (step: FlowStep) =>
    setState((s) => ({ ...s, step }))

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-6">
        {state.step === "welcome" && (
          <Welcome
            onCreate={() => go("create")}
            onImport={() => go("import")}
          />
        )}

        {state.step === "import" && (
          <ImportWallet
            onSubmit={(mnemonic, wordCount) =>
              setState((s) => ({
                ...s,
                mnemonic,
                wordCount,
                step: "password"
              }))
            }
          />
        )}

        {state.step === "create" && (
          <CreateWallet
            onGenerated={(mnemonic) =>
              setState((s) => ({
                ...s,
                mnemonic,
                step: "show-mnemonic"
              }))
            }
          />
        )}

        {state.step === "show-mnemonic" && (
          <ShowMnemonic
            mnemonic={state.mnemonic}
            onContinue={() => go("password")}
          />
        )}

        {state.step === "password" && (
          <SetPassword
            mnemonic={state.mnemonic}
            wallets={state.selectedWallets}
          />
        )}
      </div>
    </div>
  )
}

