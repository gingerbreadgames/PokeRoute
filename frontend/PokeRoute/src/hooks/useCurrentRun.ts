import { useStore } from '@/store';
import { Run } from '@/types';

export function useCurrentRun(): Run | null {
  return useStore(state => state.getCurrentRun());
}