import React, { useEffect, useRef, useState } from 'react';
import Web3Modal from "web3modal";
import { ethers, Contract, providers, Signer } from 'ethers';
import { AUCTION_ESCROW_CONTRACT_ADDRESS, AUCTION_ESCROW_ABI, TESCROW_DEVS_NFT_CONTRACT_ADDRESS, TESCROW_DEVS_ABI } from "../constants";
import '../../src/escrow.css';
import { Card, CardContent, Box, Button, Checkbox, FormControlLabel, Accordion, AccordionSummary, CircularProgress, Grid, AccordionDetails, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'


import moment from 'moment'
import { object } from 'prop-types';

const useStyles = makeStyles({
    table: {
        width: "auto",
        margin: "auto"
    }
});

function createData(number, item, qty, price) {
    return { number, item, qty, price };
}
export default function Auction() {
    const [title, setTitle] = useState();
    const [clientAddress, setClientAddress] = useState();
    console.log(clientAddress);
    const [everyAuction, setEveryAuction] = useState([]);
    const [StartAuction, setStartAuction] = useState();
    const [auctionEndTime, setAuctionEndTime] = useState();
    const [highestbid, sethighestBid] = useState();
    const [bid, setBid] = useState();
    // console.log(auctionEndTime);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const [msp, setMsp] = useState(0);
    const [totalNumOfAuctions, setTotalNumOfAuctions] = useState(0);
    const web3ModalRef = useRef();
    const [open, setOpen] = React.useState(false);
    const [openbid, setOpenbid] = React.useState(false);
    const [provider, setProvider] = React.useState(null);
    const [signer, setSigner] = React.useState(null);


    async function getSignerFromProvider() {
        if (typeof window !== "undefined" && window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);
            const signer = provider.getSigner();
            setSigner(signer);
        } else {
            console.log('No wallet connected or logged out');
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpenbid = () => {
        setOpenbid(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClosebid = () => {
        setOpenbid(false);
    };
    const [walletConnected, setWalletConnected] = useState(false);

    const getProviderOrSigner = async (needSigner = false) => {

        const provider = await web3ModalRef?.current?.connect();
        const web3Provider = new providers.Web3Provider(provider);
        // console.log((await userAddress).toLowerCase())
        const signerForUserAddress = await web3Provider.getSigner();
        const clientAddress = await signerForUserAddress.getAddress();
        setClientAddress(clientAddress);
        const { chainId } = await web3Provider.getNetwork();
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
    // console.log('clientAddress:', clientAddress,); 
    const connectWallet = async () => {
        try {
            await getProviderOrSigner();
            setWalletConnected(true);
        } catch (error) {
            console.log(error);
        }
    }


    const createAuction = async () => {
        // Validate inputs
        console.log(clientAddress);
        if (clientAddress == null || title == null || msp == null) {
            alert('Please enter all required fields.');
            return;
        }
        const signer = await getProviderOrSigner(true);
        const escroContract = getAuctionContractInstance(signer);
        // console.log('clientAddress:', clientAddress);
        // Send the transaction to create the escrow agreement
        const tx = await escroContract.createAuctionContract(clientAddress, title, { value: ethers.utils.parseEther(msp) });
        // console.log('tx====', tx);
        setLoading(true)
        await tx.wait();
        fetchAllAuctions()

        // setAuctionId('');
        setMsp(0)
        setLoading(false);
        alert('Auction  created successfully.');
        alert('MSP  deposited successfully.');
    }
    const startAuction = async (_id) => {
        console.log('_id----', _id);
        const signer = await getProviderOrSigner(true);
        const auctionContract = getAuctionContractInstance(signer);
        const tx = await auctionContract.startAuction(_id, auctionEndTime);
        await tx.wait();
        fetchAllAuctions()

        alert('Auction  Started!!');
    }
    function getReadableTime(mili) {
        if (mili > 0) {
            let date = new Date(mili * 1000);
            let time = date.toLocaleString();
            return time;
        } else {
            return null;
        }
    }
    async function getUinxTime(time) {
        console.log();
        // e.preventDefault();
        let timestamp = await moment(time, "HH:mm").unix();
        // console.log(timestamp)
        setAuctionEndTime(timestamp);
    }


    function ParsedAgreement(_agreeId, _owner, _title, _msp, _starttime, _endtime, _highestBidder, _highestBid, _auctionend, _allBidders, _allBid) {
        this.agreeId = _agreeId;
        this.owner = _owner;
        this.title = _title;
        this.msp = _msp;
        this.starttime = getReadableTime(_starttime);
        this.endtime = getReadableTime(_endtime);
        this.highestBidder = _highestBidder;
        this.highestBid = _highestBid;
        this.auctionEnd = _auctionend;
        this.allBidders = _allBidders;
        this.allBid = _allBid;

    }
    useEffect(() => {
        // const sig = getSignerFromProvider();
        // console.log(sig);
        getTotalNumOfAuction();

        if (totalNumOfAuctions > 0) {
            fetchAllAuctions()
        }
    }, [totalNumOfAuctions])
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
    const fetchAuctionById = async (id) => {
        // console.log('erntered fetch by id', id);
        try {
            const provider = await getProviderOrSigner();
            const escroContract = getAuctionContractInstance(provider);
            let auction = await escroContract.auctions(id);
            let allbiders = await escroContract.getBidders(id);

            let allBidsAndBiddersArr = [];
            for (let i = 0; i < allbiders.length; i++) {
                let bid = await escroContract.getBids(id, allbiders[i]);
                allBidsAndBiddersArr.push({ [allbiders[i]]: bid.toNumber() / 1000000000000000000 })

            }
            const actn = new ParsedAgreement(id, auction.owner, auction.title,
                auction.msp.toNumber(), auction.auctionStartTime.toNumber(), auction.auctionEndTime.toNumber(), auction.highestBidder, auction.highestBid.toNumber() / 1000000000000000000, auction.auctionEnd, allbiders, allBidsAndBiddersArr)
            console.log('actn--', actn);
            return actn;

        } catch (error) {
            console.log(error);
        };
    }

    const publicMint = async () => {
        setLoading(true);
        try {
            const signer = await getProviderOrSigner(true);
            const nftContract = new Contract(
                TESCROW_DEVS_NFT_CONTRACT_ADDRESS,
                TESCROW_DEVS_ABI,
                signer
            );
            console.log(nftContract);
            // call the presaleMint from the contract, only whitelisted addresses would be able to mint
            const txn = await nftContract.mint({
                value: ethers.utils.parseEther("0.001"),
            });
            await txn.wait();
            window.alert("You successfully minted... TescrowDevNFT!!")
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };




    const fetchAllAuctions = async () => {
        try {
            const allAuctions = [];
            for (let i = 0; i < totalNumOfAuctions; i++) {
                const auction = await fetchAuctionById(i);
                console.log('auction..', auction);
                allAuctions.push(auction);
            }
            // console.log(allAuctions);
            setEveryAuction(allAuctions);
        } catch (error) {
            console.log(error);
        }
    }
    const getAuctionContractInstance = (providerOrSigner) => {
        return new Contract(
            AUCTION_ESCROW_CONTRACT_ADDRESS,
            AUCTION_ESCROW_ABI,
            providerOrSigner
        );
    };
    const getTotalNumOfAuction = async () => {
        try {
            const provider = await getProviderOrSigner();
            const escroContract = getAuctionContractInstance(provider);
            let agreement = await escroContract.numOfAuction();
            setTotalNumOfAuctions(agreement.toNumber())     
        } catch (error) {
            console.error(error);
        }
    }
    // console.log(StartAuction, '--StartAuction');
    const makeAbid = async (id) => {
        const signer = await getProviderOrSigner(true);
        const escroContract = getAuctionContractInstance(signer);
        let tx = await escroContract.bid(id, { value: ethers.utils.parseEther(bid) });

        setLoading(true);
        await tx.wait();
        fetchAllAuctions()

        alert('You have made a Bid');
        setLoading(false)

    }

    const ReleaseFunds = async (id) => {

        const signer = await getProviderOrSigner(true);
        const escroContract = getAuctionContractInstance(signer);
        let tx = await escroContract.releaseFunds(id);

        setLoading(true);
        await tx.wait();
        fetchAllAuctions()

        alert('Relese Funds successfully!!!!');
        setLoading(false)
    }

    const GetBidders = async (id) => {
        const signer = await getProviderOrSigner(true);
        const escroContract = getAuctionContractInstance(signer);
        let tx = await escroContract.getBidders(id);

        setLoading(true);
        await tx.wait();

        alert('GetBidders....!!!');
        setLoading(false)
    }
    function truncate(str, max, sep) {
        max = max || 15; var len = str?.length; if (len > max) { sep = sep || "..."; var seplen = sep?.length; if (seplen > max) { return str.substr(len - max) } var n = -0.5 * (max - len - seplen); var center = len / 2; return str.substr(0, center - n) + sep + str.substr(len - center + n); } return str;
    }

    function renderMakeBid(a) {
        alert("calleddd")
        if (a.auctionEnd && a.owner == clientAddress) {
            return (
                <Button onClick={() => ReleaseFunds(a?.agreeId)} >Relese Fund</Button>

            )
        } else if (a.auctionEnd && a.owner !== clientAddress) {
            return (
                <Button>Ended!</Button>

            )

        } else if (a.auctionEnd === false) {
            return (
                <Button onClick={() => makeAbid(a?.agreeId)} >Make Bid</Button>

            )
        } else {
            return null;
        }
    }
    const classes = useStyles();

    return (


        <>
            {/* ---------- Create Auction Form ---------------- */}
            <div className="main">
                <div style={{ textAlign: "center" }}>

                    <p className='auction-client'><small>Logedin  user : <strong style={{ color: "gray" }}>{(truncate(clientAddress))}</strong>
                    </small></p>
                </div>

                <div className="createAgreement section--mid">
                    <div className="section-container section--small createAgreement-form--container ">

                        <form className="agreement-form">
                            <div >
                                <div style={{ marginLeft: "11px" }} className="createAgreement-title">Create Auction</div>
                                <hr className="MuiDivider-root MuiDivider-fullWidth css-39bbo6"></hr>

                                <div className="m-3">
                                    <TextField className="textfield" fullWidth label="Auction Title" id="fullWidth" variant="standard"
                                        onChange={(e) => { setTitle(e.target.value) }} />
                                </div>



                                <div className="row">

                                    <div className="col m-3">
                                        <FormControl style={{ marginTop: "-15px" }} variant="standard" sx={{ m: 1, minWidth: 120 }} fullWidth>
                                            <InputLabel id="demo-simple-select-standard-label">Currency</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                            >
                                                <MenuItem value="eth">ETH</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>

                                    <div className="col m-3">
                                        <TextField style={{ marginTop: "-15px" }} className="textfield" fullWidth label="MSP" type="number" id="fullWidth" variant="standard"
                                            onChange={(e) => { setMsp(e.target.value) }} />
                                    </div>


                                </div>


                                <div>
                                    <center>
                                        {loading ?
                                            <Button style={{ cursor: 'none' }}
                                                className="submit-success-btn-onclick" variant="contained"
                                            >
                                                <CircularProgress style={{ color: 'white', }} />
                                            </Button> :
                                            <Button className="submit-success-btn"
                                                onClick={createAuction}

                                                variant="contained"
                                            // onClick={createAgreement}
                                            >
                                                Create
                                            </Button>
                                        }
                                    </center>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <h1 className='myagreement-title' style={{ textAlign: 'center' }}>My Auction </h1>
            <div>
                {/* <CenteredTable /> */}


                <TableContainer component={Paper} style={{ marginBottom: "10vh" }}>
                    <Table aria-label="simple table" className={classes.table}>
                        <TableHead style={{ backgroundColor: "lightgray", fontWeight: "5px", fontSize: "122px" }}>
                            <TableRow >
                                <TableCell>Owner</TableCell>
                                <TableCell>Title</TableCell>

                                <TableCell align="right">MSP</TableCell>
                                <TableCell align="right">Start-Time</TableCell>
                                <TableCell align="right">End-Time</TableCell>
                                <TableCell align="right">Highest Bidder & Bid</TableCell>

                                <TableCell align="right">
                                    Make Bid
                                </TableCell>
                                <TableCell align="right">Fund</TableCell>
                                <TableCell align="right">All Bids</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {everyAuction.map((a) => (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {(a?.owner?.slice(0, 5))} </TableCell>
                                    <TableCell component="th" scope="row">
                                        {(a?.title)} </TableCell>
                                    <TableCell component="th" scope="row">
                                        {(a?.msp) / 1000000000000000000} ETH                                    </TableCell>


                                    <TableCell align="right">
                                        {
                                            null != a?.starttime ? <strong>{a?.starttime}</strong> :
                                                <div><Button className="providerstake-success-btn " variant=""
                                                    onClick={() => startAuction(a?.agreeId)}  >   Start Auction</Button>
                                                </div>
                                        }
                                    </TableCell>

                                    <TableCell component="th" scope="row">
                                        {
                                            null != a.endtime ? <strong>{a?.endtime}</strong> :
                                                <div className='row'>
                                                    <div className='col-4'><lable style={{ margin: " 11px 5px 0px -11px" }} className='agreement-buyer-stake '>Set End Time :</lable></div>
                                                    <div className='col-8'> <input className='time-standard'
                                                        type="time"
                                                        onChange={(e) =>
                                                            getUinxTime(e.target.value)
                                                        }
                                                    />
                                                    </div>
                                                </div>
                                        }
                                    </TableCell>

                                    <TableCell align="right">
                                        {
                                            a.highestBid != 0 ? <div>
                                                <strong style={{ color: "gray" }}>{(truncate(a.highestBidder))}</strong>
                                                :<span>
                                                    <strong style={{ color: "red" }}> {(a.highestBid)} ETH</strong>
                                                </span>

                                            </div> : ""
                                        }

                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="outlined" onClick={handleClickOpen}>
                                            Make Bid
                                        </Button>
                                        <Dialog open={open} onClose={handleClose}>
                                            <DialogTitle>Make Bid</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    Only NFT holders can participate in this Auction.
                                                </DialogContentText>
                                                <TextField
                                                    onChange={(e) => { setBid(e.target.value) }}
                                                    autoFocus
                                                    margin="dense"
                                                    id="name"
                                                    label="Enter Bid amount"
                                                    type="email"
                                                    fullWidth
                                                    variant="standard"
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={publicMint}>Buy NFT🚀</Button>
                                                <Button onClick={() => makeAbid(a?.agreeId)} >Make Bid</Button>
                                                <Button onClick={handleClose}>Cancel</Button>

                                            </DialogActions>
                                        </Dialog>

                                    </TableCell>
                                    <TableCell>
                                        {
                                            // a.auctionEnd ? <div> {
                                            clientAddress === a.owner ?
                                                <>
                                                    <div>
                                                        <Button size='small' className="providerstake-success-btn " variant="outlined" onClick={() => ReleaseFunds(a?.agreeId)}  >   Release Fund</Button>
                                                    </div>

                                                </> : "Not an Owner"


                                            // }
                                            // </div> 
                                            // : ""
                                        }
                                    </TableCell>

                                    {
                                        a.allBid.length === 0 ?
                                            <p style={{ marginTop: "17px" }}>No Bids yet</p>
                                            :
                                            <TableCell align="right">
                                                <Button variant="outlined" onClick={handleClickOpenbid}>
                                                    See All Bids
                                                </Button>
                                                <Dialog open={openbid} onClose={handleClosebid}>
                                                    <DialogTitle>All Bids and Bidders</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText>
                                                            <ul>
                                                                {
                                                                    a.allBid.map((b) => (
                                                                        <li>
                                                                            {
                                                                                Object.entries(b).map(([key, value]) => (
                                                                                    <p className='col-12' style={{ fontSize: "16px" }}><small>{key} : <strong style={{ color: "GrayText" }}>{value}</strong></small></p>
                                                                                ))
                                                                            }
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </DialogContentText>

                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={handleClose}>Cancel</Button>
                                                    </DialogActions>
                                                </Dialog>

                                            </TableCell>
                                    }


                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>

            </div>

            {error && <p>{error}</p>}
        </>
    )
}



