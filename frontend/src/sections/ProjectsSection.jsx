import SectionNotice from '../components/SectionNotice'

const ProjectsSection = ({ projects, loading, error }) => {
  const visibleProjects = loading ? Array.from({ length: 2 }) : projects.slice(0, 2)

  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-kicker">Portfolio</p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--text-primary)]">Featured Projects</h2>
          </div>
          <a href="#contact" className="text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--brand-primary)]">
            Explore All Work {'->'}
          </a>
        </div>

        {error ? <SectionNotice message={`Live data unavailable for projects: ${error}`} /> : null}

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {visibleProjects.map((project, index) => (
            <article
              key={project?._id || index}
              className="overflow-hidden rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface-card)] shadow-[var(--shadow-soft)]"
            >
              {loading ? (
                <div className="h-52 w-full bg-[var(--surface-muted)]" />
              ) : (
                <img src={project.image} alt={project.title} className="h-52 w-full object-cover" />
              )}

              <div className="p-5">
                {loading ? (
                  <div className="space-y-2.5">
                    <div className="h-3 w-16 rounded bg-[var(--surface-muted)]" />
                    <div className="h-4 w-2/3 rounded bg-[var(--surface-muted)]" />
                    <div className="h-3 w-full rounded bg-[var(--surface-muted)]" />
                  </div>
                ) : (
                  <>
                    <span className="inline-flex rounded-full bg-[var(--surface-muted)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      {project.category}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-[var(--text-primary)]">{project.title}</h3>
                    <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]">{project.description}</p>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
