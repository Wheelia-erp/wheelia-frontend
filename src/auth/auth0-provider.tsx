'use client';

import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN!;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!;
  const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE!;
  const redirectUri = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
      }}
    >
      {children}
    </Auth0Provider>
  );
};
