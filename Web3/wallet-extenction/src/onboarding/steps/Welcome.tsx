import { Button } from "@/components/ui/button"

type Props = {
  onCreate: () => void
  onImport: () => void
}

export default function Welcome({ onCreate, onImport }: Props) {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-3xl font-bold">Welcome</h1>
      <p className="text-muted-foreground">
        Create a new wallet or import an existing one
      </p>

      <Button className="w-full" onClick={onCreate}>
        Create New Wallet
      </Button>

      <Button variant="outline" className="w-full" onClick={onImport}>
        Import Wallet
      </Button>
    </div>
  )
}

