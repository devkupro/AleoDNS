import React from 'react'
import './atom.scss'
import aleoAvatar from '../../assets/aleoAvatar.png'
function Atom() {
  return (
    <main>
    <div className="atom">
		<img className ="img-atom" src={aleoAvatar} />
        <div className="electron"></div>
        <div className="electron-alpha"></div>
        <div className="electron-omega"></div>
    </div>
</main>
  )
}

export default Atom