import { RouteMeta, EncounterTable, GameMeta } from '@/types';

export async function loadGameData(gameId: string): Promise<GameMeta> {
  const response = await fetch(`/data/${gameId}/game.json`);
  if (!response.ok) throw new Error(`Failed to load game data for ${gameId}`);
  return response.json();
}

export async function loadRoutes(gameId: string): Promise<RouteMeta[]> {
  const response = await fetch(`/data/${gameId}/routes.json`);
  if (!response.ok) throw new Error(`Failed to load routes for ${gameId}`);
  const data = await response.json();
  return data.routes;
}

export async function loadEncounters(gameId: string): Promise<EncounterTable[]> {
  const response = await fetch(`/data/${gameId}/encounters.json`);
  if (!response.ok) throw new Error(`Failed to load encounters for ${gameId}`);
  const data = await response.json();
  return data.encounters;
}

export async function loadAllGameData(gameId: string) {
  const [game, routes, encounters] = await Promise.all([
    loadGameData(gameId),
    loadRoutes(gameId),
    loadEncounters(gameId),
  ]);

  return { game, routes, encounters };
}