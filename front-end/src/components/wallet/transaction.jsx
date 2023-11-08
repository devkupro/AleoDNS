import {
    Transaction,
    WalletAdapterNetwork,
    WalletNotConnectedError
  } from "@demox-labs/aleo-wallet-adapter-base";
  import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
  import React, { useCallback } from "react";
  
  export const RequestTransaction= () => {
    const { publicKey, requestTransaction } = useWallet();
  
    const onClick = async () => {
      if (!publicKey) throw new WalletNotConnectedError();
  
      // The record here is an output from the Requesting Records above
      const record = `'{"id":"0f27d86a-1026-4980-9816-bcdce7569aa4","program_id":"credits.aleo","microcredits":"200000","spent":false,"data":{}}'`
      // Note that the inputs must be formatted in the same order as the Aleo program function expects, otherwise it will fail
      const inputs = 1223// [JSON.parse(record), "aleo1kf3dgrz9...", `${amount}u64`];
      const fee = 35_000; // This will fail if fee is not set high enough
  
      const aleoTransaction = Transaction.createTransaction(
        publicKey,
        WalletAdapterNetwork.Testnet,
        'credits.aleo',
        'transfer',
        inputs,
        fee
      );
  
      if (requestTransaction) {
        // Returns a transaction Id, that can be used to check the status. Note this is not the on-chain transaction id
        await requestTransaction(aleoTransaction);
      }
    };
  
    return (
      <button onClick={onClick} disabled={!publicKey}>
        Request Transaction
      </button>
    );
  };