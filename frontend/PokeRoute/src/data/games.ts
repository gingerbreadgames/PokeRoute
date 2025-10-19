import { GameMeta } from '@/types';

export const GAMES: Record<string, GameMeta> = {
  black: {
    id: 'black',
    name: 'Pokémon Black',
    generation: 5,
    region: 'Unova',
    versions: ['black'],
    releaseYear: 2011,
  },
};

export const getGame = (gameId: string): GameMeta | undefined => {
  return GAMES[gameId];
};