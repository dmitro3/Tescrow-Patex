import React from 'react'
import { BsDiscord, BsTwitter, AiFillFacebook } from "react-icons/bs";


export default function Buildfor1() {
    return (
        <>
            <div className='buildformaindiv'>
                <div class="h1 text-center text-dark" id="pageHeaderTitle">Build for</div>
                <section className="service-categories text-xs-center">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-6">
                                <a>
                                    <div className="card service-card card-inverse">
                                        <div className="card-block">
                                            {/* <span className='iconfa' ><BsDiscord /></span> */}
                                            <h4 className="card-title">DAOs</h4>
                                            <div className='card-des'>
                                                Provides a secure platform for decentralized autonomous organizations (DAOs) to conduct peer to peer transactions with confidence. The protocol eliminates the need for intermediaries, allowing for seamless and trustless transactions within the DAO community.
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-6">
                                <a>
                                    <div className="card service-card card-inverse">
                                        <div className="card-block">
                                            {/* <span className='iconfa' ><BsDiscord /></span> */}
                                            <h4 className="card-title"> Companies</h4>
                                            <div className='card-des'>
                                            Offers companies a secure and efficient way to facilitate transactions between multiple parties. Our protocol eliminates the risk of fraud and reduces the cost of intermediaries, making it a cost-effective solution for companies looking to streamline their operations.
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className='secondrowbuildfor row'>
                            <div className="col-md-6">
                                <a>
                                    <div className="card service-card card-inverse">
                                        <div className="card-block">
                                            <h4 className="card-title">Storage Providers</h4>
                                            <div className='card-des'>
                                            Offers storage providers a secure platform to transact with their customers. The protocol ensures that the storage provider is paid only after the customer receives their data, reducing the risk of fraud and providing peace of mind to both parties.
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-6">
                                <a>
                                    <div className="card service-card card-inverse">
                                        <div className="card-block">

                                            <h4 className="card-title">Freelancers</h4>
                                            <div className='card-des'>
                                            Provides a secure platform for freelancers to transact with their clients, ensuring that payment is made only after the work is completed. The protocol eliminates the risk of fraud, ensuring that both parties are protected.
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                        </div>

                    </div>
                </section>
            </div>




        </>
    )
}
