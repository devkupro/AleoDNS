import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import {
  Transaction,
  WalletAdapterNetwork,
  WalletNotConnectedError,
} from "@demox-labs/aleo-wallet-adapter-base";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BurnAlert({ open, setOpen,name }) {
  const handleClose = () => setOpen(false);
  const { publicKey, requestTransaction } = useWallet();

  const handleBurn = ()=>{
    if (!publicKey) throw new WalletNotConnectedError();
    const inputString = name;
    const asciiArray = [];

    for (let i = 0; i < inputString.length; i++) {
      const asciiValue = inputString.charCodeAt(i);
      asciiArray.push(asciiValue);
    }
    let nameInt = asciiArray.join("");
    const fee = 1000000; // This will fail if fee is not set high enough

    const inputs = [nameInt + "u128"];
    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.Testnet,
      "dns_esollabs_v5.aleo",
      "burn_dns",
      inputs,
      fee,
      false
    );
    if (requestTransaction) {
      // Returns a transaction Id, that can be used to check the status. Note this is not the on-chain transaction id
      const sendAleoToSmc = requestTransaction(aleoTransaction);
      sendAleoToSmc
        .then(async (tx) => {
          console.log(tx);
          setOpen(false);

        })
        .catch((err) => {
          setOpen(false);
          console.log(err);
        });
    }
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           
            <Typography
              id="modal-modal-title"
              color={"red"}
              variant="h6"
              component="h2"
              sx={{fontWeight:'500'}}
            >
              Are you sure to burn your dns ?
            </Typography>
            <Button
                onClick={handleBurn}
                sx={{ marginTop: "4%" }}
                fullWidth
                size="large"
                variant="contained"
                color="error"
              >
                Burn
              </Button>
        </Box>
      </Modal>
    </div>
  );
}
