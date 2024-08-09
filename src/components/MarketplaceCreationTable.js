import '../App.css';
import MarketplaceCreationRow from "./MarketplaceCreationRow";

export default function MarketplaceCreationTable({ events, web3 }) {
  const rows = events.map(event =>
    <MarketplaceCreationRow
      event={event}
      key={event.transactionHash}
      web3={web3}
    />
  )

  return (
    <table>
      <thead>
        <tr>
          <th>Event name</th>
          <th>Marketplace owner</th>
          <th>Marketplace address</th>
          <th>Creation time</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}
