import { useEffect, useMemo } from "react";
import {
  WalletProvider,
  useWallet,
} from "@demox-labs/aleo-wallet-adapter-react";
import {
  WalletConnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";

// Default styles that can be overridden by your app
import "@demox-labs/aleo-wallet-adapter-reactui/styles.css";
import { SignMessage } from "./signin";

export const Wallet = () => {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "Leo Demo App",
      }),
    ],
    []
  );

  return (
    <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.Localnet}
      localStorageKey="wallets"
      autoConnect
    >
      <WalletModalProvider>
        <WalletMultiButton />
        <SignMessage />
      </WalletModalProvider>
    </WalletProvider>
  );
};
