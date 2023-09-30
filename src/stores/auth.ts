import { create } from "zustand"
import { User } from "../types"

interface AuthState {
  isLogged: boolean
  setIsLogged: (v: boolean) => void
  user?: User | null
  setUser: (user: User | null) => void
  userId: number
  setUserId: (id: number) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  isLogged: false,
  setIsLogged: (v) => set((state) => ({ ...state, isLogged: v })),
  user: null,
  setUser: (user) => set((state) => ({ ...state, user })),
  userId: 0,
  setUserId: (id) => set((state) => ({ ...state, userId: id })),

  logout: () =>
    set((state) => ({ ...state, user: null, userId: 0, isLogged: false })),
}))
