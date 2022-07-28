const webProvider=require("truffle-hdwallet-provider")
require('dotenv').config();
const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  defaultNetwork:"rinkeby",
  networks: {
    dev: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby:{
      provider:function(){
        return new webProvider(PRIVATE_KEY, API_URL) 
      },
      network_id: "*" , // Match any network id
      gas: 4500000,
    }
  }
};