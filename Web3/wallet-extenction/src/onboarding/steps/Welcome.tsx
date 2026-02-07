import { Button } from "@/components/ui/button"
import { useOnboardingStore, type OnboardingState } from "@/store/onboarding"

export default function Welcome() {
  const go = useOnboardingStore((state: OnboardingState) => state.go)

  return (
    <div className="space-y-6 text-center">
      <h1 className="text-3xl font-bold">Welcome</h1>
      <p className="text-muted-foreground">
        Create a new wallet or import an existing one
      </p>

      <Button className="w-full" onClick={() => go("create")}>
        Create New Wallet
      </Button>

      <Button variant="outline" className="w-full" onClick={() => go("import")}>
        Import Wallet
      </Button>
    </div>
  )
}

