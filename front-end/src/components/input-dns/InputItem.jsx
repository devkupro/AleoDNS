import React, { useState } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { FcSearch } from "react-icons/fc";
import Typography from "@mui/material/Typography";
import BasicModal from "./BasicModal";
import TableDns from "../list-dns/TableDns";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";

function InputItem({ checkPage = false }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [textCheck, setTextCheck] = useState("");
  const handleOpen = () => {
    if (text !== "") {
      setOpen(true);
    }
  };

  const handelTextCheck = (e) => {
    setTextCheck(e.target.value.trim());
  };
  const handelText = (e) => {
    setText(e.target.value.trim());
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleOpen();
    }
  };
  const handleKeyDownCheck = (event) => {
    if (event.key === "Enter") {
      
    }
  };
  const { publicKey, requestTransaction } = useWallet();

  return (
    <div className="flex justify-between flex-col gap-20">
      {!checkPage && <BasicModal text={text} open={open} setOpen={setOpen} />}
      <div>
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          {" "}
          {checkPage
            ? "Coming soon..."
            : `It's your name. Own it.`}
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle2" sx={{ fontSize: 24 }}>
          {checkPage
            ? "Own your identity in the digital world."
            : `Own your identity in the digital world.`}{" "}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontSize: 24 }}>
          {" "}
          {checkPage
            ? `Get started with a Web3 domain.`
            : `Get started with a Web3 domain.`}{" "}
        </Typography>
      </div>
      <div>
        {checkPage ? (
          <Input
            onChange={handelTextCheck}
            onKeyDown={handleKeyDownCheck}
            value={textCheck}
            size="lg"
            startDecorator={<FcSearch className="text-4xl" />}
            endDecorator={
              <Button  className="w-[150px]">
                Check
              </Button>
            }
            sx={{
              "--Input-minHeight": "100px",
              "--Input-decoratorChildHeight": "80px",
              marginBottom: "2%",
            }}
          ></Input>
        ) : (
          <Input
            onChange={handelText}
            onKeyDown={handleKeyDown}
            value={text}
            size="lg"
            startDecorator={<FcSearch className="text-4xl" />}
            endDecorator={
              <Button onClick={handleOpen} className="w-[150px]">
                Register
              </Button>
            }
            sx={{
              "--Input-minHeight": "100px",
              "--Input-decoratorChildHeight": "80px",
              marginBottom: "2%",
            }}
          ></Input>
        )}
        <Typography variant="subtitle2" sx={{ fontSize: 24 }}>
          {checkPage ? "" : "/.aleo"}{" "}
        </Typography>
        {checkPage && <TableDns />}
      </div>
    </div>
  );
}

export default InputItem;
