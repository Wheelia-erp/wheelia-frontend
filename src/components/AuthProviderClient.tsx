'use client';

import { Auth0ProviderWithNavigate } from '@/auth/Auth0ProviderWithNavigate';

export default function AuthProviderClient({ children }: { children: React.ReactNode }) {
  return <Auth0ProviderWithNavigate>{children}</Auth0ProviderWithNavigate>;
}
