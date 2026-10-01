const GITHUB = "https://github.com/roshanstha01";
const EMAIL = "roshanstha978@gmail.com";

// Hit@1 from the chunking benchmark in customizable-conversational-rag (31 questions, 3 documents).
const benchmark = [
  { label: "Fixed, 64 tokens", value: 0.65 },
  { label: "Fixed, 128 tokens", value: 0.68 },
  { label: "Fixed, 254 tokens", value: 0.84 },
  { label: "Paragraph, 254 tokens", value: 0.77 },
  { label: "Paragraph, 128 tokens", value: 0.94, best: true },
];

type Project = {
  title: string;
  summary: string;
  result: { value: string; label: string };
  details: string[];
  stack: string[];
  repo: string;
};

const projects: Project[] = [
  {
    title: "Customizable Conversational RAG",
    summary:
      "Chat with your own PDFs and text files. Answers come with the exact passages they were built from, and follow-up questions work because the system rewrites them using earlier messages.",
    result: {
      value: "0.94",
      label: "Hit@1 with paragraph chunking, up from 0.68 with fixed-size chunks",
    },
    details: [
      "Chunking strategy, size and overlap configurable per upload",
      "Benchmarked 5 chunking setups on 31 questions; about 11 ms per search on CPU",
      "Docker Compose, health checks and 90+ tests",
    ],
    stack: ["FastAPI", "Qdrant", "Redis", "sentence-transformers", "Ollama", "Docker"],
    repo: `${GITHUB}/customizable-conversational-rag`,
  },
  {
    title: "DigiVote: voting on Ethereum",
    summary:
      "An election system where the rules live in a smart contract instead of a server someone can edit. Only verified voters can vote, each exactly once, and only while the election is open.",
    result: {
      value: "1",
      label: "vote per verified voter, enforced by the contract itself",
    },
    details: [
      "Admin flow for candidates, voter verification and election start and end",
      "Bulk Excel import sent to the contract in batched transactions",
      "Turnout and demographic report built from on-chain events, plus email alerts",
    ],
    stack: ["Solidity", "Truffle", "React", "web3.js", "MetaMask", "Node.js"],
    repo: `${GITHUB}/decentralized-online-voting-system-using-ethereum`,
  },
  {
    title: "Fraud detection",
    summary:
      "A classifier for credit-card transactions where only 0.17% are fraud, evaluated with precision-recall instead of accuracy, with a decision threshold chosen by what mistakes actually cost.",
    result: {
      value: "0.859",
      label: "PR-AUC with Random Forest, ahead of XGBoost and logistic regression",
    },
    details: [
      "Compared three models on 284,807 transactions",
      "Cost-based threshold tuning: a missed fraud costs 100 times a false alarm",
      "Interactive Streamlit demo",
    ],
    stack: ["Python", "scikit-learn", "XGBoost", "Streamlit"],
    repo: `${GITHUB}/fraud-detection-ml`,
  },
];

