import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type MoodLevel = 1 | 2 | 3 | 4 | 5; // 1 = very low, 5 = great
export type StressLevel = 1 | 2 | 3 | 4 | 5; // 1 = very low, 5 = very high

export type LoginMethod = 'guest' | 'email_code';

export interface User {
  id: string;
  method: LoginMethod;
  email?: string; // prototype: .mil email + code
  displayName: string;
  unit?: string; // optional, for leadership view grouping (squadron-level recommended)
  isLeader?: boolean;
}

export interface MoodEntry {
  id: string;
  createdAt: string; // ISO
  mood: MoodLevel;
  stress: StressLevel;
  energy: MoodLevel;
  sleep: MoodLevel;
  note?: string;
  tags?: string[];
}

export interface MindFlightState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  loginAsGuest: () => void;
  loginWithEmail: (email: string) => void;
  logout: () => void;
  setLeaderMode: (isLeader: boolean) => void;

  // Data
  entries: MoodEntry[];
  addEntry: (entry: Omit<MoodEntry, 'id' | 'createdAt'>) => void;
  deleteEntry: (id: string) => void;
  clearAllData: () => void;
}

function uid(prefix = 'id') {
  return `${prefix}-${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`;
}

export function getReflectionPrompt(mood: MoodLevel, stress: StressLevel) {
  // Narrow-scope, non-clinical prompts (no diagnosis / risk interpretation)
  if (mood <= 2 && stress >= 4) {
    return 'You’re carrying a lot today. What is one thing you can reduce, delegate, or postpone for 24 hours?';
  }
  if (mood <= 2) {
    return 'What’s one small thing that helped even a little today (music, a walk, a conversation, a task completed)?';
  }
  if (stress >= 4) {
    return 'What’s the biggest stress driver right now? Is it within your control, influence, or outside your control?';
  }
  if (mood >= 4 && stress <= 2) {
    return 'What went well today, and how can you set yourself up to repeat it tomorrow?';
  }
  return 'What’s one word that describes today, and why?';
}

export const useMindFlightStore = create<MindFlightState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      loginAsGuest: () => set({
        user: { id: uid('user'), method: 'guest', displayName: 'Guest', isLeader: false },
        isAuthenticated: true,
      }),

      loginWithEmail: (email) => set({
        user: { id: uid('user'), method: 'email_code', email, displayName: email.split('@')[0], isLeader: false },
        isAuthenticated: true,
      }),

      logout: () => set({ user: null, isAuthenticated: false }),

      setLeaderMode: (isLeader) => set((state) => ({
        user: state.user ? { ...state.user, isLeader } : state.user,
      })),

      entries: [],

      addEntry: (entry) => set((state) => ({
        entries: [
          { id: uid('entry'), createdAt: new Date().toISOString(), ...entry },
          ...state.entries,
        ],
      })),

      deleteEntry: (id) => set((state) => ({ entries: state.entries.filter(e => e.id !== id) })),

      clearAllData: () => set({ entries: [] }),
    }),
    {
      name: 'mindflight-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
