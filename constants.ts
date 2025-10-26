
import type { Word } from './types';
import { WordType } from './types';

export const WORDS: Word[] = [
  { text: 'מי', type: WordType.QUESTION },
  { text: 'מה', type: WordType.QUESTION },
  { text: 'מתי', type: WordType.QUESTION },
  { text: 'איפה', type: WordType.QUESTION },
  { text: 'למה', type: WordType.QUESTION },
  { text: 'איך', type: WordType.QUESTION },
  { text: 'כמה', type: WordType.QUESTION },
  { text: 'האם', type: WordType.QUESTION },
  { text: 'איזו', type: WordType.QUESTION },
  { text: 'באיזה', type: WordType.QUESTION },
  { text: 'כתבו', type: WordType.INSTRUCTION },
  { text: 'קראו', type: WordType.INSTRUCTION },
  { text: 'הקיפו', type: WordType.INSTRUCTION },
  { text: 'מתחו קו', type: WordType.INSTRUCTION },
  { text: 'צבעו', type: WordType.INSTRUCTION },
  { text: 'השלימו', type: WordType.INSTRUCTION },
  { text: 'סדרו', type: WordType.INSTRUCTION },
  { text: 'התאימו', type: WordType.INSTRUCTION },
  { text: 'חשבו', type: WordType.INSTRUCTION },
  { text: 'העתיקו', type: WordType.INSTRUCTION },
];

export const POINTS_PER_CORRECT_ANSWER = 100;
