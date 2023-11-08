import React, { useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import "./style.css";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BasicList from "./BasicList";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import {
  Transaction,
  WalletAdapterNetwork,
  WalletNotConnectedError,
} from "@demox-labs/aleo-wallet-adapter-base";
import ModalListForSale from "./ModalListForSale";


function DNSItem({ img,row }) {
  const [open, setOpen] = React.useState(false);
  const [openForSale, setOpenForSale] = React.useState(false);
  const [pageMarketCheck, setPageMarketCheck] = React.useState(false);
  
  const handleOpenForSale = () => setOpenForSale(true);

  return (
    <Card
    onMouseLeave={() => setOpen(false)}
      className="dns-img-item"
      sx={{ maxWidth: '320px', borderRadius: "20px",margin:'0 2%',marginBottom:'2%',height:'286px' }}
      style={{ position: "relative" }}
    >
      <CardActionArea>
        <div style={{ margin: "16px" }}>
          <CardMedia
            component="img"
            height="240"
            image={row.imgUrl}
            alt="green iguana"
            sx={{ borderRadius: "20px" }}
          />
        </div>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-24px",
          }}
        >

          <h2 className="title">
            <span className="title-word title-word-1">{row.name}</span>
            <span className="title-word title-word-2">.</span>
            <span className="title-word title-word-3">aleo</span>
          </h2>
        </CardContent>
      </CardActionArea>
      <div
        style={{ position: "relative", display:'flex' }}
        className="btn-list-dns"
      >
        <ModalListForSale open={openForSale} setOpen={setOpenForSale} name={row.name} pageMarketCheck={pageMarketCheck} />
        <Button
          // onMouseOver={() => setOpen(true)}
          fullWidth
          variant="contained"
          // endIcon={<MoreVertIcon />}
          sx={{height:'50px',
          borderRadius:'0px 0 0 20px'
        }}
        onClick={handleOpenForSale}
        >
          List for sale
        </Button>
        <MoreVertIcon
        onClick={() => setOpen(!open)}
         sx={{backgroundColor:'#1976d2',height:'50px',fontSize:'30px',color:'white',borderLeft:'1px solid white'}}/>
        <BasicList open={open} setOpenList={setOpenForSale} openList={openForSale} setPageMarketCheck={setPageMarketCheck} name={row.name} />
      </div>
    </Card>
  );
}

export default DNSItem;
