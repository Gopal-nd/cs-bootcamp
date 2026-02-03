import { Button } from "@/components/ui/button"
import { requestNewMnemonic } from "../../background/actions"


type Props = {
  onGenerated: (mnemonic: string[]) => void
}

export default function CreateWallet({ onGenerated }: Props) {
  const generate = async () => {
    const mnemonic = await requestNewMnemonic()
    onGenerated(mnemonic.split(" "))
  }

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-xl font-semibold">Create Wallet</h2>
      <p className="text-muted-foreground">
        You will receive a secret recovery phrase
      </p>

      <Button className="w-full" onClick={generate}>
        Generate Secret Phrase
      </Button>
    </div>
  )
}

