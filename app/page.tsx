import { PixelLens } from "./components/PixelLens";

const projects = [
  {
    number: "01",
    title: "Canvas Native Lab",
    summary:
      "An interactive field guide to the experimental HTML-in-Canvas API, built around progressive enhancement, accessibility, and real browser behavior.",
    signal: "16 interactive capability studies",
    tags: ["Web platform", "Canvas", "Accessibility"],
    live: "https://pablodcruz.github.io/html-in-canvas-lab/",
    source: "https://github.com/pablodcruz/html-in-canvas-lab",
  },
  {
    number: "02",
    title: "Data Analytics Learning Lab",
    summary:
      "A synthetic product-growth environment for practicing data-quality checks, metric reasoning, dashboards, and decision-ready reporting.",
    signal: "Source-backed, reproducible analysis",
    tags: ["Analytics", "Data quality", "Decision systems"],
    source:
      "https://github.com/pablodcruz/data-analytics-plugin-learning-lab",
  },
  {
    number: "03",
    title: "Data Engineering Workbench",
    summary:
      "A hands-on collection of streaming, Spark, Airflow, Docker, and data-quality exercises designed to make distributed systems observable and testable.",
    signal: "From event ingestion to orchestrated outputs",
    tags: ["PySpark", "Airflow", "Streaming"],
    source: "https://github.com/pablodcruz/20260629-data-engineering",
  },
  {
    number: "04",
    title: "Clanker Build Journal",
    summary:
      "A public operating journal for AI-native workflows: experiments, design decisions, prototypes, telemetry, and what changed after each build cycle.",
    signal: "Shipping decisions in public",
    tags: ["Agent workflows", "Next.js", "Operations"],
    live: "https://clanker-site.vercel.app",
    source: "https://github.com/PabloDeLaCruz1/clanker-site",
  },
];

const practices = [
  {
    number: "01",
    title: "Build for inspection",
    body: "Make state, constraints, and failure modes visible. A system should be understandable before it is impressive.",
  },
  {
    number: "02",
    title: "Teach through artifacts",
    body: "Turn explanations into labs, testable examples, rubrics, and reference implementations that people can actually use.",
  },
  {
    number: "03",
    title: "Design for the fallback",
    body: "Treat accessibility, recovery, synthetic fixtures, and bounded permissions as first-class product behavior.",
  },
];

export default function Home() {
  return (
    <main>
      <PixelLens />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Pablo De La Cruz, home">
          <span className="brand-mark" aria-hidden="true">
            PD
          </span>
          <span>Pablo De La Cruz</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#practice">Practice</a>
          <a href="#about">About</a>
        </nav>
        <a
          className="header-link"
          href="https://www.linkedin.com/in/pdelac01/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" />
            Technical trainer · software engineer
          </p>
          <h1>
            I turn complex systems into things people can{" "}
            <em>use, test, and learn from.</em>
          </h1>
          <p className="hero-lede">
            I&apos;m a Technical Trainer at Revature who builds practical AI,
            data, cloud, and web experiences—with an emphasis on reliability,
            clear teaching, and evidence that the work actually runs.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Explore selected work <span aria-hidden="true">↓</span>
            </a>
            <a
              className="button button-secondary"
              href="https://github.com/pablodcruz"
              target="_blank"
              rel="noreferrer"
            >
              GitHub profile <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <aside className="signal-panel" aria-label="Core practice areas">
          <div className="panel-topline">
            <span>practice-map.json</span>
            <span>LIVE</span>
          </div>
          <p className="panel-kicker">Three connected modes</p>
          <div className="signal-row">
            <span className="signal-index">01</span>
            <div>
              <strong>Build</strong>
              <span>AI systems · data pipelines · interfaces</span>
            </div>
          </div>
          <div className="signal-row">
            <span className="signal-index">02</span>
            <div>
              <strong>Teach</strong>
              <span>Labs · workshops · technical narratives</span>
            </div>
          </div>
          <div className="signal-row">
            <span className="signal-index">03</span>
            <div>
              <strong>Operate</strong>
              <span>Tests · traces · recovery · guardrails</span>
            </div>
          </div>
          <div className="panel-status">
            <span className="pulse" />
            <span>Independent projects · views are my own</span>
          </div>
        </aside>
      </section>

      <section className="proof-strip" aria-label="Professional summary">
        <div>
          <strong>Hundreds</strong>
          <span>of engineers mentored</span>
        </div>
        <div>
          <strong>Build + teach</strong>
          <span>one connected practice</span>
        </div>
        <div>
          <strong>Reliable by design</strong>
          <span>tests, fallbacks, and clear boundaries</span>
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work / 2026</p>
            <h2>Systems with something to prove.</h2>
          </div>
          <p>
            Public projects selected for technical depth, useful interaction,
            and a clear learning or operating outcome.
          </p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-number">{project.number}</div>
              <div className="project-main">
                <div className="project-title-row">
                  <h3>{project.title}</h3>
                  <span className="project-signal">{project.signal}</span>
                </div>
                <p>{project.summary}</p>
                <ul className="tag-list" aria-label={`${project.title} topics`}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              <div className="project-links">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer">
                    Live project <span aria-hidden="true">↗</span>
                  </a>
                )}
                <a href={project.source} target="_blank" rel="noreferrer">
                  Source <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section practice-section" id="practice">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Working principles</p>
            <h2>Useful before flashy.</h2>
          </div>
          <p>
            The same principles shape the software, the learning experience,
            and the way results are communicated.
          </p>
        </div>
        <div className="practice-grid">
          {practices.map((practice) => (
            <article key={practice.title}>
              <span>{practice.number}</span>
              <h3>{practice.title}</h3>
              <p>{practice.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="about-intro">
          <p className="eyebrow">About</p>
          <h2>
            Engineer&apos;s curiosity.
            <br />
            Educator&apos;s clarity.
          </h2>
        </div>
        <div className="about-copy">
          <p>
            My work sits where software engineering and developer education
            meet. I&apos;ve supported engineers across AI, data, cloud,
            full-stack, and mobile development—often by translating a complex
            system into a sequence people can inspect, practice, and own.
          </p>
          <p>
            I&apos;m especially interested in reliable AI applications,
            agent-assisted engineering, data systems, and interfaces that make
            hidden behavior visible.
          </p>
          <div className="capability-cloud" aria-label="Capabilities">
            <span>AI applications</span>
            <span>RAG & retrieval</span>
            <span>Data engineering</span>
            <span>Developer tooling</span>
            <span>Technical curriculum</span>
            <span>Cloud & operations</span>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <p className="eyebrow">Open channel</p>
        <h2>Let&apos;s compare notes.</h2>
        <p>
          For conversations about developer education, AI systems, data
          engineering, or open-source learning projects.
        </p>
        <div className="contact-links">
          <a href="mailto:pablo.de.la.cruz.pro@gmail.com">
            Email <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://www.linkedin.com/in/pdelac01/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://github.com/pablodcruz"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer>
        <span>© 2026 Pablo De La Cruz</span>
        <span>Built as an independent portfolio.</span>
      </footer>
    </main>
  );
}
