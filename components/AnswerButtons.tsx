
import React from 'react';
import { WordType } from '../types';

interface AnswerButtonsProps {
  onAnswer: (answer: WordType) => void;
  disabled: boolean;
}

const AnswerButtons: React.FC<AnswerButtonsProps> = ({ onAnswer, disabled }) => {
  const buttonBaseClasses = "w-full text-white text-xl md:text-2xl font-bold py-4 px-6 rounded-xl transition-transform duration-200 ease-in-out shadow-lg focus:outline-none focus:ring-4";
  const buttonHoverClasses = "hover:scale-105 hover:shadow-2xl";
  const buttonDisabledClasses = "disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-lg";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8">
      <button
        onClick={() => onAnswer(WordType.QUESTION)}
        disabled={disabled}
        className={`${buttonBaseClasses} bg-teal-500 hover:bg-teal-600 focus:ring-teal-300 ${!disabled ? buttonHoverClasses : ''} ${buttonDisabledClasses}`}
      >
        {WordType.QUESTION}
      </button>
      <button
        onClick={() => onAnswer(WordType.INSTRUCTION)}
        disabled={disabled}
        className={`${buttonBaseClasses} bg-amber-500 hover:bg-amber-600 focus:ring-amber-300 ${!disabled ? buttonHoverClasses : ''} ${buttonDisabledClasses}`}
      >
        {WordType.INSTRUCTION}
      </button>
    </div>
  );
};

export default AnswerButtons;
