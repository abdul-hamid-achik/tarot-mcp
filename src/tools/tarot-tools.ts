import { allCards } from '../data/cards.js';
import { spreads } from '../data/spreads.js';
import { TarotCard, TarotReading, DrawCard, TarotSpread } from '../types/tarot.js';

export class TarotTools {
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  drawCards(count: number): DrawCard[] {
    const shuffled = this.shuffleArray(allCards);
    const drawnCards: DrawCard[] = [];
    
    for (let i = 0; i < count && i < shuffled.length; i++) {
      drawnCards.push({
        card: shuffled[i],
        position: `Position ${i + 1}`,
        isReversed: Math.random() < 0.5
      });
    }
    
    return drawnCards;
  }

  performReading(spreadId: string, question?: string): TarotReading | null {
    const spread = spreads.find(s => s.id === spreadId);
    if (!spread) {
      return null;
    }

    const drawnCards = this.drawCards(spread.positions.length);
    
    // Assign position names from the spread
    drawnCards.forEach((drawCard, index) => {
      drawCard.position = spread.positions[index].name;
    });

    return {
      id: `reading-${Date.now()}`,
      timestamp: new Date(),
      spread: spread.name,
      question: question || 'General reading',
      cards: drawnCards
    };
  }

  interpretReading(reading: TarotReading): string {
    const spread = spreads.find(s => s.name === reading.spread);
    if (!spread) {
      return 'Unable to interpret reading - spread not found';
    }

    let interpretation = `# ${reading.spread} Reading\n\n`;
    
    if (reading.question) {
      interpretation += `**Question:** ${reading.question}\n\n`;
    }

    interpretation += '## Cards Drawn:\n\n';

    reading.cards.forEach((drawCard, index) => {
      const position = spread.positions[index];
      const card = drawCard.card;
      const orientation = drawCard.isReversed ? 'Reversed' : 'Upright';
      const meaning = drawCard.isReversed ? card.reversedMeaning : card.uprightMeaning;

      interpretation += `### ${position.name}: ${card.name} (${orientation})\n`;
      interpretation += `**Position Meaning:** ${position.meaning}\n`;
      interpretation += `**Card Meaning:** ${meaning}\n`;
      interpretation += `**Keywords:** ${card.keywords.join(', ')}\n\n`;
    });

    interpretation += '\n## Overall Interpretation:\n\n';
    interpretation += this.generateOverallInterpretation(reading, spread);

    return interpretation;
  }

  private generateOverallInterpretation(reading: TarotReading, spread: TarotSpread): string {
    let interpretation = '';

    // Analyze major arcana presence
    const majorCards = reading.cards.filter(dc => dc.card.arcana === 'major');
    if (majorCards.length > 0) {
      interpretation += `This reading contains ${majorCards.length} Major Arcana card${majorCards.length > 1 ? 's' : ''}, indicating significant life themes and spiritual lessons at play. `;
    }

    // Analyze suits for minor arcana
    const suits = { wands: 0, cups: 0, swords: 0, pentacles: 0 };
    reading.cards.forEach(dc => {
      if (dc.card.suit) {
        suits[dc.card.suit]++;
      }
    });

    const dominantSuits = Object.entries(suits)
      .filter(([_, count]) => count > 1)
      .sort((a, b) => b[1] - a[1]);

    if (dominantSuits.length > 0) {
      const [suit, count] = dominantSuits[0];
      interpretation += `\n\nThe presence of ${count} ${suit} cards suggests a focus on `;
      switch(suit) {
        case 'wands':
          interpretation += 'creativity, passion, and action. ';
          break;
        case 'cups':
          interpretation += 'emotions, relationships, and intuition. ';
          break;
        case 'swords':
          interpretation += 'thoughts, communication, and challenges. ';
          break;
        case 'pentacles':
          interpretation += 'material matters, work, and practical concerns. ';
          break;
      }
    }

    // Analyze reversed cards
    const reversedCount = reading.cards.filter(dc => dc.isReversed).length;
    if (reversedCount > reading.cards.length / 2) {
      interpretation += `\n\nWith ${reversedCount} reversed cards, there may be internal blocks, delays, or a need for inner reflection before external action. `;
    }

    // Add spread-specific interpretation
    if (spread.id === 'past-present-future') {
      interpretation += '\n\nThis temporal reading shows the evolution of your situation from past influences through current circumstances to likely future outcomes. ';
    } else if (spread.id === 'celtic-cross') {
      interpretation += '\n\nThis comprehensive Celtic Cross reading provides deep insight into your situation, revealing both conscious and unconscious factors, as well as internal and external influences shaping your path forward. ';
    } else if (spread.id === 'relationship-spread') {
      interpretation += '\n\nThis relationship reading reveals the dynamics between you and another, highlighting both challenges to address and strengths to build upon. ';
    }

    interpretation += '\n\nRemember that tarot provides guidance and insight, but you always have the power to shape your own destiny through your choices and actions.';

    return interpretation;
  }

  getCardMeaning(cardName: string): TarotCard | null {
    const card = allCards.find(c => 
      c.name.toLowerCase() === cardName.toLowerCase() ||
      c.id.toLowerCase() === cardName.toLowerCase().replace(/\s+/g, '_')
    );
    return card || null;
  }

  getAllCards(): TarotCard[] {
    return allCards;
  }

  getAllSpreads(): TarotSpread[] {
    return spreads;
  }

  getSpreadInfo(spreadId: string): TarotSpread | null {
    return spreads.find(s => s.id === spreadId) || null;
  }

  getDailyCard(): DrawCard {
    const cards = this.drawCards(1);
    return cards[0];
  }

  searchCards(query: string): TarotCard[] {
    const lowerQuery = query.toLowerCase();
    return allCards.filter(card => 
      card.name.toLowerCase().includes(lowerQuery) ||
      card.keywords.some(k => k.toLowerCase().includes(lowerQuery)) ||
      card.description.toLowerCase().includes(lowerQuery)
    );
  }
}