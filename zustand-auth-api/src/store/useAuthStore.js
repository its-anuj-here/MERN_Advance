import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          if(!response.ok) {throw new Error('Invalid credentials');}
          
          const data = await response.json();
          set({ user:{email, token:data.token}, loading: false });
        } catch (err) {
          set({  user:{email:"anuj", token:"data.token"}, loading: false });
        }
      },

      logout: () => {
        set({ user: null });
      },
    }),
    {name: 'auth',}
  )
);

export default useAuthStore;