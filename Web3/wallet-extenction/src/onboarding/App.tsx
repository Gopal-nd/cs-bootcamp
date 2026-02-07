import { useOnboardingStore, type OnboardingState } from "@/store/onboarding"

import Welcome from "./steps/Welcome"
import ImportWallet from "./steps/ImportWallet"
import CreateWallet from "./steps/CreateWallet"
import ShowMnemonic from "./steps/ShowMnemonic"
import SetPassword from "./steps/SetPassword"

export default function App() {
  const step = useOnboardingStore((state: OnboardingState) => state.step)

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-6">
        {step === "welcome" && <Welcome />}

        {step === "import" && <ImportWallet />}

        {step === "create" && <CreateWallet />}

        {step === "show-mnemonic" && <ShowMnemonic />}

        {step === "password" && <SetPassword />}
      </div>
    </div>
  )
}

