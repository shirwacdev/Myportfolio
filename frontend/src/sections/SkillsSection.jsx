import SectionNotice from '../components/SectionNotice'

const EXCLUDED_SKILLS = new Set(['Git / CI-CD'])

const SkillsSection = ({ skills, loading, error }) => {
  const filteredSkills = skills.filter((skill) => !EXCLUDED_SKILLS.has(skill.name))
  const visibleSkills = loading ? Array.from({ length: 6 }) : filteredSkills.slice(0, 6)

  return (
    <section id="skills" className="bg-[var(--section-alt)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="section-kicker">Technology</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[var(--text-primary)]">
              Technologies I
              <br />
              Mastered
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
              My toolkit is curated for modern performance and enterprise-grade reliability.
            </p>

            <article className="mt-6 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-5">
              <p className="section-kicker text-[var(--brand-primary)]">Main Stack</p>
              <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]">
                Primary focus on TypeScript, React, Tailwind CSS, Node.js, MongoDB, and deployment-ready architecture.
              </p>
            </article>
          </div>

          <div>
            {error ? <SectionNotice message={`Live data unavailable for skills: ${error}`} /> : null}
            <div className="grid gap-4 sm:grid-cols-2">
              {visibleSkills.map((skill, index) => (
                <article
                  key={skill?._id || index}
                  className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-4"
                >
                  {loading ? (
                    <div className="space-y-2.5">
                      <div className="h-4 w-20 rounded bg-[var(--surface-muted)]" />
                      <div className="h-2 w-full rounded bg-[var(--surface-muted)]" />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.04em] text-[var(--text-primary)]">
                          {skill.name}
                        </h3>
                        <span className="text-xs font-semibold text-[var(--brand-primary)]">{skill.level}%</span>
                      </div>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                        <div
                          className="h-full rounded-full bg-[var(--brand-primary)]"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
