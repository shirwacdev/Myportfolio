import SectionNotice from '../components/SectionNotice'

const ServicesSection = ({ services, loading, error }) => (
  <section id="services" className="px-4 py-20 sm:px-6 lg:px-8">
    <div className="mx-auto w-full max-w-6xl">
      <div className="text-center">
        <p className="section-kicker">Specializations</p>
        <h2 className="mt-3 text-3xl font-semibold text-[var(--text-primary)]">Service Offerings</h2>
      </div>

      {error ? <SectionNotice message={`Live data unavailable for services: ${error}`} /> : null}

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {(loading ? Array.from({ length: 4 }) : services.slice(0, 4)).map((service, index) => (
          <article
            key={service?._id || index}
            className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 shadow-[var(--shadow-soft)]"
          >
            {loading ? (
              <div className="space-y-3">
                <div className="h-4 w-16 rounded bg-[var(--surface-muted)]" />
                <div className="h-4 w-28 rounded bg-[var(--surface-muted)]" />
                <div className="h-3 w-full rounded bg-[var(--surface-muted)]" />
                <div className="h-3 w-5/6 rounded bg-[var(--surface-muted)]" />
              </div>
            ) : (
              <>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface-muted)] text-xs font-semibold text-[var(--brand-deep)]">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-sm font-semibold text-[var(--text-primary)]">{service.title}</h3>
                <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]">{service.description}</p>
              </>
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default ServicesSection
