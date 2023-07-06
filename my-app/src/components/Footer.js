import React from "react";
import { BsDiscord, BsTwitter, AiFillFacebook } from "react-icons/bs";

export default function Footer() {
    return (
        <div className="footer-fix">
            <footer id="footer">
                <div className="text">
                Made with ❤️, to ensure ethical behaviour in decentralised peer to peer transactions for adoption of borderless Crypto economy.
                </div>

              <div className="connect-footer"  >
                <div className="d-flex" >
                    <a href="/" target="_blank" style={{ fontSize: "30px", color: "#488e72",marginInline:"20px" }}>
                        { <BsTwitter /> }
                    </a>
                    {/* <a href="/" target="_blank" style={{ fontSize: "30px", color: "blueviolet",marginInline:"20px" }}>
                        {<AiFillFacebook/> }
                    </a> */}
                    <a href="/" target="_blank" style={{ fontSize: "30px", color: "#488e72",marginInline:"20px" }}>
                        {<BsDiscord/> }
                    </a>
                </div>
            </div> 
            </footer>
        </div>
    );
}