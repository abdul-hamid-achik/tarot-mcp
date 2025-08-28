import { describe, it, expect, beforeEach } from 'vitest';
import { TarotTools } from './tarot-tools';
import { allCards } from '../data/cards';
import { spreads } from '../data/spreads';

describe('TarotTools', () => {
  let tarotTools: TarotTools;

  beforeEach(() => {
    tarotTools = new TarotTools();
  });

  describe('drawCards', () => {
    it('should draw the specified number of cards', () => {
      const cards = tarotTools.drawCards(3);
      expect(cards).toHaveLength(3);
    });

    it('should not exceed the deck size', () => {
      const cards = tarotTools.drawCards(100);
      expect(cards).toHaveLength(78); // Total deck size
    });

    it('should assign reversed status to cards', () => {
      const cards = tarotTools.drawCards(10);
      cards.forEach(card => {
        expect(typeof card.isReversed).toBe('boolean');
      });
    });

    it('should assign position names to cards', () => {
      const cards = tarotTools.drawCards(3);
      cards.forEach((card, index) => {
        expect(card.position).toBe(`Position ${index + 1}`);
      });
    });

    it('should return unique cards', () => {
      const cards = tarotTools.drawCards(10);
      const cardIds = cards.map(dc => dc.card.id);
      const uniqueIds = new Set(cardIds);
      expect(uniqueIds.size).toBe(cardIds.length);
    });
  });

  describe('performReading', () => {
    it('should perform a valid reading with existing spread', () => {
      const reading = tarotTools.performReading('celtic-cross', 'Test question');
      expect(reading).toBeTruthy();
      expect(reading?.spread).toBe('Celtic Cross');
      expect(reading?.cards).toHaveLength(10); // Celtic Cross has 10 cards
      expect(reading?.question).toBe('Test question');
    });

    it('should return null for invalid spread', () => {
      const reading = tarotTools.performReading('invalid-spread');
      expect(reading).toBeNull();
    });

    it('should use default question when none provided', () => {
      const reading = tarotTools.performReading('single-card');
      expect(reading?.question).toBe('General reading');
    });

    it('should assign correct position names from spread', () => {
      const reading = tarotTools.performReading('past-present-future');
      expect(reading?.cards[0].position).toBe('Past');
      expect(reading?.cards[1].position).toBe('Present');
      expect(reading?.cards[2].position).toBe('Future');
    });

    it('should generate unique reading ID with timestamp', async () => {
      const reading1 = tarotTools.performReading('single-card');
      // Add small delay to ensure different timestamps
      await new Promise(resolve => setTimeout(resolve, 5));
      const reading2 = tarotTools.performReading('single-card');
      expect(reading1?.id).not.toBe(reading2?.id);
      expect(reading1?.id).toMatch(/^reading-\d+$/);
    });
  });

  describe('interpretReading', () => {
    it('should generate interpretation for valid reading', () => {
      const reading = tarotTools.performReading('past-present-future', 'Test question');
      const interpretation = tarotTools.interpretReading(reading!);
      
      expect(interpretation).toContain('Past, Present, Future Reading');
      expect(interpretation).toContain('Test question');
      expect(interpretation).toContain('Past:');
      expect(interpretation).toContain('Present:');
      expect(interpretation).toContain('Future:');
    });

    it('should include card meanings based on orientation', () => {
      const reading = tarotTools.performReading('single-card');
      const interpretation = tarotTools.interpretReading(reading!);
      const card = reading!.cards[0];
      
      if (card.isReversed) {
        expect(interpretation).toContain(card.card.reversedMeaning);
      } else {
        expect(interpretation).toContain(card.card.uprightMeaning);
      }
    });

    it('should analyze major arcana presence', () => {
      const reading = tarotTools.performReading('celtic-cross');
      const interpretation = tarotTools.interpretReading(reading!);
      const majorCards = reading!.cards.filter(dc => dc.card.arcana === 'major');
      
      if (majorCards.length > 0) {
        expect(interpretation.toLowerCase()).toContain('major arcana');
      }
    });

    it('should handle unknown spread gracefully', () => {
      const fakeReading = {
        id: 'test',
        timestamp: new Date(),
        spread: 'Unknown Spread',
        cards: [],
        question: 'Test'
      };
      const interpretation = tarotTools.interpretReading(fakeReading);
      expect(interpretation).toContain('Unable to interpret reading');
    });
  });

  describe('getCardMeaning', () => {
    it('should find card by exact name', () => {
      const card = tarotTools.getCardMeaning('The Fool');
      expect(card?.name).toBe('The Fool');
      expect(card?.arcana).toBe('major');
    });

    it('should find card by name case-insensitive', () => {
      const card = tarotTools.getCardMeaning('the fool');
      expect(card?.name).toBe('The Fool');
    });

    it('should find card by id format', () => {
      const card = tarotTools.getCardMeaning('three of cups');
      expect(card?.name).toBe('Three of Cups');
    });

    it('should return null for non-existent card', () => {
      const card = tarotTools.getCardMeaning('Invalid Card Name');
      expect(card).toBeNull();
    });
  });

  describe('getAllCards', () => {
    it('should return all 78 cards', () => {
      const cards = tarotTools.getAllCards();
      expect(cards).toHaveLength(78);
    });

    it('should include both major and minor arcana', () => {
      const cards = tarotTools.getAllCards();
      const majorCount = cards.filter(c => c.arcana === 'major').length;
      const minorCount = cards.filter(c => c.arcana === 'minor').length;
      
      expect(majorCount).toBe(22);
      expect(minorCount).toBe(56);
    });
  });

  describe('getAllSpreads', () => {
    it('should return all defined spreads', () => {
      const allSpreads = tarotTools.getAllSpreads();
      expect(allSpreads.length).toBeGreaterThan(0);
      expect(allSpreads).toEqual(spreads);
    });
  });

  describe('getSpreadInfo', () => {
    it('should return spread info for valid ID', () => {
      const spread = tarotTools.getSpreadInfo('celtic-cross');
      expect(spread?.name).toBe('Celtic Cross');
      expect(spread?.positions).toHaveLength(10);
    });

    it('should return null for invalid spread ID', () => {
      const spread = tarotTools.getSpreadInfo('invalid-id');
      expect(spread).toBeNull();
    });
  });

  describe('getDailyCard', () => {
    it('should draw exactly one card', () => {
      const card = tarotTools.getDailyCard();
      expect(card).toBeTruthy();
      expect(card.card).toBeTruthy();
      expect(card.position).toBe('Position 1');
    });

    it('should include reversed status', () => {
      const card = tarotTools.getDailyCard();
      expect(typeof card.isReversed).toBe('boolean');
    });
  });

  describe('searchCards', () => {
    it('should find cards by name keyword', () => {
      const results = tarotTools.searchCards('fool');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(c => c.name === 'The Fool')).toBe(true);
    });

    it('should find cards by keyword array', () => {
      const results = tarotTools.searchCards('love');
      expect(results.length).toBeGreaterThan(0);
      results.forEach(card => {
        const hasLoveKeyword = 
          card.keywords.some(k => k.toLowerCase().includes('love')) ||
          card.description.toLowerCase().includes('love') ||
          card.name.toLowerCase().includes('love');
        expect(hasLoveKeyword).toBe(true);
      });
    });

    it('should find cards by description', () => {
      const results = tarotTools.searchCards('transformation');
      expect(results.length).toBeGreaterThan(0);
    });

    it('should be case-insensitive', () => {
      const results1 = tarotTools.searchCards('DEATH');
      const results2 = tarotTools.searchCards('death');
      expect(results1).toEqual(results2);
    });

    it('should return empty array for no matches', () => {
      const results = tarotTools.searchCards('xyz123notacard');
      expect(results).toEqual([]);
    });
  });
});