// components/form/FormButton.tsx
import { Button } from '@/components/ui/button'

export function FormButton(props: React.ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      className={`bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow transition disabled:opacity-50 disabled:cursor-not-allowed ${props.className ?? ''}`}
    />
  )
}
