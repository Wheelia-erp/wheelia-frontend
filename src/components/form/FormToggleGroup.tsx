import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

interface FormToggleGroupProps<TFieldValues extends FieldValues = FieldValues> {
  field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>>;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

export function FormToggleGroup<TFieldValues extends FieldValues = FieldValues>({
  field,
  options,
  disabled,
}: FormToggleGroupProps<TFieldValues>) {
  return (
    <ToggleGroup
      type="single"
      value={field.value}
      onValueChange={(value) => field.onChange(value)}
      disabled={disabled}
      className="w-full"
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className="flex-1 data-[state=on]:bg-blue-600 data-[state=on]:text-white"
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
