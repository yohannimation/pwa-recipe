'use client';

import { createContext, useContext, useMemo } from 'react';

import { useLogin, useLogout, useMe, type User } from '@/lib/api/auth';

type Ctx = {
  user: User | null;
  isLoading: boolean;
  login: ReturnType<typeof useLogin>['mutateAsync'];
  logout: ReturnType<typeof useLogout>['mutateAsync'];
};
const AuthContext = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const me = useMe();
  const login = useLogin();
  const logout = useLogout();
  const value = useMemo(
    () => ({ user: me.data ?? null, isLoading: me.isPending, login: login.mutateAsync, logout: logout.mutateAsync }),
    [me.data, me.isPending, login.mutateAsync, logout.mutateAsync],
  );
  return <AuthContext value={value}>{children}</AuthContext>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth hors AuthProvider');
  return ctx;
};