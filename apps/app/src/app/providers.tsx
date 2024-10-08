'use client';

import { PropsWithChildren } from 'react';

// import { RainbowKitProvider, getDefaultWallets, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { trustWallet, ledgerWallet } from '@rainbow-me/rainbowkit/wallets';
import { gnosis } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { WALLETCONNECT_PROJECT_ID } from 'constants/env';

import { safe, coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

export const wagmiCoreConfig = createConfig({
  connectors: [
    injected(),
    coinbaseWallet({
      appName: 'Gnosis Pay Rewards',
      chainId: gnosis.id,
    }),
    walletConnect({
      projectId: WALLETCONNECT_PROJECT_ID,
    }),
  ],
  chains: [gnosis],
  ssr: true,
  transports: {
    [gnosis.id]: http(),
  },
});

/*
const { wallets } = getDefaultWallets();
const config = getDefaultConfig({
  appName: 'Gnosis Pay Rewards',
  projectId: WALLETCONNECT_PROJECT_ID,
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [trustWallet, ledgerWallet],
    },
  ],
  chains: [gnosis],
  ssr: true,
});*/

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function Providers({ children }: PropsWithChildren) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <WagmiProvider config={wagmiCoreConfig}>
      <QueryClientProvider client={queryClient}>
        {/* <RainbowKitProvider>{children}</RainbowKitProvider> */}
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
