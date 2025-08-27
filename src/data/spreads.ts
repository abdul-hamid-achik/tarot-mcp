import { TarotSpread } from '../types/tarot.js';

export const spreads: TarotSpread[] = [
  {
    id: 'single-card',
    name: 'Single Card',
    description: 'A simple one-card draw for quick insight or daily guidance',
    positions: [
      { number: 1, name: 'Present', meaning: 'Current situation or energy' }
    ]
  },
  {
    id: 'past-present-future',
    name: 'Past, Present, Future',
    description: 'A three-card spread showing temporal progression',
    positions: [
      { number: 1, name: 'Past', meaning: 'Past influences affecting the situation' },
      { number: 2, name: 'Present', meaning: 'Current situation and energies' },
      { number: 3, name: 'Future', meaning: 'Likely outcome or future direction' }
    ]
  },
  {
    id: 'situation-action-outcome',
    name: 'Situation, Action, Outcome',
    description: 'A practical three-card spread for decision making',
    positions: [
      { number: 1, name: 'Situation', meaning: 'Current circumstances' },
      { number: 2, name: 'Action', meaning: 'Recommended action or approach' },
      { number: 3, name: 'Outcome', meaning: 'Likely result if action is taken' }
    ]
  },
  {
    id: 'mind-body-spirit',
    name: 'Mind, Body, Spirit',
    description: 'A holistic three-card spread for self-reflection',
    positions: [
      { number: 1, name: 'Mind', meaning: 'Mental state and thoughts' },
      { number: 2, name: 'Body', meaning: 'Physical world and material concerns' },
      { number: 3, name: 'Spirit', meaning: 'Spiritual energy and higher self' }
    ]
  },
  {
    id: 'celtic-cross',
    name: 'Celtic Cross',
    description: 'The classic 10-card spread for in-depth analysis',
    positions: [
      { number: 1, name: 'Present Situation', meaning: 'Current circumstances and state of being' },
      { number: 2, name: 'Cross/Challenge', meaning: 'What crosses you - challenges or opposing forces' },
      { number: 3, name: 'Distant Past', meaning: 'Foundation and root of the matter' },
      { number: 4, name: 'Recent Past', meaning: 'Recent events leading to present' },
      { number: 5, name: 'Possible Future', meaning: 'Potential outcome if path continues' },
      { number: 6, name: 'Immediate Future', meaning: 'What will happen in the near future' },
      { number: 7, name: 'Your Approach', meaning: 'Your current approach to the situation' },
      { number: 8, name: 'External Influences', meaning: 'Environmental factors and other people' },
      { number: 9, name: 'Hopes and Fears', meaning: 'Your deepest hopes or fears about the outcome' },
      { number: 10, name: 'Final Outcome', meaning: 'The likely final outcome' }
    ]
  },
  {
    id: 'relationship-spread',
    name: 'Relationship Spread',
    description: 'A 7-card spread examining relationship dynamics',
    positions: [
      { number: 1, name: 'Your Feelings', meaning: 'How you feel about the relationship' },
      { number: 2, name: 'Their Feelings', meaning: 'How they feel about the relationship' },
      { number: 3, name: 'Connection', meaning: 'The nature of your connection' },
      { number: 4, name: 'Challenges', meaning: 'Current or upcoming challenges' },
      { number: 5, name: 'Strengths', meaning: 'Relationship strengths to build on' },
      { number: 6, name: 'Advice', meaning: 'Guidance for the relationship' },
      { number: 7, name: 'Potential', meaning: 'Where the relationship is heading' }
    ]
  },
  {
    id: 'career-spread',
    name: 'Career Path',
    description: 'A 5-card spread for career guidance',
    positions: [
      { number: 1, name: 'Current Position', meaning: 'Your current career situation' },
      { number: 2, name: 'Strengths', meaning: 'Your professional strengths' },
      { number: 3, name: 'Challenges', meaning: 'Obstacles to overcome' },
      { number: 4, name: 'Opportunities', meaning: 'Upcoming opportunities' },
      { number: 5, name: 'Outcome', meaning: 'Career trajectory if current path continues' }
    ]
  },
  {
    id: 'horseshoe',
    name: 'Horseshoe',
    description: 'A 7-card spread for general guidance',
    positions: [
      { number: 1, name: 'Past', meaning: 'Past influences' },
      { number: 2, name: 'Present', meaning: 'Current situation' },
      { number: 3, name: 'Hidden Influences', meaning: 'Unseen factors at play' },
      { number: 4, name: 'Obstacles', meaning: 'Challenges to overcome' },
      { number: 5, name: 'Environment', meaning: 'External influences' },
      { number: 6, name: 'Advice', meaning: 'Recommended approach' },
      { number: 7, name: 'Outcome', meaning: 'Most likely outcome' }
    ]
  },
  {
    id: 'year-ahead',
    name: 'Year Ahead',
    description: 'A 12-card spread with one card for each month',
    positions: [
      { number: 1, name: 'January', meaning: 'Energy and themes for January' },
      { number: 2, name: 'February', meaning: 'Energy and themes for February' },
      { number: 3, name: 'March', meaning: 'Energy and themes for March' },
      { number: 4, name: 'April', meaning: 'Energy and themes for April' },
      { number: 5, name: 'May', meaning: 'Energy and themes for May' },
      { number: 6, name: 'June', meaning: 'Energy and themes for June' },
      { number: 7, name: 'July', meaning: 'Energy and themes for July' },
      { number: 8, name: 'August', meaning: 'Energy and themes for August' },
      { number: 9, name: 'September', meaning: 'Energy and themes for September' },
      { number: 10, name: 'October', meaning: 'Energy and themes for October' },
      { number: 11, name: 'November', meaning: 'Energy and themes for November' },
      { number: 12, name: 'December', meaning: 'Energy and themes for December' }
    ]
  },
  {
    id: 'decision-making',
    name: 'Decision Making',
    description: 'A 5-card spread for making difficult decisions',
    positions: [
      { number: 1, name: 'The Decision', meaning: 'The core of the decision' },
      { number: 2, name: 'Option A Result', meaning: 'Outcome if you choose option A' },
      { number: 3, name: 'Option B Result', meaning: 'Outcome if you choose option B' },
      { number: 4, name: 'What You Need to Know', meaning: 'Important information to consider' },
      { number: 5, name: 'Guidance', meaning: 'Overall guidance for your decision' }
    ]
  }
];