export class ApiError extends Error {
    constructor(public status: number, public data: unknown) {
      super(`API ${status}`);
    }
  }
  
  const NO_REFRESH = ['/auth/login', '/auth/register', '/auth/refresh'];
  
  let refreshPromise: Promise<boolean> | null = null;
  
  function refresh(): Promise<boolean> {
    // Shared promise : a single refresh, even if 5 requests receive a 401
    refreshPromise ??= fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => response.ok)
      .catch(() => false)
      .finally(() => {
        refreshPromise = null;
      });
    return refreshPromise;
  }
  
  type Options = Omit<RequestInit, 'body'> & { body?: unknown };
  
  export async function api<T = unknown>(path: string, { body, ...init }: Options = {}): Promise<T> {
    const send = () =>
      fetch(`/api${path}`, {
        ...init,
        credentials: 'include',
        // Content-Type only if there is a body (otherwise, Fastify rejects an empty JSON)
        headers: { ...(body !== undefined && { 'Content-Type': 'application/json' }), ...init.headers },
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });
  
    let res = await send();
  
    if (res.status === 401 && !NO_REFRESH.includes(path)) {
      if (await refresh()) res = await send();
    }
  
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new ApiError(res.status, data);
    return data as T;
  }