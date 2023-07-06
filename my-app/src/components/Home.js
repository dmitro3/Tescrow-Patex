import React from "react";
import LandingPage from "./LandingPage/LandingPage";
import HomeCategory from "./LandingPage/HomeCategory";
// import Sliders from "./Sliders/Sliders";
import Buildfor from "./Buildfor";
import Buildfor1 from './Buildfor.js'
function Home() {
    return (
        <>
            <div className="homeLending">
                <LandingPage></LandingPage>
            </div>
            <HomeCategory></HomeCategory>
            <Buildfor />
        </>
    )
}
export default Home;