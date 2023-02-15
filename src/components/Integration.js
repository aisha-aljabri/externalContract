import React, { Component } from "react"
import Storage from "../contracts/Storage.json";
import getWeb3 from "../getWeb3";

class Integration extends Component {
    state = {
        value: null,
        web3: null,
        accounts: null,
        contract: null,
    };

        componentDidMount = async () => {
            try {
              // Get network provider and web3 instance.
              const web3 = await getWeb3();

              // Use web3 to get the user's accounts.
              const accounts = await web3.eth.getAccounts();

              // Get the contract instance.
            //   const networkId = await web3.eth.net.getId();
            //   const deployedNetwork = Storage.networks[networkId];
              const instance = new web3.eth.Contract(
                Storage, //API json file
                "0x0000000000000000000000000000000000000000", //contract address
              );

              // Set web3, accounts, and contract to the state, and then proceed with an
              // example of interacting with the contract's methods.
              this.setState({ web3, accounts, contract: instance }, this.runExample);
            } catch (error) {
              // Catch any errors for any of the above operations.
              alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
              );
              console.error(error);
            }
          };


    Send = async(event) =>{
        event.preventDefault();
        const {accounts, contract} = this.state;
        await contract.methods.store("545").send({from: accounts[0]});
    }

    Get =async(event) => {
        event.preventDefault();
        const {accounts, contract} = this.state;
        const responce = await contract.methods.retrieve().call();
        this.setState({value: responce});
        console.log(responce)
    }


    render(){
        return(
            <div>
                <button onClick={this.Send}>Send</button>
                <button onClick={this.Get}>Get</button>
            {
                this.state.value != null?
                    <>
                    {this.state.value}
                    </>
                    :
                    <>
                    <p>null</p>
                    </>
            }
            </div>
            
            
        )
    }
}

export default Integration;