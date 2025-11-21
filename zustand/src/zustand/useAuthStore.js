import { create } from "zustand";
import { persist } from "zustand/middleware";
import supabase from "../supabase/supabaseClient";

const useAuthStore = create(
  persist(
    (set) => ({
      userEmail: null,
      isLogin: false,

      // 로그인
      login: async ({ email, password }) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        set({
          userEmail: data.user.email,
          isLogin: true,
        });
      },

      // 로그아웃
      logout: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        set({
          userEmail: null,
          isLogin: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
