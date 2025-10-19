import { Season, EncounterMethod, EncounterResult, DuplicatesClause, GameVersion } from './enums';

export type UUID = string;

export interface User {
  id: UUID;
  username: string;
  email?: string;
}

export interface RunSettings {
  nuzlocke: boolean;
  duplicatesClause: DuplicatesClause;
  shinyCountsSeparate: boolean;
  staticAllowed: boolean;
}

export interface Run {
  id: UUID;
  userId: UUID;
  gameId: string;
  version: GameVersion;
  title?: string;
  startedAt: string;
  settings: RunSettings;
}

export interface RouteMeta {
  id: string;
  gameId: string;
  name: string;
  region: string;
  order: number;
  description?: string;
  tags?: string[];
}

export interface EncounterEntry {
  speciesId: number;
  speciesName: string;
  form?: string;
  minLevel?: number;
  maxLevel?: number;
  rate?: number;
  season?: Season[];
  versionExclusive?: GameVersion;
}

export interface EncounterTable {
  routeId: string;
  gameId: string;
  methodId: EncounterMethod;
  entries: EncounterEntry[];
}

export interface EncounterLog {
  id: UUID;
  runId: UUID;
  routeId: string;
  gameId: string;
  methodId: EncounterMethod;
  speciesId: number;
  speciesName: string;
  form?: string;
  shiny?: boolean;
  result: EncounterResult;
  level?: number;
  nickname?: string;
  notes?: string;
  season?: Season;
  occurredAt: string;
}

export interface GameMeta {
  id: string;
  name: string;
  generation: number;
  region: string;
  versions: GameVersion[];
  releaseYear: number;
}