import { create } from 'zustand';
import { createRunSlice, RunSlice } from './slices/runSlice';
import { createLogSlice, LogSlice } from './slices/logSlice';
import { createCatalogSlice, CatalogSlice } from './slices/catalogSlice';

type StoreState = RunSlice & LogSlice & CatalogSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...createRunSlice(...a),
  ...createLogSlice(...a),
  ...createCatalogSlice(...a),
}));