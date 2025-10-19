import { StateCreator } from 'zustand';
import { RouteMeta, EncounterTable, GameMeta } from '@/types';
import { loadAllGameData } from '@/data/loader';

export interface CatalogSlice {
  game: GameMeta | null;
  routes: RouteMeta[];
  encounters: EncounterTable[];
  isLoading: boolean;
  error: string | null;
  
  loadGameData: (gameId: string) => Promise<void>;
  getRouteById: (routeId: string) => RouteMeta | undefined;
  getEncountersForRoute: (routeId: string) => EncounterTable[];
}

export const createCatalogSlice: StateCreator<CatalogSlice> = (set, get) => ({
  game: null,
  routes: [],
  encounters: [],
  isLoading: false,
  error: null,

  loadGameData: async (gameId) => {
    set({ isLoading: true, error: null });
    
    try {
      const { game, routes, encounters } = await loadAllGameData(gameId);
      set({ 
        game, 
        routes: routes.sort((a, b) => a.order - b.order), 
        encounters,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load game data',
        isLoading: false 
      });
    }
  },

  getRouteById: (routeId) => {
    return get().routes.find(r => r.id === routeId);
  },

  getEncountersForRoute: (routeId) => {
    return get().encounters.filter(e => e.routeId === routeId);
  },
});