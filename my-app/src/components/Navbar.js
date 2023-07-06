import React, { useEffect, useRef, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Web3Modal from "web3modal";
import { providers } from 'ethers';
import { ethers } from 'ethers'
import { Web3Provide } from 'ethers'



import { Avatar, Button, Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Popover from '@mui/material/Popover';
export default function NavbarB() {
    const [value, setValue] = React.useState();
    const web3ModalRef = useRef();
    const [walletConnected, setWalletConnected] = useState(false);
    const [clientAddress, setClientAddress] = useState();
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [anchorLogin, setAnchorLogin] = React.useState(null);
    const [openLogin, setOpenLogin] = React.useState(false);
    const theme = useTheme();
    const drawerWidth = 240;

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseLoginMenu = () => {
        setAnchorLogin(null);
    };


    // ----Fetch notification from EPNS ------ 

    // connect wallet

    const getProviderOrSigner = async (needSigner = false) => {
        const provider = await web3ModalRef.current.connect();
        const web3Provider = new providers.Web3Provider(provider);
        const signerForUserAddress = await web3Provider.getSigner();
        const clientAddress = await signerForUserAddress.getAddress();
        setClientAddress(clientAddress);
        const { chainId } = await web3Provider.getNetwork();
        console.log(chainId);
        if (chainId !== 471100) {
            window.alert("Please switch to the patex-sepolia network!");
            throw new Error("Please switch to the patex-sepolia network");
        }
        if (needSigner) {
            const signer = web3Provider.getSigner();
            return signer;
        }
        return web3Provider;
    }

    // connect wallet

    const connectWallet = async () => {
        try {
            await getProviderOrSigner();
            setWalletConnected(true);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!walletConnected) {
            web3ModalRef.current = new Web3Modal({
                network: "patex-sepolia",
                providerOptions: {},
                disableInjectedProvider: false,
            });
            connectWallet().then(async () => {
                "wallet connected"
            })
        }
    }, []);

    function truncate(str, max, sep) {
        max = max || 15; var len = str?.length; if (len > max) { sep = sep || "..."; var seplen = sep?.length; if (seplen > max) { return str.substr(len - max) } var n = -0.5 * (max - len - seplen); var center = len / 2; return str.substr(0, center - n) + sep + str.substr(len - center + n); } return str;
    }



    const disconnect = () => {
        console.log('disconnect....');
    }

    const shortAddress = (addr) =>
        addr.length > 10 && addr.startsWith('0x')
            ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
            : addr

    return (
        <div>
            <Box sx={{ flexGrow: 1 }} >
                <Toolbar>
                    <Drawer
                        sx={{
                            width: open && drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                            },
                        }}
                        variant="persistent"
                        anchor="left"
                        open={open}
                    >
                        <Divider />
                        <Divider />

                    </Drawer>
                    <Box sx={{ flexGrow: 1 }} />
                    {/* <NotificationsPopover /> */}
                    {
                        <Box sx={{ flexGrow: 0 }}>

                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {/* <MenuItem className='m-2'  > Profile </MenuItem> */}
                                {/* <MenuItem className='m-2'  >
                                    <ProfileCreation />
                                    </MenuItem> */}
                                <MenuItem className='m-2' onClick={disconnect} > Disconnect </MenuItem>
                            </Menu>
                        </Box>
                    }

                    <Box sx={{ flexGrow: 0 }}>
                        {   walletConnected ? 
                        // shortAddress(clientAddress) 
                        truncate(clientAddress)
                        : 

                            <Button
                                onClick={connectWallet}

                                className='m-2' style={{ background: '#488E72', color: 'white', textTransform: 'capitalize' }} >
                                Login
                            </Button>
                        }

                    </Box>

                </Toolbar>
            </Box>
        </div >
    );
}