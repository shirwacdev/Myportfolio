import SectionNotice from '../components/SectionNotice'

const JourneySection = ({ experience, testimonials, loading, error }) => {
  const visibleExperience = loading ? Array.from({ length: 3 }) : experience.slice(0, 3)
  const featuredTestimonial = testimonials?.[0]

  return (
    <section id="journey" className="bg-[var(--section-alt)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="section-kicker">Timeline</p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--text-primary)]">Professional Journey</h2>
            {error ? <SectionNotice message={`Live data unavailable for journey: ${error}`} /> : null}

            <div className="relative mt-8 border-l border-[var(--border-soft)] pl-5 sm:pl-7">
              {visibleExperience.map((item, index) => (
                <article key={item?._id || index} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[1.55rem] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--brand-primary)] sm:-left-[2.05rem]" />
                  {loading ? (
                    <div className="space-y-2.5 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-4">
                      <div className="h-3 w-20 rounded bg-[var(--surface-muted)]" />
                      <div className="h-4 w-40 rounded bg-[var(--surface-muted)]" />
                      <div className="h-3 w-full rounded bg-[var(--surface-muted)]" />
                    </div>
                  ) : (
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-primary)]">
                        {item.year}
                      </p>
                      <h3 className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{item.role}</h3>
                      <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">{item.company}</p>
                      <p className="mt-3 text-xs leading-6 text-[var(--text-muted)]">{item.description}</p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-6 shadow-[var(--shadow-soft)]">
            <p className="section-kicker">Client Testimonials</p>
            <h3 className="mt-3 text-lg font-semibold text-[var(--text-primary)]">Client Testimonials</h3>

            {featuredTestimonial ? (
              <>
                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">"{featuredTestimonial.quote}"</p>
                <div className="mt-6 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{featuredTestimonial.clientName}</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {featuredTestimonial.role}, {featuredTestimonial.company}
                  </p>
                </div>
              </>
            ) : (
              <p className="mt-4 text-sm text-[var(--text-muted)]">
                Testimonials will appear here once fetched from your backend.
              </p>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}

export default JourneySection
