import React from 'react'
import Header from '../Components/Header/Index'
import "/src/App.css";
import Signupsignin from '../Components/Header/Signupsignin/Sindex';

const Signup = () => {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <Signupsignin />
      </div>
    </div>
  )
}

export default Signup
