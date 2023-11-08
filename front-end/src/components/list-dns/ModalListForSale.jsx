import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";

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

export default function ModalListForSale({ open, setOpen, name,pageMarketCheck =false }) {
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpen(false);
  const { publicKey, requestTransaction } = useWallet();

  const handleListForSale = () => {
    if (!publicKey) throw new WalletNotConnectedError();
    setLoading(true);
    const inputString = name;
    const asciiArray = [];

    for (let i = 0; i < inputString.length; i++) {
      const asciiValue = inputString.charCodeAt(i);
      asciiArray.push(asciiValue);
    }
    let nameInt = asciiArray.join("");

    const fee = 1000000; // This will fail if fee is not set high enough

    const inputs = [nameInt + "u128", price * fee+'u64'];
    console.log(inputs, "inputs");
    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.Testnet,
      "dns_esollabs_v5.aleo",
      "listing_dns",
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
          setLoading(false);

        })
        .catch((err) => {
          setOpen(false);
          setLoading(false);
          console.log(err);
        });
    }
  };

  const handleTransfer = ()=>{
    if (!publicKey) throw new WalletNotConnectedError();
    setLoading(true);
    const inputString = name;
    const asciiArray = [];

    for (let i = 0; i < inputString.length; i++) {
      const asciiValue = inputString.charCodeAt(i);
      asciiArray.push(asciiValue);
    }
    let nameInt = asciiArray.join("");

    const fee = 1000000; // This will fail if fee is not set high enough

    const inputs = [nameInt + "u128", address];
    console.log(inputs, "inputs");
    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.Testnet,
      "dns_esollabs_v5.aleo",
      "transfer_dns",
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
          setLoading(false);

        })
        .catch((err) => {
          setOpen(false);
          setLoading(false);
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
          {loading ? (
            <div className="spinner">
              <div className="dot1"></div>
              <div className="dot2"></div>
            </div>
          ) : (
              <>
              {pageMarketCheck?<>
              <TextField
                label="Address"
                value={address}
                fullWidth
                autoFocus
                required
                type="text"
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
              <Button
                onClick={handleTransfer}
                sx={{ marginTop: "4%" }}
                fullWidth
                size="large"
                variant="contained"
              >
                Transfer
              </Button>
            </>:
              <>
              <TextField
                label="Price"
                value={price}
                fullWidth
                autoFocus
                required
                type="number"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
              <Button
                onClick={handleListForSale}
                sx={{ marginTop: "4%" }}
                fullWidth
                size="large"
                variant="contained"
              >
                Accept
              </Button>
            </>
                }
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
