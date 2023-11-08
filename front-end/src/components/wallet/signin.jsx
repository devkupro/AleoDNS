import { WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { useCallback } from "react";

export const SignMessage = () => {
  const { wallet, publicKey } = useWallet();

  const onClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    const message = "Sign to buy domain";

    const bytes = new TextEncoder().encode(message);
    const signatureBytes = await wallet?.adapter.signMessage(bytes);
    const signature = new TextDecoder().decode(signatureBytes);
    localStorage.setItem("signature", signature);
  }, [wallet, publicKey]);

  return (
    <button onClick={onClick} disabled={!publicKey}>
      Sign message
    </button>
  );
};
