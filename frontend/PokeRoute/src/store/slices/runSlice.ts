import { StateCreator } from 'zustand';
import { Run, RunSettings, GameVersion } from '@/types';
import { saveToStorage, loadFromStorage, StorageKeys } from '@/utils/storage';

export interface RunSlice {
  runs: Run[];
  currentRunId: string | null;
  
  createRun: (gameId: string, version: GameVersion, settings: RunSettings, title?: string) => Run;
  setCurrentRun: (runId: string) => void;
  getCurrentRun: () => Run | null;
  deleteRun: (runId: string) => void;
  loadRuns: () => void;
}

export const createRunSlice: StateCreator<RunSlice> = (set, get) => ({
  runs: [],
  currentRunId: null,

  createRun: (gameId, version, settings, title) => {
    const newRun: Run = {
      id: crypto.randomUUID(),
      userId: 'demo-user',
      gameId,
      version,
      title: title || `${gameId} - ${new Date().toLocaleDateString()}`,
      startedAt: new Date().toISOString(),
      settings,
    };

    set(state => {
      const updatedRuns = [...state.runs, newRun];
      saveToStorage(StorageKeys.RUNS, updatedRuns);
      saveToStorage(StorageKeys.CURRENT_RUN_ID, newRun.id);
      return { runs: updatedRuns, currentRunId: newRun.id };
    });

    return newRun;
  },

  setCurrentRun: (runId) => {
    set({ currentRunId: runId });
    saveToStorage(StorageKeys.CURRENT_RUN_ID, runId);
  },

  getCurrentRun: () => {
    const { runs, currentRunId } = get();
    return runs.find(r => r.id === currentRunId) || null;
  },

  deleteRun: (runId) => {
    set(state => {
      const updatedRuns = state.runs.filter(r => r.id !== runId);
      const newCurrentId = state.currentRunId === runId ? null : state.currentRunId;
      
      saveToStorage(StorageKeys.RUNS, updatedRuns);
      saveToStorage(StorageKeys.CURRENT_RUN_ID, newCurrentId);
      
      return { runs: updatedRuns, currentRunId: newCurrentId };
    });
  },

  loadRuns: () => {
    const runs = loadFromStorage<Run[]>(StorageKeys.RUNS) || [];
    const currentRunId = loadFromStorage<string>(StorageKeys.CURRENT_RUN_ID);
    set({ runs, currentRunId });
  },
});