import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { WordCount } from "../../types/wallet.ts"

type Props = {
  onSubmit: (mnemonic: string[], count: WordCount) => void
}

export default function ImportWallet({ onSubmit }: Props) {
  const [count, setCount] = useState<WordCount>(12)
  const [words, setWords] = useState<string[]>(Array(12).fill(""))

  const switchCount = (c: WordCount) => {
    setCount(c)
    setWords(Array(c).fill(""))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Import Wallet</h2>

      <div className="flex gap-2">
        {[12, 24].map((c) => (
          <Button
            key={c}
            variant={count === c ? "default" : "outline"}
            onClick={() => switchCount(c as WordCount)}
          >
            {c} words
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {words.map((_, i) => (
          <Input
            key={i}
            placeholder={`${i + 1}`}
            onChange={(e) => {
              const next = [...words]
              next[i] = e.target.value.trim()
              setWords(next)
            }}
          />
        ))}
      </div>

      <Button
        className="w-full"
        onClick={() => onSubmit(words, count)}
      >
        Continue
      </Button>
    </div>
  )
}

