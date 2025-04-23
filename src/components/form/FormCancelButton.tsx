import { Button } from '@/components/ui/button'

export function FormCancelButton(props: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="ghost"
      {...props}
      className={`bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl ${props.className ?? ''}`}
    />
  )
}
