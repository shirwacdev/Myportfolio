const SectionHeading = ({ eyebrow, title, description, center = false }) => (
  <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
    {eyebrow ? (
      <p className="font-code mb-3 inline-flex rounded-full border border-[var(--border-soft)] bg-[var(--surface-muted)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
        {eyebrow}
      </p>
    ) : null}
    <h2 className="font-heading text-balance text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
      {title}
    </h2>
    {description ? (
      <p className="mt-4 text-pretty text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
        {description}
      </p>
    ) : null}
  </div>
)

export default SectionHeading
