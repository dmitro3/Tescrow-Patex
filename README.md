# Tescrow - Trusted Escrow

![Blockchain](https://user-images.githubusercontent.com/69969675/217176054-07179c50-097e-4037-b97a-f14824ac8e06.gif)
 

### A multi purpose Decentralised escrow protocol to facilitate peer to peer transactions between individuals and DAOs.Problem in current escrow services is that there high chances of fraud and when dispute is being raised, most of the times decision goes to the favour of a party who is bringing money on the platform. For example Employers in freelancing marketplaces. First we need to connect and as per our purpose, we can select Escrow template contract. We have ready to use escrow smart contracts for 1) Storage deal Auction 2) Data DAO / Market place escrow 3) Lottery Escrow for Games


## Use cases 

**DAOs :** Provides a secure platform for decentralized autonomous organizations (DAOs) to conduct peer to peer transactions with confidence. The protocol eliminates the need for intermediaries, allowing for seamless and trustless transactions within the DAO community.

**Companies :** Offers companies a secure and efficient way to facilitate transactions between multiple parties. Our protocol eliminates the risk of fraud and reduces the cost of intermediaries, making it a cost-effective solution for companies looking to streamline their operations.

**Storage Providers :** Offers storage providers a secure platform to transact with their customers. The protocol ensures that the storage provider is paid only after the customer receives their data, reducing the risk of fraud and providing peace of mind to both parties.

**Freelancers :** Provides a secure platform for freelancers to transact with their clients, ensuring that payment is made only after the work is completed. The protocol eliminates the risk of fraud, ensuring that both parties are protected.


## Contracts on Filecoin Virtual Machine:

#### 1) eCommerce marketplace Agreement contract: https://explorer.glif.io/address/0x9376d31F84529C98fa08Cd452fc0bC26383B9582/?network=hyperspacenet
#### 2) Storage deal Auction contract : https://explorer.glif.io/address/0x2783ADf4Eead72e0cA507F3B25E2549A201F980D/?network=hyperspacenet
#### 3) TescrowDevs NFT contract: https://explorer.glif.io/address/0xe02de84CE215bFA21A83d7798C02B51d908745dF/?network=hyperspacenet


## It includes

![Screenshot 2023-02-06 at 4 47 15 PM](https://user-images.githubusercontent.com/69969675/217185272-683f77a0-d8fc-4b23-91ed-c400989cbc86.png)
![Screenshot 2023-02-06 at 4 47 23 PM](https://user-images.githubusercontent.com/69969675/217185277-80153fa3-2227-4dd0-acd6-8802789c943a.png)


## Storage deal Auction

### Create Auction

![Screenshot 2023-02-07 at 1 27 24 PM](https://user-images.githubusercontent.com/69969675/217185569-0ad58965-3cdf-4712-b778-0eec7737dc97.png)

### My Created Auctions

![Screenshot 2023-02-07 at 1 27 34 PM](https://user-images.githubusercontent.com/69969675/217185578-f1e08e0e-e82c-46d2-bd88-2a73c5d2aa81.png)

### Make Bid. 

**Only TescrowDevs NFT holders can make a bid**


![Screenshot 2023-02-07 at 1 27 42 PM](https://user-images.githubusercontent.com/69969675/217185580-09dab6fb-efdc-4578-b5ba-cfc68777044e.png)

### All Bids and Bidders

![Screenshot 2023-02-07 at 1 27 53 PM](https://user-images.githubusercontent.com/69969675/217185583-6d07d4f3-04f0-4aab-9df3-b1a936548ea2.png)

## eCommerce marketplace Agreement

### Create Agreement

![Screenshot 2023-02-07 at 1 29 47 PM](https://user-images.githubusercontent.com/69969675/217185972-e86379c6-6b1d-47a5-a0b3-9395d6a6f684.png)

### My created Agreements

![Screenshot 2023-02-07 at 1 29 56 PM](https://user-images.githubusercontent.com/69969675/217185979-90acf027-2b17-40a8-8fd6-95ed2083abac.png)

### Details of Buyes and Seller.

![Screenshot 2023-02-07 at 1 30 06 PM](https://user-images.githubusercontent.com/69969675/217185983-6f397a11-e086-47b5-83c4-a7f2cac63342.png)


## Filecoin Virtual Machine

```
require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("./tasks")
require("dotenv").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.4",
    defaultNetwork: "hyperspace",
    networks: {
        hyperspace: {
            chainId: 3141,
            url: "https://api.hyperspace.node.glif.io/rpc/v1",
            accounts: [PRIVATE_KEY],
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
}


```

## Spheron

https://github.com/Disha1998/Tescrow/blob/master/Spheron.md
