
import React from 'react';
import type { Scores } from '../types';
import { Player } from '../types';

interface ScoreboardProps {
  scores: Scores;
  currentPlayer: Player;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ scores, currentPlayer }) => {
  const playerBoxClasses = (player: Player) => 
    `w-1/2 text-center p-4 md:p-6 rounded-lg transition-all duration-300 ease-in-out transform ${
      currentPlayer === player
        ? 'bg-blue-500 text-white shadow-lg scale-105'
        : 'bg-white text-gray-700 shadow-md'
    }`;

  return (
    <div className="flex justify-center items-center gap-4 md:gap-8 mb-8">
      <div className={playerBoxClasses(Player.Player1)}>
        <h2 className="text-xl md:text-2xl font-bold">שחקן 1</h2>
        <p className="text-2xl md:text-4xl font-black tracking-tighter">{scores[Player.Player1]}</p>
      </div>
      <div className={playerBoxClasses(Player.Player2)}>
        <h2 className="text-xl md:text-2xl font-bold">שחקן 2</h2>
        <p className="text-2xl md:text-4xl font-black tracking-tighter">{scores[Player.Player2]}</p>
      </div>
    </div>
  );
};

export default Scoreboard;
