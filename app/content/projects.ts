// The public index. Display order is editorial, not a ranking.
// Only add a demo after checking that its actual page matches the project.
type ProjectLink = { label: string; url: string };

export type Project = {
  id: string; name: string; medium: string; status: string; summary: string;
  question: string; walkthrough: string;
} & (
  | { source: string; evidence: string; demo?: ProjectLink }
  | { source?: never; evidence?: never; demo: ProjectLink }
);
const git = "https://github.com/";
export const projects: Project[] = [
  {id:"reader",name:"Better ePub",medium:"Reading tools",status:"Published reader",
   summary:"A bookshelf that stays in your browser. Import an EPUB, annotate a passage, and pick up where you left off.",
   question:"What happens to the book when you close the tab?",
   walkthrough:"Imported books, notes and reading position live in the browser’s local database. The backup tool is what lets the library travel to another browser; it is not a cloud account.",
   source:git+"pablodcruz/better-epub",evidence:git+"pablodcruz/better-epub/blob/4610776b5ee93a575d4941d20404cecbf1261270/README.md",
   demo:{label:"Open reader",url:"https://better-epub.rweb.site/"}},
  {id:"canvas",name:"Canvas Native Lab",medium:"Browser experiments",status:"Experimental demo",
   summary:"Sixteen small studies explore what happens when the browser draws HTML into a canvas.",
   question:"Can an experiment still teach when the API is missing?",
   walkthrough:"Compare the native rendering path with its semantic HTML fallback. The controls are part of the document first; the experiment changes where they are drawn.",
   source:git+"pablodcruz/html-in-canvas-lab",evidence:git+"pablodcruz/html-in-canvas-lab/blob/5b78733254f136435887390e57cdad32e2435dcc/README.md",
   demo:{label:"Open experiments",url:"https://pablodcruz.github.io/html-in-canvas-lab/"}},
  {id:"analytics",name:"Data Analytics Learning Lab",medium:"Data & evidence",status:"Source-based lab",
   summary:"A small, synthetic growth dataset you can follow from CSV through SQL to a written report.",
   question:"Can you trace a reported number back to its inputs?",
   walkthrough:"Pick a week, inspect the channel rows and compare their total with the SQL output. The rebuild script regenerates the worked example from the fixture; the numbers are not customer results.",
   source:git+"pablodcruz/data-analytics-plugin-learning-lab",evidence:git+"pablodcruz/data-analytics-plugin-learning-lab/blob/9077403d7f3bef3b8f1172031d7e377a16a62248/analysis.sql"},
  {id:"engineering",name:"Data Engineering Workbench",medium:"Teaching tools",status:"Source-based lab",
   summary:"Spark, Kafka and Airflow practice alongside worked examples and a browser-based study app.",
   question:"What should a learner do after a wrong answer?",
   walkthrough:"The study app includes focused practice, flashcards and a smart review session. The question bank sits beside the implementation so an instructor can inspect what is being assessed.",
   source:git+"pablodcruz/20260629-data-engineering",evidence:git+"pablodcruz/20260629-data-engineering/tree/67b3f647027753f1c97a3601175ee45551100aee/study"},
  {id:"clanker",name:"Clanker Build Journal",medium:"Engineering notes",status:"Published journal",
   summary:"A public record of AI engineering experiments, including the transition from the original project to its revival.",
   question:"Which implementation does a build note actually describe?",
   walkthrough:"Start with the revival plan and the dated project notes, not an old screenshot. The repository distinguishes historical operator files from the engineering lab it now documents.",
   source:git+"PabloDeLaCruz1/clanker-site",evidence:git+"PabloDeLaCruz1/clanker-site/blob/ad596c9d6468270e4e5fece40cf34b1045c3691f/README.md",
   demo:{label:"Read journal",url:"https://clanker-site.vercel.app"}},
  {id:"notebook",name:"AI Engineering Notebook",medium:"AI prototypes",status:"Documented prototype",
   summary:"Worked studies in retrieval, support triage and evaluation. Start with a small assistant that can cite a passage or decline to answer.",
   question:"What if the source does not support the answer?",
   walkthrough:"The Enablement Assistant study uses a local Markdown corpus, lexical retrieval and extractive answers. Its refusal path gives an unsupported question an explicit outcome rather than an invented response.",
   source:git+"pablodcruz/ai-engineering-notebook",evidence:git+"pablodcruz/ai-engineering-notebook/blob/afafbd946b5ae148a90a8ca356f24267897fe6f1/03-projects/enablement-assistant-rag.md"},
  {id:"work-log",name:"pabStack Work Log",medium:"Engineering workflow",status:"Dated snapshots",
   summary:"A public record of the decisions, verification evidence, and last observed shipping status behind selected changes.",
   question:"What was checked, and what actually shipped?",
   walkthrough:"The work log separates review branches from releases and points to the evidence behind selected changes. Its dated entries are not a live activity feed.",
   demo:{label:"View work log",url:"https://pabstack-work.pablo-de-la-cruz-pro.chatgpt.site"}}
];
