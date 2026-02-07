import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { WordCount } from "../../types/wallet"
import { useOnboardingStore, type OnboardingState } from "@/store/onboarding"

export default function ImportWallet() {
  const [count, setCount] = useState<WordCount>(12)
  const [words, setWords] = useState<string[]>(Array(12).fill(""))
  const setImported = useOnboardingStore(
    (state: OnboardingState) => state.setImported
  )

  const switchCount = (c: WordCount) => {
    setCount(c)
    setWords(Array(c).fill(""))
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text")
    const parts = text
      .trim()
      .split(/\s+/)
      .slice(0, count)

    if (parts.length > 1) {
      e.preventDefault()
      const next = Array(count).fill("")
      parts.forEach((word, i) => {
        next[i] = word.toLowerCase()
      })
      setWords(next)
    }
  }

  const handleChange = (i: number, value: string) => {
    const next = [...words]
    next[i] = value.trim().toLowerCase()
    setWords(next)
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
        {words.map((word, i) => (
          <Input
            key={i}
            value={word}
            placeholder={`${i + 1}`}
            onPaste={handlePaste}
            onChange={(e) => handleChange(i, e.target.value)}
          />
        ))}
      </div>

      <Button
        className="w-full"
        onClick={() => setImported(words, count)}
        disabled={words.some((w) => !w)}
      >
        Continue
      </Button>
    </div>
  )
}

