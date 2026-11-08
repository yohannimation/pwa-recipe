import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, ApiError } from './client';

export type User = { id: number; username: string; role: string };
export const meKey = ['auth', 'me'] as const;

export function useMe() {
  return useQuery({
    queryKey: meKey,
    queryFn: async () => {
      try {
        return await api<User>('/auth/me');
      } catch (e) {
        if (e instanceof ApiError && e.status === 401) return null;
        throw e;
      }
    },
    staleTime: 5 * 60_000,
    retry: false,
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (body: { username: string; password: string }) =>
      api('/auth/register', { method: 'POST', body: body }),
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { username: string; password: string }) =>
      api<{ user: User }>('/auth/login', { method: 'POST', body: body }),
    onSuccess: ({ user }: { user: User }) => queryClient.setQueryData(meKey, user),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api('/auth/logout', { method: 'POST' }),
    onSettled: () => {
      queryClient.clear(); // Clears the entire cache (data from the previous user)
      queryClient.setQueryData(meKey, null);
    },
  });
}