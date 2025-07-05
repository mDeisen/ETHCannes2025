"use client";

import { useHypergraphApp } from '@graphprotocol/hypergraph-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect } from 'react';

const LoginRedirect: FC = () => {
  const { processConnectAuthSuccess } = useHypergraphApp();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [ ciphertext, nonce] = [searchParams.get("ciphertext"), searchParams.get("nonce")];

  useEffect(() => {
    if (ciphertext && nonce) {
      processConnectAuthSuccess({ storage: localStorage, ciphertext, nonce });
      router.replace('/');
    }
  }, [ciphertext, nonce, processConnectAuthSuccess, router]);

  return <div>Authenticating …</div>;
}

export default LoginRedirect;