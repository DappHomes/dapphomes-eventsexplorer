import '../App.css';
import { Suspense, useEffect, useState } from 'react';

export default function MarketplaceCreationRow({ event, web3 }) {
  const [eventTimestamp, setEventTimestamp] = useState(null);

  useEffect(() => {
    const blockHash = event.blockHash;
    web3.eth.getBlock(blockHash)
      .then(result => setEventTimestamp(parseInt(result.timestamp) * 1000))
      .catch(error => console.log(error))
  })

  function FetchingData() {
    return (
      <tr>
        <td>{'Fetching data'}</td>
        <td>{'Fetching data'}</td>
        <td>{'Fetching data'}</td>
        <td>{'Fetching data'}</td>
      </tr>
    );
  }

  return (
    <Suspense fallback={FetchingData}>
      <tr>
        <td>{event.event}</td>
        <td>{event.returnValues.owner}</td>
        <td>{event.returnValues.marketplace}</td>
        <td>{new Date(eventTimestamp).toISOString()}</td>
      </tr>
    </Suspense>
  );
}
