
import React from 'react';

interface WordCardProps {
  word: string;
}

const WordCard: React.FC<WordCardProps> = ({ word }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 my-8 md:my-12 min-h-[180px] flex items-center justify-center">
      <h3 className="text-6xl md:text-8xl font-black text-slate-800 text-center">{word}</h3>
    </div>
  );
};

export default WordCard;
