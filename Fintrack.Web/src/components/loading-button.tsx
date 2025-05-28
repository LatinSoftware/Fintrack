import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"

interface Props {
  text?: string
}
export function LoadingButton({ text = 'Please wait' }: Props) {
  return (
    <Button disabled>
      <Loader2 className="animate-spin" />
      {text}
    </Button>
  )
}
