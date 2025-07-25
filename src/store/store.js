import { create } from 'zustand'

export const usePlayer = create((set) => ({
  activePart: {},
  isPlaying: false,
  updateActivePart: (newPart) => set({ activePart: newPart }),
  updateIsPlaying: (boolean) => set({ isPlaying: boolean }),
}))
