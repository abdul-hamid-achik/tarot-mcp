export interface TarotCard {
  id: string;
  name: string;
  arcana: 'major' | 'minor';
  number?: number;
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  description: string;
  element?: string;
  astrology?: string;
}

export interface TarotReading {
  id: string;
  timestamp: Date;
  spread: string;
  question?: string;
  cards: DrawCard[];
  interpretation?: string;
}

export interface DrawCard {
  card: TarotCard;
  position: string;
  isReversed: boolean;
}

export interface TarotSpread {
  name: string;
  id: string;
  description: string;
  positions: SpreadPosition[];
}

export interface SpreadPosition {
  number: number;
  name: string;
  meaning: string;
}