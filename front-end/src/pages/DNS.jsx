import React, { useEffect } from 'react'
import DNSItem from '../components/list-dns/DNSItem'
import AleoImg2 from "../assets/leo.png";
import { AuthContext } from '../context/AuthProvider';

function DNS() {
  const { rows } = React.useContext(AuthContext);
  useEffect(()=>{
    
  },[])
  return (
    <div style={{display:'flex',justifyContent:'space-around',flexWrap:'wrap', gap:'2',marginTop:'4%'}}>
      {rows.map(row=>(
        <DNSItem key={row.name} img={AleoImg2} row={row}/>
      ))}
    </div>
  )
}

export default DNS  