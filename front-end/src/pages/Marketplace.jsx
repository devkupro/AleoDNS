import React, { useEffect, useState } from 'react'
import MarketplaceItem from '../components/marketplace/MarketplaceItem'
import AleoImg2 from "../assets/leo.png";
import Aleo1 from '../assets/1.jpg'
import Aleo2 from '../assets/2.jpg'
import Aleo3 from '../assets/3.jpg'
import Aleo4 from '../assets/4.jpg'
import Aleo5 from '../assets/5.jpg'
import axios from "axios";
import { AuthContext } from '../context/AuthProvider';

function Marketplace() {
  const imgArr =[
    Aleo1,Aleo2,Aleo3,Aleo4,Aleo5
  ]
  let randomNumber = Math.floor(Math.random() * 5);

  const { listing } = React.useContext(AuthContext);



  return (
    <div style={{display:'flex',justifyContent:'space-around',flexWrap:'wrap', gap:'2',marginTop:'4%',background:'black',height:'100%'}}>
      {listing.map((row)=>(
        <MarketplaceItem  key={row.dns_name} img={imgArr[randomNumber]} row={row}/>
      ))}
    </div>
  )
}

export default Marketplace