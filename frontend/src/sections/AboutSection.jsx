const AboutSection = () => (
  <section id="about" className="bg-[var(--section-alt)] px-4 py-20 sm:px-6 lg:px-8">
    <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.08fr_0.92fr]">
      <div>
        <p className="section-kicker">About Me</p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight text-[var(--text-primary)] sm:text-4xl">
          Bridging the gap between complex logic and user-centric design.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-muted)]">
          With over half a decade of professional experience, I specialize in architecting systems that are not
          only robust and secure but also intuitive and performant.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">My Philosophy</h3>
            <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]">
              Code should solve real-world needs, efficient and maintainable.
            </p>
          </article>
          <article className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">My Mission</h3>
            <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]">
              Turn complex business challenges into thoughtful web-first systems.
            </p>
          </article>
        </div>
      </div>

      <div>
        <article className="rounded-3xl border border-[#0f3a87] bg-[var(--brand-deep)] p-6 text-white shadow-[var(--shadow-hard)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-200">Core Promise</p>
          <h3 className="mt-3 text-xl font-semibold">Deliver production-ready code that scales with your growth.</h3>
          <p className="mt-3 text-sm leading-6 text-sky-100/95">
            I prioritize reliability, security, and maintainability while keeping every product decision aligned
            with your broader goals.
          </p>
        </article>

        <article className="mt-4 rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-muted)] text-xs font-semibold text-[var(--brand-deep)]">
              SD
            </span>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Shirwac Dev</p>
              <p className="text-xs text-[var(--text-muted)]">Developer</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">
            "Building for users, one performant pixel at a time."
          </p>
        </article>
      </div>
    </div>
  </section>
)

export default AboutSection
