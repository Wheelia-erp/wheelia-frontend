'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UserFormValidator } from '@/app/validators/UserFormValidator';
import { fluentResolver } from '@/lib/fluent-resolver';

export type UserFormValues = {
  name: string;
  email: string;
  phone?: string;
  password?: string;
};

interface UserFormProps {
  defaultValues?: Partial<UserFormValues>;
  onSubmit: (data: UserFormValues) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

export function UserForm({ defaultValues, onSubmit, onCancel, loading }: UserFormProps) {
  const form = useForm<UserFormValues>({
    resolver: fluentResolver<UserFormValues>(new UserFormValidator()),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      ...defaultValues,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="border border-gray-200 rounded-md p-4 bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Informações Gerais</h2>

        <div className="grid grid-cols-1 gap-4">
          {/* Nome */}
          <div>
            <Label htmlFor="name" className="block mb-1">Nome</Label>
            <Input id="name" {...register('name')} />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="block mb-1">E-mail</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
          </div>

          {/* Telefone */}
          <div>
            <Label htmlFor="phone" className="block mb-1">Telefone</Label>
            <Input id="phone" type="tel" {...register('phone')} />
            {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
          </div>

          {/* Senha */}
          <div>
            <Label htmlFor="password" className="block mb-1">Senha</Label>
            <Input id="password" type="password" placeholder="••••••••" {...register('password')} />
          </div>
        </div>
      </div>

      {/* Ações */}
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
}
