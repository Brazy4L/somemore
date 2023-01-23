import { create } from 'zustand';

export const useStore = create((set) => ({
  pageMovie: 1,
  setPageMovie: () =>
    set((state: { pageMovie: number }) => ({ pageMovie: state.pageMovie + 1 })),
  pagesMovie: [],
  setPagesMovie: (entry: any) =>
    set((state: { pagesMovie: any }) => ({
      pagesMovie: [...state.pagesMovie, entry],
    })),
  pageTv: 1,
  setPageTv: () =>
    set((state: { pageTv: number }) => ({ pageTv: state.pageTv + 1 })),
  pagesTv: [],
  setPagesTv: (entry: any) =>
    set((state: { pagesTv: any }) => ({
      pagesTv: [...state.pagesTv, entry],
    })),
}));
