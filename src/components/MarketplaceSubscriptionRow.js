import { Suspense, useEffect, useState } from 'react';
import '../App.css';

export default function MarketplaceSubscriptionRow({ event, web3 }) {
  const [eventTimestamp, setEventTimestamp] = useState(null);

  useEffect(() => {
    const blockHash = event.blockHash;
    web3.eth.getBlock(blockHash)
      .then(result => setEventTimestamp(parseInt(result.timestamp) * 1000))
      .catch(error => console.log(error))
  })

  function timestampToDate(timestamp) {
    return new Date(timestamp * 1000).toISOString();
  }

  function FetchingData() {
    return (
      <tr>
        <td>{'Fetching data'}</td>
        <td>{'Fetching data'}</td>
        <td>{'Fetching data'}</td>
      </tr>
    );
  }

  return (
    <Suspense fallback={<FetchingData />}>
      <tr>
        <td>{event.event}</td>
        <td>{event.returnValues[0]}</td>
        <td>{new Date(eventTimestamp).toISOString()}</td>
        <td>{
          timestampToDate(parseInt(event.returnValues[1]))
        }</td>
      </tr>
    </Suspense>
  );
}
