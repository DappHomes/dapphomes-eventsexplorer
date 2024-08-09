import { useEffect, useState } from "react";
import MarketplaceABI from "../data/abi/Marketplace";
import MarketplaceSubscriptionRow from "./MarketplaceSubscriptionRow";

export default function MarketplaceSubscriptionTable({ address, web3 }) {
  const [subscriptionEvents, setSubscriptionEvents] = useState([]);

  useEffect(() => {
    const marketplaceABI = new MarketplaceABI().MarketplaceABI;
    const contract = new web3.eth.Contract(
      marketplaceABI, address
    )

    contract.getPastEvents(
      'Subscription',
      {
        fromBlock: 0,
        toBlock: 'latest'
      }
    )
      .then(events => setSubscriptionEvents(events))
      .catch(err => console.error(err))
  })

  const rows = subscriptionEvents.map(event =>
    <MarketplaceSubscriptionRow
      event={event}
      key={event.transactionHash}
      web3={web3}
    />
  )

  return (
    <table>
      <thead>
        <tr>
          <th>Event</th>
          <th>Subscriptor</th>
          <th>Init subscription</th>
          <th>End subscription</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}