'use client';

// Page de test TEMPORAIRE : à supprimer avant la mise en production.

import { useState } from 'react';
import { useAuth } from '@/providers/auth-provider';
import { useRegister } from '@/lib/api/auth';
import { api, ApiError } from '@/lib/api/client';

type LogEntry = { id: number; time: string; label: string; ok: boolean; detail: string };

let nextId = 0;

export default function DebugAuthPage() {
  const { user, isLoading, login, logout } = useAuth();
  const register = useRegister();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);

  function addLog(label: string, ok: boolean, detail: string) {
    const entry: LogEntry = {
      id: nextId++,
      time: new Date().toLocaleTimeString('fr-FR'),
      label,
      ok,
      detail,
    };
    setLogs((l) => [entry, ...l]);
  }

  async function run(label: string, fn: () => Promise<unknown>) {
    try {
      const data = await fn();
      addLog(label, true, JSON.stringify(data ?? null, null, 2));
    } catch (e) {
      if (e instanceof ApiError) {
        addLog(label, false, `HTTP ${e.status}\n${JSON.stringify(e.data, null, 2)}`);
      } else {
        addLog(label, false, String(e));
      }
    }
  }

  const creds = { username, password };

  return (
    <main style={{ maxWidth: 720, margin: '2rem auto', padding: '0 1rem', fontFamily: 'sans-serif' }}>
      <h1>Test auth (provider + React Query)</h1>

      <section style={box}>
        <h2 style={h2}>État du AuthProvider</h2>
        <p>
          isLoading : <b>{String(isLoading)}</b>
        </p>
        <p>
          user : <code>{user ? JSON.stringify(user) : 'null (non connecté)'}</code>
        </p>
      </section>

      <section style={box}>
        <h2 style={h2}>Identifiants</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
      </section>

      <section style={box}>
        <h2 style={h2}>Actions</h2>
        <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
          <button onClick={() => run('register', () => register.mutateAsync(creds))}>
            Register
          </button>
          <button onClick={() => run('login', () => login(creds))}>Login</button>
          <button onClick={() => run('logout', () => logout())}>Logout</button>
          <button onClick={() => run('GET /auth/me', () => api('/auth/me'))}>
            GET /auth/me
          </button>
          <button
            onClick={() => run('POST /auth/refresh', () => api('/auth/refresh', { method: 'POST' }))}
          >
            POST /auth/refresh
          </button>
          <button
            onClick={() =>
              run('5x /auth/me en parallèle', () =>
                Promise.allSettled(Array.from({ length: 5 }, () => api('/auth/me'))).then((r) =>
                  r.map((x) => x.status),
                ),
              )
            }
          >
            5 requêtes en parallèle
          </button>
        </div>
        <p style={{ fontSize: 13, color: '#666', marginTop: "20px" }}>
          Pour tester le refresh automatique : connectez-vous, supprimez le cookie
          <code> access_token</code> dans DevTools (Application → Cookies), puis cliquez sur
          « GET /auth/me » ou « 5 requêtes en parallèle ». Dans l'onglet Network, vous devez voir
          un seul <code>POST /api/auth/refresh</code>, puis les requêtes rejouées.
        </p>
      </section>

      <section style={box}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={h2}>Journal</h2>
          <button onClick={() => setLogs([])}>Effacer</button>
        </div>
        {logs.length === 0 && <p style={{ color: '#666' }}>Aucune action pour l'instant.</p>}
        {logs.map((l) => (
          <div
            key={l.id}
            style={{
              borderLeft: `4px solid ${l.ok ? '#2e7d32' : '#c62828'}`,
              padding: '4px 8px',
              margin: '8px 0',
              background: '#f6f6f6',
            }}
          >
            <b>
              [{l.time}] {l.label} — {l.ok ? 'OK' : 'ERREUR'}
            </b>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: 13 }}>{l.detail}</pre>
          </div>
        ))}
      </section>
    </main>
  );
}

const box: React.CSSProperties = {
  border: '1px solid #ddd',
  borderRadius: 6,
  padding: '0.5rem 1rem',
  margin: '1rem 0',
};
const h2: React.CSSProperties = { fontSize: 16, margin: '0.5rem 0' };
