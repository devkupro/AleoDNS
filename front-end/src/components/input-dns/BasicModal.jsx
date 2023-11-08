import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Fingerprint from "@mui/icons-material/Fingerprint";
import { AleoWorker } from "../../workers/AleoWorker";
import { SignMessage } from "../wallet/signin";
import {
  Transaction,
  WalletAdapterNetwork,
  WalletNotConnectedError,
} from "@demox-labs/aleo-wallet-adapter-base";
import { AuthContext } from "../../context/AuthProvider";
const style = {
  position: "absolute",
  top: "50%",
  left: "40%",
  transform: "tgetServerNameack",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: "500px",
  height: "250px",
  backgroundColor: "rgb(31 41 55 )",
  borderRadius: "25px",
};
import Aleo1 from '../../assets/1.jpg'
import Aleo2 from '../../assets/2.jpg'
import Aleo3 from '../../assets/3.jpg'
import Aleo4 from '../../assets/4.jpg'
import Aleo5 from '../../assets/5.jpg'
const aleoWorker = AleoWorker();
export default function BasicModal({ text, open, setOpen }) {
  const imgArr =[
    Aleo1,Aleo2,Aleo3,Aleo4,Aleo5
  ]
  const [loading, setLoading] = React.useState(true);
  const [existed, setExisted] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);
  const { publicKey, requestTransaction } = useWallet();
  const { listServerExisted } = React.useContext(AuthContext);

  const getServerName = () => {
    
        let lengthList = listServerExisted.length;
        for (let index = 0; index < lengthList; index++) {
          console.log(text,'text')
          if (listServerExisted[index].name === text) {
            setExisted(true);
            setSubmit(true)
            break;
          }
          setExisted(false);
          setSubmit(false)
        }
        setLoading(false);
     
  };

  React.useEffect(() => {
    getServerName();
  }, [open]);
  const handleClose = () => setOpen(false);
  async function execute() {
    if (!publicKey) throw new WalletNotConnectedError();
    setSubmit(true);
    const inputString = text.toLowerCase()
    const asciiArray = [];

    for (let i = 0; i < inputString.length; i++) {
      const asciiValue = inputString.charCodeAt(i);
      asciiArray.push(asciiValue);
    }
    let serverNameInt = asciiArray.join("");

    const fee = 1000000; // This will fail if fee is not set high enough
    // Note that the inputs must be formatted in the same order as the Aleo program function expects, otherwise it will fail
    let inputs = ["aleo19zmcxx429s2xx2ng9cu9f5fmf8dfe0s4fga3ultr3ftx0v362q8q4tr4pe", `${6*fee}u64`];
    const aleoTransactionCredit = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.Testnet,
      'credits.aleo',
      'transfer_public',
      inputs,
      4 * fee,
      false
    );

     inputs =  [ serverNameInt+'u128' ];
    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.Testnet,
      'dns_esollabs_v5.aleo',
      'mint_domain',
      inputs,
      fee,
      false
    );

    if (requestTransaction) {
      // Returns a transaction Id, that can be used to check the status. Note this is not the on-chain transaction id
      const sendAleoToSmc = requestTransaction(aleoTransactionCredit);
      sendAleoToSmc.then(async (tx) => {
        console.log(tx);
        const txid = await requestTransaction(aleoTransaction);
        console.log(txid);
        setOpen(false)
        setSubmit(false)
      }).catch((err) => {
        console.log(err);
        setOpen(false)
        setSubmit(false)
      })
      setLoading(true);
    }
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

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
            <div className="flex justify-evenly flex-col gap-6">
              <Typography
                id="modal-modal-title"
                sx={{ marginTop: "12px" }}
                variant="h6"
                component="h2"
              >
                {existed
                  ? `${text}.aleo is existed`
                  : `${text}.aleo is available`}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                ------------------------------------------------------------------------------
              </Typography>
              {publicKey ? (
                <>
                  <Button
                    disabled={submit}
                    onClick={execute}
                    variant="contained"
                    color="success"
                  >
                    Register{" "}
                    <Fingerprint sx={{ paddingLeft: "4px", height: "40px" }} />
                  </Button>
                </>
              ) : (
                <Typography variant="h5" color="error">
                  Please connect your wallet first
                </Typography>
              )}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
