import React from "react";
import { Link } from "react-router-dom";
function HomeCategory() {
    return (

        <>
            <div>
                <div>
                    {/* <h2 className="browse-stories ">Browse Category</h2> */}
                    <div class="h1 text-center text-dark" id="pageHeaderTitle">Browse Category</div>
                    {/* <p style={{ borderBottom: "3px solid #6EBF8B", width: "21%", textAlign: "center", margin: "10px auto 15px" }}></p> */}

                </div>

                <div className="homeCategory1">
                    <div className=" container mainCategory">

                        <div className="grid row">

                            <div className="col" style={{ height: "260px" }}>

                                <div className="profile-card-2"><img src="datadao.png" className="img img-responsive" />
                                    <Link to="datadaoescrow">
                                        <div className="profile-name">Storage deal Auction </div> </Link>
                                </div>
                            </div>


                            <div className="col" style={{ height: "260px" }}>

                                <div className="profile-card-2"><img src="ecomerce.jpeg" className="img img-responsive" />
                                    <Link to="ecommerceescrow">
                                        <div className="profile-name">eCommerce marketplace Escrow</div> </Link>
                                </div>
                            </div>
                            <div className="col" style={{ height: "260px" }}>

                                <div className="profile-card-2"><img src="p2ppayment.png" />
                                    <Link to="lottery">
                                        <div className="profile-name">P2P Payment Escrow</div> </Link>
                                </div>
                            </div>

                        </div>
                        {/* <div className="grid row">
                            <div className="profile-card-2"><img src="crypto SCAMS.jpg" className="img img-responsive" />
                                <Link to="mystery">
                                    <div className="profile-name">CRYOTO SCAMS</div> </Link>
                            </div>

                            <div className="col" style={{ height: "260px" }}>

                                <div className="profile-card-2"><img src="ITO.jpeg" className="img img-responsive" />
                                    <Link to="romance">
                                        <div className="profile-name">HARDWARE AND IOT</div> </Link>
                                </div>
                            </div>
                            <div className="col" style={{ height: "260px" }}>

                                <div className="profile-card-2"><img src="FUNCTIONAL.png" />
                                    <Link to="historical">
                                        <div className="profile-name">FUNCTIONAL ISSUES</div> </Link>
                                </div>
                            </div>

                        </div> */}

                    </div>

                </div>
            </div>
            {/* </div> */}
            {/* </div> */}

        </>
    )
}

export default HomeCategory;



// import React from "react";
// import '/node_modules/bootstrap/dist/css/bootstrap.css';

// import { FaAdn, FaBitcoin, FaChrome } from "react-icons/fa";
// import { Outlet, Link } from "react-router-dom";


// // import '../homi/home.css';
// function HomeCategory() {
//     return (

//         <>
//             <div>
//                 <div>
//                     <h2 className="browse-stories ">Browse Category</h2>
//                     <p style={{ borderBottom: "3px solid #6EBF8B", width: "21%", textAlign: "center", margin: "10px auto 15px" }}></p>

//                 </div>
//             </div>
//             <div class="container">
//                 <main class="grid row">
//                     {/* <Link to="/escrow1" > */}
//                     <article className="forbg1 col">

//                         <Link className="linkstyle" to="/escrow1">
//                             <h1 className="fonticon">
//                                 <img src="UXUI.png" />
//                                 {/* <FaAdn /> */}
//                             </h1>
//                             <div class="text">
//                                 <h3>Escrow 1</h3>


//                             </div>
//                         </Link>
//                     </article>
//                     {/* </Link> */}

//                     <article className="forbg2 col" >
//                         <Link className="linkstyle" to="/escrow2">
//                             <h1 className="fonticon"> <FaBitcoin className="icon2" /></h1>
//                             <div class="text">
//                                 <h3>Escrow 2</h3>
//                             </div>
//                         </Link>
//                     </article>
//                     <article className="forbg3 col ">
//                         <Link className="linkstyle" to="/escrow3">
//                             <h1 className="fonticon"> <FaChrome /></h1>
//                             <div class="text">
//                                 <h3>Escrow 3</h3>
//                             </div>
//                         </Link>
//                     </article>




//                     <div className="grid row">
//                         <article className="forbg4 col">
//                             <Link className="linkstyle" to="/escrow4">
//                                 <h1 className="fonticon"> <FaAdn /></h1>
//                                 <div class="text">
//                                     <h3>Escrow 4</h3>
//                                 </div>
//                             </Link>
//                         </article>
//                         <article className="forbg5 col">
//                             <Link className="linkstyle" to="/escrow5">
//                                 <h1 className="fonticon"> <FaAdn /></h1>
//                                 <div class="text">
//                                     <h3>Escrow 5</h3>
//                                 </div>
//                             </Link>
//                         </article>
//                         <article className="forbg6 col">
//                             <Link className="linkstyle" to="/escrow6">
//                                 <h1 className="fonticon"> <FaAdn /></h1>
//                                 <div class="text">
//                                     <h3>Escrow 6</h3>
//                                 </div>
//                             </Link>
//                         </article>
//                     </div>

//                 </main>
//             </div>


//         </>
//     )
// }

// export default HomeCategory;