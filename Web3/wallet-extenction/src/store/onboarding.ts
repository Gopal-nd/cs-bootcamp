// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// types will be available after installing the package
import { create } from "zustand"
import type {
  FlowStep,
  OnboardingContext,
  WalletType,
  WordCount
} from "@/types/wallet"

export type OnboardingState = OnboardingContext & {
  go: (step: FlowStep) => void
  setImported: (mnemonic: string[], count: WordCount) => void
  setGenerated: (mnemonic: string[]) => void
  reset: () => void
}

const DEFAULT_WALLETS: WalletType[] = ["solana"]

const initial: OnboardingContext = {
  step: "welcome",
  mnemonic: [],
  wordCount: 12,
  selectedWallets: DEFAULT_WALLETS
}

export const useOnboardingStore = create<OnboardingState>((set: (fn: (prev: OnboardingState) => OnboardingState) => void) => ({
  ...initial,
  go: (step: FlowStep) =>
    set((prev: OnboardingState) => ({
      ...prev,
      step
    })),
  setImported: (mnemonic: string[], count: WordCount) =>
    set((prev: OnboardingState) => ({
      ...prev,
      mnemonic,
      wordCount: count,
      step: "password"
    })),
  setGenerated: (mnemonic: string[]) =>
    set((prev: OnboardingState) => ({
      ...prev,
      mnemonic,
      step: "show-mnemonic"
    })),
  reset: () =>
    set((prev: OnboardingState) => ({
      ...prev,
      ...initial
    }))
}))

