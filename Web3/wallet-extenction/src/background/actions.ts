import type { WalletType, Account } from "../types/wallet.ts"

type SendMessageResult<T> = T & { error?: string }

function sendMessage<T>(message: object): Promise<T> {
  return new Promise((resolve, reject) => {
    const runtime = globalThis.chrome?.runtime
    const send = runtime?.sendMessage


    send(message, (res: SendMessageResult<T>) => {
      const lastError = runtime?.lastError
      if (lastError) {
        reject(new Error(lastError.message))
        return
      }
      if (!res) {
        reject(new Error("No response from background"))
      }
      if (typeof res === "object" && res && "error" in res && res.error) {
        reject(new Error(String(res.error)))
        return
      }
      resolve(res)
    })
  })
}

export function requestNewMnemonic(): Promise<string> {
  return sendMessage<{ mnemonic: string }>({ type: "CREATE_WALLET" }).then(
    (r) => r.mnemonic
  )
}

export function finishOnboarding(payload: {
  mnemonic: string
  password: string
  wallets: WalletType[]
}): Promise<{ success: boolean }> {
  return sendMessage<{ success: boolean }>({ type: "IMPORT_OR_FINISH", ...payload })
}


export function getAccounts(): Promise<{
  active: Account | null
  accounts: Account[]
}> {
  return sendMessage<{ active: Account | null; accounts: Account[] }>({
    type: "GET_ACCOUNTS"
  })
}

export function setActiveAccount(index: number): Promise<{ success: boolean }> {
  return sendMessage<{ success: boolean }>({ type: "SET_ACTIVE_ACCOUNT", index })
}

