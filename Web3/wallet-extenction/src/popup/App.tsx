import { Button } from "@/components/ui/button"

export default function Popup() {


  return (
    <div className="w-[360px] h-[600px] bg-gradient-to-b from-zinc-900 to-black text-white flex items-center justify-center p-4">
      <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl p-6 flex flex-col items-center gap-6">

        {/* Logo */}
        <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold text-xl">
          ₿
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-xl font-semibold">Welcome to Cryptex</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Securely manage your crypto assets
          </p>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col gap-3 mt-4">
          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black">
            Create New Wallet
          </Button>

          <Button
            variant="outline"
            className="w-full border-zinc-700 text-white hover:bg-zinc-800"
          >
            Import Existing Wallet
          </Button>
        </div>

        {/* Footer */}
        <p className="text-xs text-zinc-500 mt-auto text-center">
          🔒 Your keys never leave this device
        </p>
      </div>
    </div>
  )
}

