import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Typography } from "@mui/material";
import "../list-dns/style.css";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AleoLogo from '../../assets/square-aleo.png'
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import {
  Transaction,
  WalletAdapterNetwork,
  WalletNotConnectedError,
} from "@demox-labs/aleo-wallet-adapter-base";
function MarketplaceItem({ img, row }) {
  const [open, setOpen] = React.useState(false);
  const address = row.owner_domain
  const { publicKey, requestTransaction } = useWallet();

  const converAscii =(name)=>{
    console.log(name,'name: '+name);
    const serverNameInt = name.split('u')[0]
        const numberString = serverNameInt.toString();
        const digitArray = numberString.split("").map(Number);
        const groupedArray = [];

        for (let i = 0; i < digitArray.length; i++) {
          if (digitArray[i] > 2) {
            groupedArray.push(digitArray[i] * 10 + digitArray[i + 1]);
            i++; // Skip the next digit
          } else {
            groupedArray.push(
              digitArray[i] * 100 + digitArray[i + 1] * 10 + digitArray[i + 2]
            );
            i += 2; // Skip the next two digits
          }
        }
        const textAscii = groupedArray
          .map((charCode) => String.fromCharCode(charCode))
          .join("");

          return textAscii
  }


  const handleBuy = ()=>{
    if (!publicKey) throw new WalletNotConnectedError();
   
    const fee = 1000000; // This will fail if fee is not set high enough

    const inputs = [row.dns_name, address ,row.price+'u64'];
    console.log(inputs, "inputs");
    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.Testnet,
      "dns_esollabs_v5.aleo",
      "transfer_dns_on_market",
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
    <Card
      onMouseLeave={() => setOpen(false)}
      className="dns-img-item"
      sx={{
        maxWidth: "320px",
        borderRadius: "20px",
        margin: "0 2%",
        marginBottom: "2%",
        height:'355px'
      }}
      style={{ position: "relative" }}
    >
      <CardActionArea>
        <div style={{ margin: "16px" }}>
          <CardMedia
            component="img"
            height="240"
            image={img}
            alt="green iguana"
            sx={{ borderRadius: "20px" }}
          />
        </div>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-24px",
            flexDirection:'column',
            alignItems:'center',
          }}
        >
          <h2 className="title">
            <span className="title-word title-word-1">{converAscii(row.dns_name)}</span>
            <span className="title-word title-word-2">.</span>
            <span className="title-word title-word-3">aleo</span>
          </h2>
          <div className="w-[100%] flex justify-around">
            <div className="flex flex-col justify-start items-start">
              <Typography sx={{color:'#696060'}}>Price</Typography>
              <Typography variant="caption" sx={{fontSize:'24px',fontWeight:'600'}}>{row.price/1000000} 
              <CardMedia
              component="img"
              // height="50px"
              // width="50px"
              image={AleoLogo}
              alt="Aleo"
              sx={{ display:'inline-block',width:'24%',paddingBottom:'6px' }}
            />
              </Typography>
            </div>
            <div className="flex flex-col justify-start items-start">
              <Typography sx={{color:'#696060'}}>Owner</Typography>
              <Typography variant="caption" sx={{fontSize:'24px',fontWeight:'600'}}>{`${address.slice(0, 4)}...${address.slice(-4)}`}</Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
      <div className="2131232">
        <Button
          // onMouseOver={() => setOpen(true)}
          onClick={handleBuy}
          fullWidth
          variant="contained"
          endIcon={<ShoppingCartIcon />}
          sx={{ height: "50px", borderRadius: "0px 0 0 20px" }}
        >
          Buy Now
        </Button>
      </div>
    </Card>
  );
}

export default MarketplaceItem;
