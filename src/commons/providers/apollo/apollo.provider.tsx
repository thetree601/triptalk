"use client";

import { ApolloProvider } from '@apollo/client/react';
import { ReactNode } from 'react';
import { apolloClient } from '@/lib/apollo/client';

interface ApolloProviderWrapperProps {
  children: ReactNode;
}

export function ApolloProviderWrapper({ children }: ApolloProviderWrapperProps) {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
}
