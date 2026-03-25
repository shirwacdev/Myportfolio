const CodingActivitySection = ({ projectsCount }) => (
  <section id="activity" className="px-4 py-20 sm:px-6 lg:px-8">
    <div className="mx-auto w-full max-w-6xl">
      <div className="overflow-hidden rounded-[22px] border border-[#0e3f8a] bg-[var(--brand-deep)] px-6 py-7 text-white shadow-[var(--shadow-hard)] sm:px-10 sm:py-9">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-200">Coding Activity</p>
            <h3 className="mt-3 text-2xl font-semibold">Maintaining a high-velocity build rhythm.</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-sky-100/95">
              Consistently shipping code to open source and private production environments.
            </p>
            <div className="mt-6 flex flex-wrap gap-6">
              <div>
                <p className="text-2xl font-extrabold leading-none">10+</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-sky-200">Hours Coded</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold leading-none">{projectsCount}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-sky-200">Projects</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#1a4a95] bg-[#0f346f] p-4">
            <div className="grid grid-cols-10 gap-1.5">
              {Array.from({ length: 50 }).map((_, index) => (
                <span
                  key={index}
                  className={`h-2.5 rounded-sm ${
                    index % 4 === 0 || index % 7 === 0 ? 'bg-sky-300/95' : 'bg-sky-300/25'
                  }`}
                />
              ))}
            </div>
            <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.12em] text-sky-200">
              <span>Last Month</span>
              <span>Consistency</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default CodingActivitySection
