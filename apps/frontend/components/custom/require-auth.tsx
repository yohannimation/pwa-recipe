'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/providers/auth-provider';

export function RequireAuth({ role, children }: { role?: string; children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!isLoading && !user) router.replace(`/login?next=${encodeURIComponent(path)}`);
  }, [isLoading, user, router, path]);

  if (isLoading || !user) return <p>Chargement</p>;
  if (role && user.role !== role) return <p>Accès refusé</p>;
  return <>{children}</>;
}