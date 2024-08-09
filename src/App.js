import { Suspense, useEffect, useState } from 'react';
import './App.css';

import MarketplaceCreationTable from './components/MarketplaceCreationTable';
import MarketplaceSubscriptionTable from './components/MarketplaceSubscriptionTable';
import DappHomesABI from './data/abi/DappHomes';
import Web3 from 'web3';

function App() {
  const [creationEvents, setCreationEvents] = useState([]);
  const [marketplaces, setMarketplaces] = useState([]);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const web3 = new Web3(
      'https://rpc-amoy.polygon.technology/'
    )
    const marketplaces = [];
    const dappHomesABI = new DappHomesABI().DappHomesABI;
    const contract = new web3.eth.Contract(
      dappHomesABI, '0x9Fe6511002323c34012621F1f48479e08FCb425E'
    )

    contract.getPastEvents(
      'CreateMarketplace',
      {
        fromBlock: 0,
        toBlock: 'latest'
      }
    )
      .then(events => {
        events.map(event =>
          marketplaces.push(event.returnValues.marketplace)
        )
        setMarketplaces(marketplaces)
        setCreationEvents(events)
        setWeb3(web3);
      })
      .catch(err => console.error(err))
  })

  function FetchingData() {
    return <div>{'Fetching'}</div>
  }

  return (
    <>
      <h1>DappHomes contract events</h1>
      <h2>Marketplace creation</h2>
      <MarketplaceCreationTable
        events={creationEvents}
        web3={web3}
      />
      <h1>Marketplaces subscription events</h1>
      {marketplaces.map(marketplace => {
        return (
          <div key={marketplace}>
            <h2>{marketplace} subscriptions</h2>
            <Suspense fallback={<FetchingData />}>
              <MarketplaceSubscriptionTable
                address={marketplace}
                web3={web3}
              />
            </Suspense>
          </div>
        )
      })}
    </>
  );
}

export default App;
