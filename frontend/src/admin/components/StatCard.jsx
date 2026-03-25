const StatCard = ({ label, value, helper }) => (
  <article className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 shadow-[var(--shadow-soft)]">
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">{label}</p>
    <p className="mt-2 text-3xl font-extrabold leading-none text-[var(--text-primary)]">{value}</p>
    {helper ? <p className="mt-2 text-xs text-[var(--text-muted)]">{helper}</p> : null}
  </article>
)

export default StatCard
