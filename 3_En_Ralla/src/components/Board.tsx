import { Square } from "./Square";
import { calculateWinner } from "../utils";

interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
}

export function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner
    ? "Ganador: " + winner
    : "Siguiente jugador: " + (xIsNext ? "X" : "O");

  return (
    <>
      <div className="status">{status}</div>
      {[0, 3, 6].map((row) => (
        <div key={row} className="board-row">
          {[0, 1, 2].map((col) => (
            <Square
              key={row + col}
              value={squares[row + col]}
              onSquareClick={() => handleClick(row + col)}
            />
          ))}
        </div>
      ))}
    </>
  );
}
