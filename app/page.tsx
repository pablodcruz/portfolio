import { projects } from "./content/projects";
import { ArtPlate } from "./components/ArtPlate";
import { Header, Footer } from "./components/SiteFurniture";

export default function Home() {
  return <div id="top"><Header/><main id="content" tabIndex={-1}>
    <section className="atelier" aria-labelledby="title">
      <ArtPlate/>
      <div className="ateliershade" aria-hidden="true"/>
      <div className="wrap atelierinner"><div className="hero-copy"><span className="micro"><i/>Independent project index</span>
        <h1 id="title">Pablo<br/><em>De La Cruz.</em></h1>
        <p>I build software and teach people how it works. Here are the tools, experiments and lessons you can try for yourself.</p>
        <a className="inkbutton" href="#work">Explore the projects <span aria-hidden="true">↓</span></a>
      </div></div>
      <div className="artcredit"><span>Plate 01</span> <span>Section study / glass, stone, vellum</span></div>
    </section>
    <section className="paper"><div id="work" className="wrap work section">
      <div className="sectionhead"><div><span className="micro">01 / Portfolio</span><h2>Project index<span>.</span></h2></div><p>Open the work, read the source, or expand an entry to see the engineering question behind it.</p></div>
      <div className="indexline micro"><span>Selected projects</span><span>{String(projects.length).padStart(2,"0")} entries</span></div>
      {projects.map((p,i)=><article key={p.id} id={p.id} className="entry">
        <div className="seq micro">{String(i+1).padStart(2,"0")}</div>
        <div className="entrytext"><span className="micro medium">{p.medium}</span><h3>{p.name}</h3><p>{p.summary}</p>
        <details><summary>Inside this project</summary><div className="entrynote"><h4>{p.question}</h4><p>{p.walkthrough}</p>{p.evidence&&<a href={p.evidence}>Inspect the source at this revision ↗</a>}</div></details></div>
        <div className="entrylinks"><span className="stamp">{p.status}</span>{p.demo&&<a href={p.demo.url}>{p.demo.label} ↗</a>}{p.source&&<a href={p.source}>Repository ↗</a>}</div>
      </article>)}
    </div></section>
    <section className="practice section" id="practice"><div className="wrap"><span className="micro">02 / Practice</span><h2>How I work<span>.</span></h2><div className="steps">
      <article><span className="micro">A / Isolate</span><h3>Start with one question.</h3><p>The Canvas lab keeps the control surface in HTML. That makes it possible to ask what the renderer changes without redesigning the entire interface.</p><a href="#canvas">Canvas Native Lab ↑</a></article>
      <article><span className="micro">B / Trace</span><h3>Keep the input in reach.</h3><p>In the analytics lab a reader can inspect the fixture and SQL, rather than taking a chart or a written conclusion on trust.</p><a href="#analytics">Analytics Learning Lab ↑</a></article>
      <article><span className="micro">C / Check</span><h3>Name the passing result.</h3><p>The pabStack work log separates what was tested from what actually shipped. A review branch is evidence of progress, not a release.</p><a href="#work-log">pabStack Work Log ↑</a></article>
    </div></div></section>
    <div id="about" className="about wrap"><span className="micro">About</span><p>My independent work sits between software engineering and developer education. I’m interested in what makes a tool understandable: a useful fallback, a reproducible example, or a failure that tells you what to do next.</p></div>
  </main><Footer/></div>;
}
