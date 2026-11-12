'use server';

import { cookies } from 'next/headers';

export async function serverApi<T>(path: string): Promise<T | null> {
  const cookie = (await cookies()).toString();
  const response = await fetch(`${process.env.INTERNAL_API_URL}${path}`, {
    headers: { cookie },
    cache: 'no-store',
  });
  return response.ok ? ((await response.json()) as T) : null;
}