import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

function LandingPage() {

  return (
    <div className=" landigpage-contain">
      {/* <img src="img_snow_wide.jpg" alt="Snow" style="width:100%;" /> */}
      <img className=" container-fluid landing-page-img" style={{  width: "100vw !important", height:"100vh" }} src="Blockchain.gif"></img>
      {/* https://media.giphy.com/media/WwppaCOFTjQpKbY6oX/giphy.gif */}
     
      {/* <div class="centered">Tescrow is Trusted Escrow <span>A multi purpose Decentralized escrow protocol to facilitate peer to peer transactions between individuals and DAOs</span></div> */}
      <div className="landing-img" >



      </div>

    </div>
  )
}

export default LandingPage;
