
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Word, Scores, GameState } from './types';
import { Player, WordType } from './types';
import { WORDS, POINTS_PER_CORRECT_ANSWER } from './constants';
import Scoreboard from './components/Scoreboard';
import WordCard from './components/WordCard';
import AnswerButtons from './components/AnswerButtons';

const App: React.FC = () => {
  const [scores, setScores] = useState<Scores>({ [Player.Player1]: 0, [Player.Player2]: 0 });
  const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.Player1);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());
  const [gameState, setGameState] = useState<GameState>('playing');
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  const shuffledWords = useMemo(() => [...WORDS].sort(() => Math.random() - 0.5), []);

  const setupNewRound = useCallback(() => {
    if (usedIndices.size >= shuffledWords.length) {
      setGameState('gameOver');
      return;
    }

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * shuffledWords.length);
    } while (usedIndices.has(newIndex));

    setUsedIndices(prev => new Set(prev).add(newIndex));
    setCurrentWord(shuffledWords[newIndex]);
    setGameState('playing');
    setResultMessage(null);
  }, [usedIndices, shuffledWords]);

  useEffect(() => {
    setupNewRound();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswer = (selectedType: WordType) => {
    if (!currentWord || gameState !== 'playing') return;

    setGameState('showingResult');
    const isCorrect = selectedType === currentWord.type;

    if (isCorrect) {
      setScores(prevScores => ({
        ...prevScores,
        [currentPlayer]: prevScores[currentPlayer] + POINTS_PER_CORRECT_ANSWER,
      }));
      setResultMessage('כל הכבוד! תשובה נכונה!');
    } else {
      setResultMessage(`אוי, טעות! זוהי ${currentWord.type}`);
    }

    setTimeout(() => {
      setCurrentPlayer(prevPlayer => prevPlayer === Player.Player1 ? Player.Player2 : Player.Player1);
      setupNewRound();
    }, 2000);
  };
  
  const restartGame = () => {
    setScores({ [Player.Player1]: 0, [Player.Player2]: 0 });
    setCurrentPlayer(Player.Player1);
    setUsedIndices(new Set());
    setGameState('playing');
    setResultMessage(null);
    // Directly call setupNewRound to avoid dependency issues with useEffect
    if (usedIndices.size >= shuffledWords.length) {
       const newIndex = Math.floor(Math.random() * shuffledWords.length);
       setUsedIndices(new Set([newIndex]));
       setCurrentWord(shuffledWords[newIndex]);
    } else {
        setupNewRound();
    }
  };


  const renderGameContent = () => {
    if (gameState === 'gameOver') {
      const winner = scores[Player.Player1] > scores[Player.Player2] 
        ? 'שחקן 1' 
        : scores[Player.Player2] > scores[Player.Player1] 
        ? 'שחקן 2' 
        : 'תיקו';
      const winnerMessage = winner === 'תיקו' ? 'המשחק הסתיים בתיקו!' : `המנצח הוא ${winner}!`;

      return (
        <div className="text-center">
          <h2 className="text-4xl font-black text-slate-800 mb-4">המשחק נגמר!</h2>
          <p className="text-2xl font-bold text-blue-600 mb-8">{winnerMessage}</p>
          <button
            onClick={restartGame}
            className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg text-xl hover:bg-green-600 transition-all shadow-lg"
          >
            שחקו שוב
          </button>
        </div>
      );
    }

    if (!currentWord) {
      return <p className="text-center text-2xl">טוען משחק...</p>;
    }
    
    return (
      <>
        <WordCard word={currentWord.text} />
        {gameState === 'showingResult' && resultMessage && (
          <div className={`text-center my-4 text-3xl font-bold ${resultMessage.includes('נכונה') ? 'text-green-500' : 'text-red-500'}`}>
            {resultMessage}
          </div>
        )}
        <AnswerButtons onAnswer={handleAnswer} disabled={gameState !== 'playing'} />
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-2xl mx-auto bg-slate-100 p-6 md:p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl md:text-5xl font-black text-center text-slate-700 mb-6">
          מילת שאלה או מילת הוראה?
        </h1>
        <Scoreboard scores={scores} currentPlayer={currentPlayer} />
        {renderGameContent()}
      </main>
    </div>
  );
};

export default App;
