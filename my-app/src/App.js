
import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
// import UploadForm from './components/UploadForm';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ethers, Contract, providers, Signer } from 'ethers';
import { ESCROW_CONTRACT_ADDRESS, ESCROW_ABI } from './constants';
import Web3Modal from "web3modal";
import HomeCategory from './components/Home/Home';
import FreelanceEscrow from './Escrows/FreelanceEscrow';
import Auction from './Escrows/Auction';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Navbar/> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ecommerceescrow" element={<FreelanceEscrow />
        } />
        <Route path="/datadaoescrow" element={<Auction />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
