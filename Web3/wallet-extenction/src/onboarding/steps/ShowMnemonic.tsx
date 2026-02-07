import { Button } from "@/components/ui/button"
import { useOnboardingStore, type OnboardingState } from "@/store/onboarding"

export default function ShowMnemonic() {
  const mnemonic = useOnboardingStore(
    (state: OnboardingState) => state.mnemonic
  )
  const go = useOnboardingStore((state: OnboardingState) => state.go)
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Secret Phrase</h2>

      <div className="grid grid-cols-3 gap-2 bg-muted p-4 rounded">
        {mnemonic.map((word: string, index: number) => (
          <div key={index} className="text-sm">
            {index + 1}. {word}
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={() =>
          navigator.clipboard.writeText(mnemonic.join(" "))
        }
      >
        Copy Phrase
      </Button>

      <Button className="w-full" onClick={() => go("password")}>
        I have saved it
      </Button>
    </div>
  )
}

