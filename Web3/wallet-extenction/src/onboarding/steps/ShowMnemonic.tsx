import { Button } from "@/components/ui/button"

type Props = {
  mnemonic: string[]
  onContinue: () => void
}

export default function ShowMnemonic({ mnemonic, onContinue }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Secret Phrase</h2>

      <div className="grid grid-cols-3 gap-2 bg-muted p-4 rounded">
        {mnemonic.map((word, i) => (
          <div key={i} className="text-sm">
            {i + 1}. {word}
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

      <Button className="w-full" onClick={onContinue}>
        I have saved it
      </Button>
    </div>
  )
}

