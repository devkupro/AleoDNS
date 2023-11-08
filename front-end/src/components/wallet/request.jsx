import { WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import Button from "@mui/material/Button";

export const RequestRecords = () => {
  const { publicKey, requestRecords } = useWallet();

  const onClick = async () => {
    const program = "dns_esollabs_v5.aleo";
    if (!publicKey) throw new WalletNotConnectedError();
    if (requestRecords) {
      const records = await requestRecords(program);
      console.log("Records: " + records);
    }
  };

  return (
    <Button
      className=" p-2 m-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      onClick={onClick}
      disabled={!publicKey}
    >
      Request Records
    </Button>
  );
};