function Benchmark() {
  return (
    <figure className="rounded-lg border border-rule bg-panel p-5 sm:p-7">
      <figcaption className="mb-6">
        <p className="text-base font-semibold">How often the right passage ranks first</p>
        <p className="mt-1 text-sm text-muted">
          Hit@1 by chunking strategy, from my RAG project&rsquo;s evaluation
        </p>
      </figcaption>

      <dl className="space-y-4">
        {benchmark.map((row, i) => (
          <div key={row.label}>
            <div className="mb-1.5 flex items-baseline justify-between gap-4 text-sm">
              <dt className={row.best ? "font-semibold text-ink" : "text-muted"}>{row.label}</dt>
              <dd className={row.best ? "font-bold text-crimson" : "text-muted"}>
                {row.value.toFixed(2)}
              </dd>
            </div>
            <div className="h-2.5 w-full rounded-full bg-paper" aria-hidden="true">
              <div
                className={`bar h-full rounded-full ${row.best ? "bg-crimson" : "bg-bar"}`}
                style={{ width: `${row.value * 100}%`, animationDelay: `${150 + i * 90}ms` }}
              />
            </div>
          </div>
        ))}
      </dl>

      <p className="mt-6 border-t border-rule pt-4 text-sm leading-6 text-muted">
        Keeping each chunk to one topic beat fixed-size splitting at the same size by 26 points.
      </p>
    </figure>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="grid gap-6 border-t border-rule py-10 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-12 sm:py-12">
      <div>
        <h3 className="text-2xl font-bold tracking-tight sm:text-[1.75rem]">{project.title}</h3>
        <p className="mt-3 max-w-[62ch] text-base leading-7 text-muted">{project.summary}</p>

        <ul className="mt-5 max-w-[62ch] space-y-2 text-[0.95rem] leading-6">
          {project.details.map((d) => (
            <li key={d} className="flex gap-3">
              <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-ink" aria-hidden="true" />
              {d}
            </li>
          ))}
        </ul>

        <p className="mt-5 text-sm text-muted">
          <span className="sr-only">Built with: </span>
          {project.stack.join(", ")}
        </p>

        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block border-b-2 border-ink pb-0.5 text-sm font-semibold transition-colors hover:border-crimson hover:text-crimson"
        >
          Read the code on GitHub
        </a>
      </div>

      <div className="md:border-l md:border-rule md:pl-8">
        <p className="text-5xl font-extrabold tracking-tight text-crimson sm:text-6xl">
          {project.result.value}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted">{project.result.label}</p>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-8">
        <a href="#top" className="block rounded-lg">
          <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden="true">
            <rect width="40" height="40" rx="9" className="fill-ink" />
            <text
              x="20"
              y="21"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="19"
              fontWeight="800"
              letterSpacing="-1.2"
              className="fill-white"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              RS
            </text>
            <rect x="12" y="31" width="16" height="2.5" rx="1.25" className="fill-crimson" />
          </svg>
          <span className="sr-only">Roshan Shrestha</span>
        </a>
        <nav className="flex items-center gap-5 text-sm text-muted sm:gap-7">
          <a href="#projects" className="hover:text-ink">Projects</a>
          <a href="#about" className="hidden hover:text-ink sm:inline">About</a>
          <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-ink">GitHub</a>
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-md bg-ink px-3.5 py-2 font-medium text-white hover:bg-crimson"
          >
            Email
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-10 sm:px-8 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-28">
          <div>
            <h1 className="text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.25rem]">
              Roshan Shrestha
            </h1>
            <p className="mt-7 max-w-[52ch] text-lg leading-8 text-muted">
              Computer engineering graduate from Nepal. I work on machine learning, retrieval and
              blockchain projects, and I like the ones where I can measure how well they work.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-crimson"
              >
                See projects
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="rounded-md border border-ink px-5 py-3 text-sm font-semibold hover:border-crimson hover:text-crimson"
              >
                Email me
              </a>
            </div>
          </div>

          <Benchmark />
        </section>

        <section id="projects" className="mx-auto max-w-6xl scroll-mt-6 px-4 sm:px-8">
          <h2 className="pb-8 text-3xl font-bold tracking-tight sm:text-4xl">Projects</h2>
          {projects.map((p) => (
            <ProjectRow key={p.title} project={p} />
          ))}
        </section>

        <section id="about" className="mt-12 scroll-mt-6 bg-ink text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-8 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-14 lg:py-24">
            <img
              src="/profile.jpeg"
              alt="Roshan Shrestha"
              className="aspect-[4/5] w-44 rounded-lg object-cover md:w-full"
            />
            <div className="max-w-[62ch]">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About</h2>
              <p className="mt-6 text-lg leading-8 text-white/80">
                I finished my bachelor&rsquo;s in Computer Engineering. My final year
                project put election rules into an Ethereum smart contract. Since then I&rsquo;ve been
                working on machine learning and retrieval: how documents get split and searched, and
                how to tell whether a model&rsquo;s answers are actually right.
              </p>
              <p className="mt-5 text-lg leading-8 text-white/80">
                I like projects where I can put a number on the result, so most of mine come with
                an evaluation, not just a demo.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 lg:py-24">
          <h2 className="max-w-[20ch] text-3xl font-bold tracking-tight sm:text-5xl">
            Get in touch
          </h2>
          <p className="mt-5 max-w-[56ch] text-lg leading-8 text-muted">
            Email is the fastest way to reach me.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={`mailto:${EMAIL}`}
              className="border-b-2 border-crimson pb-1 text-xl font-bold text-crimson hover:border-ink hover:text-ink sm:text-2xl"
            >
              {EMAIL}
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="text-base font-semibold text-muted hover:text-ink"
            >
              github.com/roshanstha01
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-rule">
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted sm:px-8">
          Roshan Shrestha
        </p>
      </footer>
    </div>
  );
}
