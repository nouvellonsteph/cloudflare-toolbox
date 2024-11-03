import { create } from 'zustand';

interface VideoState {
  apiToken: string;
  setApiToken: (token: string) => void;
  accountId: string;
  setAccountId: (accountId: string) => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  apiToken: '',
  setApiToken: (token) => set({ apiToken: token }),
  accountId: '',
  setAccountId: (accountId) => set({ accountId: accountId }),
}));
