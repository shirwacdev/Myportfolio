import SectionHeading from '../components/SectionHeading'
import SectionNotice from '../components/SectionNotice'

const TestimonialsSection = ({ testimonials, loading, error }) => (
  <section id="testimonials" className="px-4 py-24 sm:px-6 lg:px-8">
    <div className="mx-auto w-full max-w-7xl">
      <SectionHeading
        eyebrow="Testimonials"
        title="Client trust built through delivery."
        description="Feedback from product teams and stakeholders I have partnered with."
      />
      {error ? <SectionNotice message={`Live data unavailable for testimonials: ${error}`} /> : null}

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {(loading ? Array.from({ length: 2 }) : testimonials).map((item, index) => (
          <article
            key={item?._id || index}
            className="rounded-[1.8rem] border border-[var(--border-soft)] bg-[var(--surface-card)] p-7 shadow-[var(--shadow-soft)]"
          >
            {loading ? (
              <div className="space-y-3">
                <div className="h-5 w-full rounded bg-[var(--surface-muted)]" />
                <div className="h-5 w-5/6 rounded bg-[var(--surface-muted)]" />
                <div className="h-4 w-40 rounded bg-[var(--surface-muted)]" />
              </div>
            ) : (
                <>
                  <p className="text-sm leading-relaxed text-[var(--text-primary)]">“{item.quote}”</p>
                  <div className="mt-6 border-t border-[var(--border-soft)] pt-4">
                    <p className="text-base font-semibold text-[var(--text-primary)]">{item.clientName}</p>
                    <p className="font-code text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      {item.role}, {item.company}
                    </p>
                  </div>
                </>
              )}
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default TestimonialsSection
