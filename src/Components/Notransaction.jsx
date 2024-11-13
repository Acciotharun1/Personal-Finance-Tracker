import React from 'react'
import tranimg from "../assets/transactions.svg";
const Notransaction = () => {
  return (
    <div
      style={{
        display:"flex",
        justifycontent:"center",
        alignItems:"center",
        width:"100%",
        flexDirection:'column',
        marginBottom:"2rem",
      }}
    >  

      <img src={tranimg} style={{width:"400px", margin:"4rem"}} />
      <p style={{textAlign:'center', fontSize:"1.2rem"}}>
        You have no transactions currently
      </p>
    </div>
  )
}

export default Notransaction;
