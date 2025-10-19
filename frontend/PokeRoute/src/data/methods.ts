import { EncounterMethod } from '@/types';

export interface MethodInfo {
  id: EncounterMethod;
  label: string;
  description: string;
  icon: string;
}

export const ENCOUNTER_METHODS: Record<EncounterMethod, MethodInfo> = {
  grass: {
    id: 'grass',
    label: 'Grass',
    description: 'Walking in tall grass',
    icon: '🌿',
  },
  'dark-grass': {
    id: 'dark-grass',
    label: 'Dark Grass',
    description: 'Walking in darker rustling grass',
    icon: '🌿✨',
  },
  surf: {
    id: 'surf',
    label: 'Surfing',
    description: 'Surfing on water',
    icon: '🌊',
  },
  fishing: {
    id: 'fishing',
    label: 'Fishing',
    description: 'Using a fishing rod',
    icon: '🎣',
  },
  cave: {
    id: 'cave',
    label: 'Cave',
    description: 'Walking in caves',
    icon: '⛰️',
  },
  'dust-cloud': {
    id: 'dust-cloud',
    label: 'Dust Cloud',
    description: 'Special dust cloud encounters',
    icon: '💨',
  },
  'bridge-shadow': {
    id: 'bridge-shadow',
    label: 'Bridge Shadow',
    description: 'Shadows under bridges',
    icon: '🌉',
  },
  static: {
    id: 'static',
    label: 'Static',
    description: 'Fixed overworld encounters',
    icon: '⭐',
  },
  gift: {
    id: 'gift',
    label: 'Gift',
    description: 'Gifted Pokémon',
    icon: '🎁',
  },
};

export const getMethod = (methodId: EncounterMethod): MethodInfo => {
  return ENCOUNTER_METHODS[methodId];
};