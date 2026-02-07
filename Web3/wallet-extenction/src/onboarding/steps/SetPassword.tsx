import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { finishOnboarding } from "@/background/actions"
import { useOnboardingStore, type OnboardingState } from "@/store/onboarding"

export default function SetPassword() {
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const mnemonic = useOnboardingStore(
    (state: OnboardingState) => state.mnemonic
  )
  const wallets = useOnboardingStore(
    (state: OnboardingState) => state.selectedWallets
  )

  const finish = async () => {
    if (isSubmitting) return
    setError(null)

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }
    if (password !== confirm) {
      setError("Passwords do not match")
      return
    }

    setIsSubmitting(true)
    try {
      const phrase = mnemonic.join(" ")
      await finishOnboarding({
        mnemonic: phrase,
        password,
        wallets
      })
      window.close()
    } catch (e) {
      setError((e as Error).message || "Failed to finish onboarding")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Secure Your Wallet</h2>

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Confirm Password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button className="w-full" onClick={finish}>
        {isSubmitting ? "Saving..." : "Finish Setup"}
      </Button>
    </div>
  )
}

