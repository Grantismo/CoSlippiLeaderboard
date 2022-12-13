import { Row } from './Row';
import { Player } from './player';

interface Props {
  players: Player[]
}

export function Table({ players }: Props) {
  const th = (text) => {
    return <th className="text-sm font-medium text-white px-6 py-4">{text}</th>
  }
  return (
    <table className="table-auto text-center">
      <thead className="border-b bg-gray-800">
        <tr>
          {th('Rank')}
          {th('Player')}
          {th('Rating')}
          {th('Characters')}
          {th('W/L')}
        </tr>
      </thead>
      <tbody>
        {players.map((p: Player, index: number) => <Row key={p.displayName} rank={index + 1} player={p} />)}
      </tbody>
    </table>
  );
}
