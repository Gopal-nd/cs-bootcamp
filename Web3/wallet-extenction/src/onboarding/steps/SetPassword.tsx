import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { WalletType } from "../../types/wallet"
import { finishOnboarding } from "../../background/actions"

type Props = {
  mnemonic: string[]
  wallets: WalletType[]
}

export default function SetPassword({ mnemonic, wallets }: Props) {
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState<string | null>(null)

  const finish = async () => {
    if (password !== confirm) {
      setError("Passwords do not match")
      return
    }

    await finishOnboarding({
      mnemonic: mnemonic.join(" "),
      password,
      wallets
    })

    window.close()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Secure Your Wallet</h2>

      <Input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirm(e.target.value)}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button className="w-full" onClick={finish}>
        Finish Setup
      </Button>
    </div>
  )
}

