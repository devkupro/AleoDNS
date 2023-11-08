import React from 'react'
import InputItem from '../components/input-dns/InputItem'
import Atom from '../components/effect/Atom'
import TableDns from '../components/list-dns/TableDns'
// import '../components/effect/style.css'
function Check() {
  return (
    <>
    <div className="flex justify-between items-center p-[10%]  gap-[8%] z-1000000000000">

      <div className="basis-2/3">
        <InputItem checkPage={true} />
      </div>
      <a href='https://aleo.org/' target='_blank' rel='noreferrer'>

    <Atom/>
      </a>
    </div>
  </>
  )
}

export default Check