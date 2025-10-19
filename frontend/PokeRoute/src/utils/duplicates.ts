import { EncounterLog, DuplicatesClause } from '@/types';

export function isDuplicate(
  speciesId: number,
  existingLogs: EncounterLog[],
  clause: DuplicatesClause,
  evolutionMap?: Map<number, number[]>
): boolean {
  if (clause === 'none') return false;

  const caughtSpecies = existingLogs
    .filter(log => log.result === 'caught')
    .map(log => log.speciesId);

  if (clause === 'species') {
    return caughtSpecies.includes(speciesId);
  }

  if (clause === 'evolution-line' && evolutionMap) {
    const evolutionLine = getEvolutionLine(speciesId, evolutionMap);
    return caughtSpecies.some(id => evolutionLine.includes(id));
  }

  return false;
}

function getEvolutionLine(
  speciesId: number,
  evolutionMap: Map<number, number[]>
): number[] {
  const line = new Set<number>([speciesId]);
  const queue = [speciesId];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const related = evolutionMap.get(current) || [];
    
    for (const relatedId of related) {
      if (!line.has(relatedId)) {
        line.add(relatedId);
        queue.push(relatedId);
      }
    }
  }

  return Array.from(line);
}