
// Server Component : aucun 'use client'. Page de test TEMPORAIRE.

import { cookies } from 'next/headers';
import { RefreshButton } from './refresh-button';

export const dynamic = 'force-dynamic';

async function probe(path: string) {
  const store = await cookies();
  const started = Date.now();
  try {
    const res = await fetch(`${process.env.INTERNAL_API_URL}${path}`, {
      headers: { cookie: store.toString() }, // relais des cookies du navigateur
      cache: 'no-store',
    });
    const data = await res.json().catch(() => null);
    return { ok: res.ok, status: res.status, data, ms: Date.now() - started };
  } catch (e) {
    return { ok: false, status: 0, data: { error: String(e) }, ms: Date.now() - started };
  }
}

export default async function DebugSsrPage() {
  const store = await cookies();
  const cookieNames = store.getAll().map((c) => c.name); // noms seulement, jamais les valeurs
  const me = await probe('/categories');

  return (
    <main style={{ maxWidth: 720, margin: '2rem auto', padding: '0 1rem', fontFamily: 'sans-serif' }}>
      <h1>Test SSR (Server Component)</h1>
      <p style={{ color: '#666' }}>
        Rendu à {new Date().toLocaleTimeString('fr-FR')} côté serveur.
      </p>

      <section style={box}>
        <h2 style={h2}>Configuration</h2>
        <p>
          INTERNAL_API_URL : <code>{process.env.INTERNAL_API_URL ?? '(non définie)'}</code>
        </p>
      </section>

      <section style={box}>
        <h2 style={h2}>Cookies reçus par Next pour cette page</h2>
        <p>
          <code>{cookieNames.length ? cookieNames.join(', ') : '(aucun)'}</code>
        </p>
        <p>
          access_token présent : <b>{String(cookieNames.includes('access_token'))}</b>
        </p>
      </section>

      <section style={box}>
        <h2 style={h2}>GET /auth/me depuis le serveur</h2>
        <p>
          Statut : <b style={{ color: me.ok ? '#2e7d32' : '#c62828' }}>{me.status}</b> ({me.ms} ms)
        </p>
        <pre style={pre}>{JSON.stringify(me.data, null, 2)}</pre>
      </section>

      <section style={box}>
        <h2 style={h2}>Rejouer</h2>
        <RefreshButton />
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
const pre: React.CSSProperties = { background: '#f6f6f6', padding: 8, fontSize: 13, whiteSpace: 'pre-wrap' };
