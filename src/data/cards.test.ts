import { describe, it, expect } from 'vitest';
import { majorArcana, minorArcana, allCards } from './cards';

describe('Tarot Card Data', () => {
  describe('Major Arcana', () => {
    it('should have exactly 22 major arcana cards', () => {
      expect(majorArcana).toHaveLength(22);
    });

    it('should have cards numbered 0-21', () => {
      const numbers = majorArcana.map(card => card.number).sort((a, b) => a! - b!);
      expect(numbers).toEqual(Array.from({ length: 22 }, (_, i) => i));
    });

    it('should have all required fields for each card', () => {
      majorArcana.forEach(card => {
        expect(card.id).toBeTruthy();
        expect(card.name).toBeTruthy();
        expect(card.arcana).toBe('major');
        expect(typeof card.number).toBe('number');
        expect(card.keywords).toBeInstanceOf(Array);
        expect(card.keywords.length).toBeGreaterThan(0);
        expect(card.uprightMeaning).toBeTruthy();
        expect(card.reversedMeaning).toBeTruthy();
        expect(card.description).toBeTruthy();
        expect(card.element).toBeTruthy();
      });
    });

    it('should have unique IDs for all cards', () => {
      const ids = majorArcana.map(card => card.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should include essential cards', () => {
      const essentialCards = ['The Fool', 'The Magician', 'The High Priestess', 'Death', 'The World'];
      essentialCards.forEach(cardName => {
        expect(majorArcana.some(card => card.name === cardName)).toBe(true);
      });
    });
  });

  describe('Minor Arcana', () => {
    it('should have exactly 56 minor arcana cards', () => {
      expect(minorArcana).toHaveLength(56);
    });

    it('should have 14 cards for each suit', () => {
      const suits = ['wands', 'cups', 'swords', 'pentacles'];
      suits.forEach(suit => {
        const suitCards = minorArcana.filter(card => card.suit === suit);
        expect(suitCards).toHaveLength(14);
      });
    });

    it('should have numbered cards 1-10 for each suit', () => {
      const suits = ['wands', 'cups', 'swords', 'pentacles'];
      suits.forEach(suit => {
        const numberedCards = minorArcana.filter(
          card => card.suit === suit && card.number !== undefined && card.number >= 1 && card.number <= 10
        );
        expect(numberedCards).toHaveLength(10);
      });
    });

    it('should have court cards for each suit', () => {
      const suits = ['wands', 'cups', 'swords', 'pentacles'];
      const courtRanks = ['Page', 'Knight', 'Queen', 'King'];
      
      suits.forEach(suit => {
        courtRanks.forEach(rank => {
          const courtCard = minorArcana.find(card => 
            card.suit === suit && card.name.includes(rank)
          );
          expect(courtCard).toBeTruthy();
        });
      });
    });

    it('should have all required fields for each card', () => {
      minorArcana.forEach(card => {
        expect(card.id).toBeTruthy();
        expect(card.name).toBeTruthy();
        expect(card.arcana).toBe('minor');
        expect(card.suit).toMatch(/^(wands|cups|swords|pentacles)$/);
        expect(card.keywords).toBeInstanceOf(Array);
        expect(card.uprightMeaning).toBeTruthy();
        expect(card.reversedMeaning).toBeTruthy();
        expect(card.description).toBeTruthy();
        expect(card.element).toMatch(/^(Fire|Water|Air|Earth)$/);
      });
    });
  });

  describe('Complete Deck', () => {
    it('should have exactly 78 cards total', () => {
      expect(allCards).toHaveLength(78);
    });

    it('should combine major and minor arcana', () => {
      expect(allCards).toEqual([...majorArcana, ...minorArcana]);
    });

    it('should have unique IDs across entire deck', () => {
      const ids = allCards.map(card => card.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(78);
    });

    it('should have unique names across entire deck', () => {
      const names = allCards.map(card => card.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(78);
    });

    it('should have proper element distribution', () => {
      const elements = allCards.map(card => card.element).filter(Boolean);
      expect(elements.includes('Fire')).toBe(true);
      expect(elements.includes('Water')).toBe(true);
      expect(elements.includes('Air')).toBe(true);
      expect(elements.includes('Earth')).toBe(true);
    });
  });
});