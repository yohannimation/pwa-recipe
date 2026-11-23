export class ApiError extends Error {
  constructor(
    public status: number,
    public data: unknown
  ) {
    super(`API ${status}`)
  }
}

const NO_REFRESH = ['/auth/login', '/auth/register', '/auth/refresh']

let refreshPromise: Promise<boolean> | null = null

function refresh(): Promise<boolean> {
  // Shared promise : a single refresh, even if 5 requests receive a 401
  refreshPromise ??= fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include',
  })
    .then((response) => response.ok)
    .catch(() => false)
    .finally(() => {
      refreshPromise = null
    })
  return refreshPromise
}

type Options = Omit<RequestInit, 'body'> & { body?: unknown }

export async function api<T = unknown>(path: string, { body, ...init }: Options = {}): Promise<T> {
  const isFormData = body instanceof FormData

  const send = () =>
    fetch(`/api${path}`, {
      ...init,
      credentials: 'include',
      headers: {
        /**
         * JSON uniquely if 'body' is present AND is not a 'FormData'
         * (for a 'FormData', the browser add itself the Content-Type with the boundary)
         */
        ...(body !== undefined && !isFormData && { 'Content-Type': 'application/json' }),
        ...init.headers,
      },
      body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
    })

  let res = await send()

  if (res.status === 401 && !NO_REFRESH.includes(path)) {
    if (await refresh()) res = await send()
  }

  const data = await res.json().catch(() => null)
  if (!res.ok) throw new ApiError(res.status, data)
  return data as T
}
