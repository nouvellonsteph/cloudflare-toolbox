import { create } from 'zustand';

interface VideoState {
  apiToken: string;
  setApiToken: (token: string) => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  apiToken: '',
  setApiToken: (token) => set({ apiToken: token }),
}));