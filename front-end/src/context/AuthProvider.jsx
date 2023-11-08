import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";

import ParticlesEffect from "../components/effect/Particles";
import axios from "axios";
import Aleo1 from '../assets/1.jpg'
import Aleo2 from '../assets/2.jpg'
import Aleo3 from '../assets/3.jpg'
import Aleo4 from '../assets/4.jpg'
import Aleo5 from '../assets/5.jpg'
const imgArr =[
  Aleo1,Aleo2,Aleo3,Aleo4,Aleo5
]
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [listServerExisted, setListServerExisted] = useState([]);
  const { publicKey } = useWallet();


  const getServerName = async () => {
    const { data } = await axios.get(`http://127.0.0.1:8000/`);
    let arrServerName = data.data;
    for (let obj of arrServerName) {
      if (data.message !== "error") {
        const serverNameInt = obj.domain_name.split("u")[0];

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
        setListServerExisted((prevState) => {
          // Kiểm tra xem temp đã tồn tại trong prevState hay chưa
          const isTempInPrevState = prevState.some(
            (row) => row.name === `${textAscii}`
          );
          let randomNumber = Math.floor(Math.random() * 5);
          // Nếu temp không tồn tại, thêm nó vào prevState
          if (!isTempInPrevState) {
            let temp = {
              name: `${textAscii}`,
            };
            return [...prevState, temp];
          }

          // Nếu temp đã tồn tại, trả về prevState không thay đổi
          return prevState;
        });
        console.log(textAscii,'textAscii');
        if (obj.owner_domain === publicKey) {
          setRows((prevState) => {
            // Kiểm tra xem temp đã tồn tại trong prevState hay chưa
            const isTempInPrevState = prevState.some(
              (row) => row.name === `${textAscii}`
            );
            let randomNumber = Math.floor(Math.random() * 5);
            // Nếu temp không tồn tại, thêm nó vào prevState
            if (!isTempInPrevState) {
              let temp = {
                name: `${textAscii}`,
                imgUrl: imgArr[randomNumber],
              };
              return [...prevState, temp];
            }

            // Nếu temp đã tồn tại, trả về prevState không thay đổi
            return prevState;
          });
        }
      }
    }
  };
  useEffect(() => {
    getServerName();
    getMarketPlace()
  }, [publicKey]);

  const [listing, setListing] = useState([])
  const getMarketPlace = async ()=>{
    const { data } = await axios.get(`http://127.0.0.1:8000/marketplace`);
    if (data.message!=="error"){
      setListing(data.data)
    }
  }


  return (
    
    <AuthContext.Provider value={{ rows, setRows,listServerExisted,getServerName ,listing}}>
        {/* <div className="mb-1">
          <WalletProvider
            wallets={wallets}
            decryptPermission={DecryptPermission.UponRequest}
            network={WalletAdapterNetwork.Localnet}
            localStorageKey="wallets"
            autoConnect
          >
            <WalletModalProvider> */}
              <ParticlesEffect></ParticlesEffect>
              <Navbar />
              {children}
            {/* </WalletModalProvider>
          </WalletProvider>
        </div> */}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
