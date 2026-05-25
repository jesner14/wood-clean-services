export function SupabaseConfigBanner() {
  return (
    <div
      style={{
        background: '#fef3c7',
        borderBottom: '1px solid #f59e0b',
        padding: '12px 24px',
        fontSize: '14px',
        color: '#92400e',
        textAlign: 'center',
      }}
    >
      <strong>Configuration Supabase manquante.</strong> Copiez vos clés depuis le dashboard Supabase
      dans le fichier <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>.env.local</code>{' '}
      (voir <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>.env.example</code>
      ), puis redémarrez le serveur (<code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>pnpm dev</code>).
    </div>
  );
}
