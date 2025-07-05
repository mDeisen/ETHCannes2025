'use client';

import { useHypergraphApp } from '@graphprotocol/hypergraph-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthenticateSuccessPage() {
  const { processConnectAuthSuccess } = useHypergraphApp();
  const router = useRouter();
  const searchParams = useSearchParams();

  const ciphertext = searchParams.get('ciphertext') || '';
  const nonce = searchParams.get('nonce') || '';

  useEffect(() => {
    if (ciphertext && nonce) {
      processConnectAuthSuccess({ storage: localStorage, ciphertext, nonce });
      router.replace('/');
    }
  }, [ciphertext, nonce, processConnectAuthSuccess, router]);

  return <div>Authenticating …</div>;
}