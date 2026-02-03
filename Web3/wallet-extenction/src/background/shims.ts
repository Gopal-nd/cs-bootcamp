// Minimal shims for Node globals that some libraries expect,
// so the MV3 service worker can run in the browser environment.

import { Buffer } from "buffer"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g: any = globalThis as any

if (!g.process) {
  g.process = {
    env: {},
    version: "",
    nextTick: (cb: (...args: unknown[]) => void, ...args: unknown[]) =>
      queueMicrotask(() => cb(...args))
  }
}

if (!g.Buffer) {
  g.Buffer = Buffer
}

