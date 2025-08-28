import { describe, it, expect } from 'vitest';
import { spreads } from './spreads';

describe('Tarot Spreads', () => {
  it('should have at least 10 spreads defined', () => {
    expect(spreads.length).toBeGreaterThanOrEqual(10);
  });

  it('should have all required fields for each spread', () => {
    spreads.forEach(spread => {
      expect(spread.id).toBeTruthy();
      expect(spread.name).toBeTruthy();
      expect(spread.description).toBeTruthy();
      expect(spread.positions).toBeInstanceOf(Array);
      expect(spread.positions.length).toBeGreaterThan(0);
    });
  });

  it('should have unique IDs for all spreads', () => {
    const ids = spreads.map(spread => spread.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have valid position definitions', () => {
    spreads.forEach(spread => {
      spread.positions.forEach((position, index) => {
        expect(position.number).toBe(index + 1);
        expect(position.name).toBeTruthy();
        expect(position.meaning).toBeTruthy();
      });
    });
  });

  describe('Specific Spreads', () => {
    it('should have single-card spread with 1 position', () => {
      const singleCard = spreads.find(s => s.id === 'single-card');
      expect(singleCard).toBeTruthy();
      expect(singleCard?.positions).toHaveLength(1);
    });

    it('should have past-present-future spread with 3 positions', () => {
      const ppf = spreads.find(s => s.id === 'past-present-future');
      expect(ppf).toBeTruthy();
      expect(ppf?.positions).toHaveLength(3);
      expect(ppf?.positions[0].name).toBe('Past');
      expect(ppf?.positions[1].name).toBe('Present');
      expect(ppf?.positions[2].name).toBe('Future');
    });

    it('should have celtic-cross spread with 10 positions', () => {
      const celticCross = spreads.find(s => s.id === 'celtic-cross');
      expect(celticCross).toBeTruthy();
      expect(celticCross?.positions).toHaveLength(10);
      expect(celticCross?.name).toBe('Celtic Cross');
    });

    it('should have relationship spread with 7 positions', () => {
      const relationship = spreads.find(s => s.id === 'relationship-spread');
      expect(relationship).toBeTruthy();
      expect(relationship?.positions).toHaveLength(7);
    });

    it('should have year-ahead spread with 12 positions', () => {
      const yearAhead = spreads.find(s => s.id === 'year-ahead');
      expect(yearAhead).toBeTruthy();
      expect(yearAhead?.positions).toHaveLength(12);
      expect(yearAhead?.positions[0].name).toBe('January');
      expect(yearAhead?.positions[11].name).toBe('December');
    });

    it('should have decision-making spread with 5 positions', () => {
      const decision = spreads.find(s => s.id === 'decision-making');
      expect(decision).toBeTruthy();
      expect(decision?.positions).toHaveLength(5);
    });
  });

  it('should have consecutive position numbers', () => {
    spreads.forEach(spread => {
      const numbers = spread.positions.map(p => p.number);
      const expectedNumbers = Array.from({ length: spread.positions.length }, (_, i) => i + 1);
      expect(numbers).toEqual(expectedNumbers);
    });
  });
});