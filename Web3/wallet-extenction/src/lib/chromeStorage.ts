export function storageGet<T>(
  keys: string | string[] | Record<string, unknown> | null
): Promise<T> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys as any, (items) => {
      const err = chrome.runtime.lastError
      if (err) {
        reject(new Error(err.message))
        return
      }
      resolve(items as T)
    })
  })
}

export function storageSet(items: Record<string, unknown>): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(items, () => {
      const err = chrome.runtime.lastError
      if (err) {
        reject(new Error(err.message))
        return
      }
      resolve()
    })
  })
}

