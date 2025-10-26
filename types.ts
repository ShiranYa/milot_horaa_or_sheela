
export enum WordType {
  QUESTION = 'מילת שאלה',
  INSTRUCTION = 'מילת הוראה',
}

export interface Word {
  text: string;
  type: WordType;
}

export enum Player {
  Player1 = 1,
  Player2 = 2,
}

export type Scores = {
  [Player.Player1]: number;
  [Player.Player2]: number;
};

export type GameState = 'playing' | 'showingResult' | 'gameOver';
