import { Button } from "@/components/ui/button"

export default function Onboarding() {
  const finish = async () => {
    await chrome.storage.local.set({ hasOnboarded: true })
    window.close()
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-bold">Welcome to Solana Wallet</h1>
        <p>Create or import your wallet to continue</p>

        <Button onClick={finish} className="w-full">
          Get Started
        </Button>
      </div>
    </div>
  )
}

