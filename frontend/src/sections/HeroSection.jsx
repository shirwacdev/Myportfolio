import { SOCIAL_LINKS } from '../utils/constants'
import profileImage from '../assets/b.jpg.png'

const PROFILE_IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=900&q=80'

const HeroSection = () => (
  <section id="home" className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
    <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--surface-card)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-primary)]" />
          Available for freelance projects
        </p>

        <h1 className="font-heading mt-5 text-5xl font-extrabold leading-[0.98] tracking-[-0.02em] text-[var(--text-primary)] sm:text-6xl">
          Crafting <span className="text-[var(--brand-primary)]">Digital</span>
          <br />
          Architectures.
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text-muted)] sm:text-base">
          I am Shirwac, a developer focused on building scalable, high-performance web solutions where
          technical precision meets polished aesthetics.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-full bg-[var(--brand-deep)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--brand-strong)]"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-[var(--border-soft)] bg-[var(--surface-card)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
          >
            Contact Me
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-primary)]" />
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[380px] lg:justify-self-end">
        <div className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-card)] p-2 shadow-[var(--shadow-hard)]">
          <div className="overflow-hidden rounded-[18px] bg-white">
            <img
              src={profileImage}
              alt="Shirwac Dev portrait"
              className="h-[420px] w-full object-contain object-bottom"
              onError={(event) => {
                event.currentTarget.src = PROFILE_IMAGE_FALLBACK
                event.currentTarget.classList.add('object-cover')
              }}
            />
          </div>
        </div>

        <div className="absolute -bottom-5 left-4 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)] px-4 py-2.5 shadow-[var(--shadow-soft)]">
          <p className="text-lg font-extrabold leading-none text-[var(--text-primary)]">1+</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Years of Experience
          </p>
        </div>
      </div>
    </div>
  </section>
)

export default HeroSection
