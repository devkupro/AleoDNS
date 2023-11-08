import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SellIcon from "@mui/icons-material/Sell";
import SendIcon from "@mui/icons-material/Send";
import { Typography } from "@mui/material";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import BurnAlert from "./BurnAlert";
import { useState } from "react";

export default function BasicList({ open,setOpenList, openList,setPageMarketCheck,name }) {
  const handleTransferModal =()=>{
    setPageMarketCheck(true);
    setOpenList(true);
  }
  const [openBurn, setOpenBurn] = useState(false)
  return (
    <>
      {open && (
        <div
          style={{
            position: "absolute",
            width: "80%",
            maxWidth: 360,
            background: "white",
            bottom: 60,
            right: 0,
            borderRadius: "20px",
            boxShadow: "rgb(0 0 0 / 20%) 0px 7px 29px 0px",
          }}
        >
        
          <BurnAlert open={openBurn} setOpen={setOpenBurn} name={name}/>
          <nav aria-label="main mailbox folders">

            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleTransferModal}>
                  <ListItemIcon>
                    <SendIcon sx={{ color: "black" }} />
                  </ListItemIcon>
                  <Typography
                    variant="caption"
                    sx={{ color: "black", fontSize: "20px" }}
                  >
                    Transfer
                  </Typography>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={()=>setOpenBurn(true)}>
                  <ListItemIcon>
                    <LocalFireDepartmentIcon sx={{ color: "black" }} />
                  </ListItemIcon>
                  <Typography
                    variant="caption"
                    sx={{ color: "black", fontSize: "20px" }}
                  >
                    Burn
                  </Typography>
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </div>
      )}
    </>
  );
}
