import { Label } from '@/components/ui/label'

export function FormLabel(props: React.ComponentProps<typeof Label>) {
  return (
    <Label
      {...props}
      className={`block text-sm font-medium text-gray-700 mb-1 ${props.className ?? ''}`}
    />
  )
}
