export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export type EncounterMethod = 
  | 'grass' 
  | 'dark-grass'
  | 'surf' 
  | 'fishing' 
  | 'cave'
  | 'dust-cloud'
  | 'bridge-shadow'
  | 'static'
  | 'gift';

export type EncounterResult = 'caught' | 'fainted' | 'escaped' | 'dupe';

export type DuplicatesClause = 'none' | 'species' | 'evolution-line';

export type GameVersion = 'black' | 'white';