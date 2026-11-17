import { Zap, Bug, Target, Type } from 'lucide-react'

export const MAX_POINTS = 300

export const GAMES = [
  {
    id: 'tle-ac',
    icon: Zap,
    title: 'TLE or AC?',
    short: 'TLE/AC',
    subtitle: 'Complexity Blitz',
    description: 'Read the constraints, judge the approach. Will it pass the time limit or get TLE?',
    tags: ['time complexity', 'constraints'],
    meta: '10 rounds',
    duration: '~90s',
  },
  {
    id: 'debug',
    icon: Bug,
    title: 'Debug This Code',
    short: 'Debug',
    subtitle: 'Spot the Bug',
    description: 'Each C++ snippet has exactly one buggy line. Find it before you run out of lives.',
    tags: ['C++', 'edge cases'],
    meta: '3 snippets',
    duration: '~2 min',
  },
  {
    id: 'topic',
    icon: Target,
    title: 'Guess the Topic',
    short: 'Topic',
    subtitle: 'Pattern Radar',
    description: 'Name the data structure or technique from progressive clues. Fewer clues, more points.',
    tags: ['data structures', 'patterns'],
    meta: '3 puzzles',
    duration: '~1 min',
  },
  {
    id: 'wordle',
    icon: Type,
    title: 'CP Wordle',
    short: 'Wordle',
    subtitle: 'Concept Recall',
    description: 'Guess the CP term in six tries. Every solve unlocks a short CP Digest read.',
    tags: ['algorithms', 'vocabulary'],
    meta: '3 words',
    duration: '~1 min',
  },
]

export const gameById = (id) => GAMES.find((g) => g.id === id)
