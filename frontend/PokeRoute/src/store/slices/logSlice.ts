import { StateCreator } from 'zustand';
import { EncounterLog, EncounterMethod, EncounterResult, Season } from '@/types';
import { saveToStorage, loadFromStorage, StorageKeys } from '@/utils/storage';

export interface LogSlice {
  logs: EncounterLog[];
  
  addLog: (log: Omit<EncounterLog, 'id' | 'occurredAt'>) => EncounterLog;
  getLogsForRun: (runId: string) => EncounterLog[];
  getLogsForRoute: (runId: string, routeId: string) => EncounterLog[];
  deleteLog: (logId: string) => void;
  loadLogs: () => void;
}

export const createLogSlice: StateCreator<LogSlice> = (set, get) => ({
  logs: [],

  addLog: (log) => {
    const newLog: EncounterLog = {
      ...log,
      id: crypto.randomUUID(),
      occurredAt: new Date().toISOString(),
    };

    set(state => {
      const updatedLogs = [...state.logs, newLog];
      saveToStorage(StorageKeys.LOGS, updatedLogs);
      return { logs: updatedLogs };
    });

    return newLog;
  },

  getLogsForRun: (runId) => {
    return get().logs.filter(log => log.runId === runId);
  },

  getLogsForRoute: (runId, routeId) => {
    return get().logs.filter(log => log.runId === runId && log.routeId === routeId);
  },

  deleteLog: (logId) => {
    set(state => {
      const updatedLogs = state.logs.filter(log => log.id !== logId);
      saveToStorage(StorageKeys.LOGS, updatedLogs);
      return { logs: updatedLogs };
    });
  },

  loadLogs: () => {
    const logs = loadFromStorage<EncounterLog[]>(StorageKeys.LOGS) || [];
    set({ logs });
  },
});