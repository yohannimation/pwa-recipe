'use client';

// app/debug-ssr/refresh-button.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api/client';

export function RefreshButton() {
  const router = useRouter();
  const [msg, setMsg] = useState('');

  async function refreshThenRerender() {
    try {
      await api('/auth/refresh', { method: 'POST' }); // le navigateur reçoit les nouveaux cookies
      setMsg('Refresh OK, re-rendu serveur demandé');
    } catch (e) {
      setMsg(`Refresh échoué : ${String(e)}`);
    }
    router.refresh(); // relance le Server Component avec les cookies à jour
  }

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <button onClick={() => router.refresh()}>Re-rendre la page</button>
      <button onClick={refreshThenRerender}>Refresh token puis re-rendre</button>
      {msg && <span style={{ fontSize: 13 }}>{msg}</span>}
    </div>
  );
}
