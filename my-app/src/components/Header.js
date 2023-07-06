import React, { useEffect, useState } from "react";
// import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Stack, Box } from "@mui/material";
// import { BookContext } from "../Context/BookContext";
import Avatar from 'react-avatar';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Dropdown from 'react-bootstrap/Dropdown';
// import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import NavbarB from "./Navbar";


function Header() {
  const notify = () => toast("You are logged in!");
  const [loading, setLoading] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [value, setValue] = useState();


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;






  const refresh = () => {
    // re-renders the component
    setValue({});
  }





  return (


    <AppBar color="inherit" position="fixed" sx={{ height: "70px" }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography  >
          <Link to="/">
            <img src="tescrow2.png" alt="tescrow-logo.png" style={{
              height: '45px',
              borderRadius: '10px'
            }} />
          </Link>
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'end', marginTop: "8px" }}>

          <NavbarB />

        </div>
      </Toolbar>
    </AppBar >

  )
}

export default Header;