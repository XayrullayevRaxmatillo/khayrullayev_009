import { useEffect, useMemo, useRef, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { SK, JN, PR, BE, FE, CL, GL } from "./data.js";
import { links, demoLinks } from "./config.js";

const NAV = [
  ["about", "Men haqimda"],
  ["skills", "Skills"],
  ["journey", "Journey"],
  ["projects", "Projects"],
  ["backend", "Backend"],
  ["activity", "Activity"],
  ["contact", "Aloqa"],
];
const go = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const Chips = ({ a }) =>
  a.map((t) => (
    <span className="chip" key={t}>
      {t}
    </span>
  ));
const Soon = ({ children }) => (
  <span className="btn soon" title="Coming Soon">
    {children}
  </span>
);
const Ext = ({ href, children }) =>
  href ? (
    <a className="btn" href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  ) : (
    <Soon>{children}</Soon>
  );
const tg = links.telegram && `https://t.me/${links.telegram.replace("@", "")}`;
const mail = links.email && `mailto:${links.email}`;

function Reveal({ children, className = "", ...p }) {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`rv ${className}`} {...p}>
      {children}
    </div>
  );
}

function Filters({ cats, value, onChange }) {
  return (
    <div className="filters">
      {["Hammasi", ...cats].map((c) => (
        <button
          key={c}
          className={`chip ${value === c ? "on" : ""}`}
          onClick={() => onChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

function Nav({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState("");
  useEffect(() => {
    const f = () => {
      let c = "";
      NAV.forEach(([id]) => {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - 140) c = id;
      });
      setCur(c);
    };
    addEventListener("scroll", f, { passive: true });
    f();
    return () => removeEventListener("scroll", f);
  }, []);
  return (
    <nav>
      <div className="wrap">
        <a
          href="#hero"
          className="logo mono"
          onClick={(e) => {
            e.preventDefault();
            go("hero");
          }}
        >
          &lt;rahmatilloh /&gt;
        </a>
        <div className={`links ${open ? "open" : ""}`}>
          {NAV.map(([id, t]) => (
            <a
              key={id}
              href={`#${id}`}
              className={cur === id ? "act" : ""}
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                go(id);
              }}
            >
              {t}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="ib"
            aria-label="Dark / Light"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            ◐
          </button>
          <button
            className="ib"
            id="burger"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}

function Skills() {
  const [c, setC] = useState("Hammasi");
  return (
    <section id="skills" style={{ background: "var(--bg2)" }}>
      <Reveal className="wrap">
        <h2>Technical Skills</h2>
        <p className="lead">
          Foizlar ko‘rsatilmagan — faqat qaysi texnologiyalar bilan
          ishlayotganim.
        </p>
        <Filters cats={Object.keys(SK)} value={c} onChange={setC} />
        <div
          className="grid"
          style={{ gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))" }}
        >
          {Object.entries(SK)
            .filter(([k]) => c === "Hammasi" || k === c)
            .flatMap(([k, v]) =>
              v.map((s) => (
                <div className="card sk" key={k + s}>
                  <b>{s.slice(0, 2)}</b>
                  <div>
                    {s}
                    <small>{k}</small>
                  </div>
                </div>
              )),
            )}
        </div>
      </Reveal>
    </section>
  );
}

function Journey() {
  const [open, setOpen] = useState(0);
  return (
    <section id="journey">
      <Reveal className="wrap">
        <h2>Learning Journey</h2>
        <p className="lead">
          Bosqichni bosing — nimalar o‘rganilgani ochiladi.
        </p>
        <div className="tl">
          {JN.map(([t, l], i) => (
            <div
              key={t}
              className={`card st ${open === i ? "open" : ""}`}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <h3>{t}</h3>
              <ul>
                <Chips a={l.split(",")} />
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Projects() {
  const [c, setC] = useState("Hammasi");
  const [open, setOpen] = useState(null);
  return (
    <section id="projects" style={{ background: "var(--bg2)" }}>
      <Reveal className="wrap">
        <h2>Projects</h2>
        <p className="lead">Real linklar qo‘shilguncha “Coming Soon” turadi.</p>
        <Filters cats={["Backend", "MERN"]} value={c} onChange={setC} />
        <div
          className="grid"
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}
        >
          {PR.filter((p) => c === "Hammasi" || p[1] === c).map((p) => {
            const d = demoLinks[p[0]] || {};
            return (
              <div
                className={`card pr ${open === p[0] ? "open" : ""}`}
                key={p[0]}
              >
                <h3>{p[0]}</h3>
                <p>{p[2]}</p>
                <div className="tags">
                  <Chips a={p[3].split(",")} />
                </div>
                <ul className="det">
                  {p[4].split(",").map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="acts">
                  <Ext href={d.live}>
                    Live Demo{d.live ? "" : " · Coming Soon"}
                  </Ext>
                  <Ext href={d.github}>
                    GitHub{d.github ? "" : " · Coming Soon"}
                  </Ext>
                  <button
                    className="btn"
                    onClick={() => setOpen(open === p[0] ? null : p[0])}
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

function Heatmap() {
  const cells = useMemo(() => {
    let s = 7;
    const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    return Array.from({ length: 182 }, () => {
      const v = r();
      return v > 0.9 ? "l3" : v > 0.75 ? "l2" : v > 0.55 ? "l1" : "";
    });
  }, []);
  return (
    <div className="hm">
      {cells.map((c, i) => (
        <i key={i} className={c} />
      ))}
    </div>
  );
}

function Contact() {
  const [f, setF] = useState({ name: "", reach: "", text: "" });
  const [msg, setMsg] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    if (!f.name.trim() || !f.reach.trim() || !f.text.trim())
      return setMsg("Barcha maydonlarni to‘ldiring.");
    const body = `${f.text}\n\n— ${f.name} (${f.reach})`;
    if (links.email) {
      location.href = `mailto:${links.email}?subject=${encodeURIComponent("Portfolio: " + f.name)}&body=${encodeURIComponent(body)}`;
      setMsg("Email dasturingiz ochildi — xabarni yuboring.");
    } else if (tg) {
      try {
        await navigator.clipboard.writeText(body);
      } catch {}
      window.open(tg, "_blank");
      setMsg("Xabar nusxalandi. Telegramda yopishtirib yuboring.");
    } else {
      setMsg(
        "Aloqa manzili hali sozlanmagan: src/config.js ichiga email yoki telegram yozing.",
      );
    }
  };
  return (
    <section id="contact">
      <Reveal className="wrap">
        <div className="card">
          <div className="cg">
            <div>
              <h2>Let’s Build Something Together</h2>
              <p className="lead">
                Yangi loyiha, hamkorlik yoki web development haqida
                suhbatlashish uchun men bilan bog‘laning.
              </p>
              <div className="cta" style={{ margin: 0 }}>
                <Ext href={links.github}>GitHub</Ext>
                <Ext href={tg}>Telegram</Ext>
                <Ext href={mail}>Email</Ext>
              </div>
            </div>
            <form onSubmit={submit} noValidate>
              <input
                placeholder="Ismingiz"
                aria-label="Ismingiz"
                value={f.name}
                onChange={set("name")}
              />
              <input
                placeholder="Email yoki Telegram"
                aria-label="Aloqa"
                value={f.reach}
                onChange={set("reach")}
              />
              <textarea
                placeholder="Loyiha haqida yozing"
                aria-label="Xabar"
                value={f.text}
                onChange={set("text")}
              />
              <button className="btn p" type="submit">
                Xabar yuborish
              </button>
              <div id="msg" role="status">
                {msg}
              </div>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const CODE = `<span class="k">const</span> developer = {
  name: <span class="s">"Rahmatilloh"</span>,
  stack: [<span class="s">"React"</span>, <span class="s">"Node.js"</span>, <span class="s">"MongoDB"</span>],
  building: <span class="s">"real projects"</span>,
  goal: <span class="s">"Full Stack"</span>,
  openToWork: <span class="k">true</span>
};`;

function Home() {
  const [prog, setProg] = useState(0);
  const [top, setTop] = useState(false);
  const [theme, setThemeState] = useState(
    () =>
      localStorage.getItem("theme") ||
      (matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light"),
  );
  const [loading, setLoading] = useState(true);
  const setTheme = (t) => {
    setThemeState(t);
    localStorage.setItem("theme", t);
  };
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    const f = () => {
      setProg(
        (scrollY / (document.documentElement.scrollHeight - innerHeight)) * 100,
      );
      setTop(scrollY > 500);
    };
    addEventListener("scroll", f, { passive: true });
    return () => {
      clearTimeout(t);
      removeEventListener("scroll", f);
    };
  }, []);
  return (
    <>
      <div id="load" className={loading ? "" : "h"}>
        <span>loading</span>
      </div>
      <div id="prog" style={{ width: prog + "%" }} />
      <Nav theme={theme} setTheme={setTheme} />
      <main>
        <section id="hero">
          <div className="wrap hg">
            <div>
              <span className="chip mono">Yangi loyihalar uchun ochiqman</span>
              <h1>Rahmatilloh Xayrullayev</h1>
              <div className="role">Frontend &amp; Backend Developer</div>
              <p className="lead" style={{ marginTop: 12 }}>
                Modern web applications yaratishni o‘rganayotgan va amaliy
                loyihalar orqali o‘z tajribasini rivojlantirayotgan developer.
              </p>
              <div
                className="mono"
                style={{ color: "var(--ac)", fontSize: ".9rem" }}
              >
                React • TypeScript • Node.js • Express • MongoDB
              </div>
              <div className="cta">
                <button className="btn p" onClick={() => go("projects")}>
                  Loyihalarim
                </button>
                <button className="btn" onClick={() => go("about")}>
                  Men haqimda
                </button>
                <Ext href={links.github}>GitHub</Ext>
                <button className="btn" onClick={() => go("contact")}>
                  Bog‘lanish
                </button>
              </div>
            </div>
            <div className="card code">
              <div className="bar">
                <i />
                <i />
                <i />
              </div>
              <pre
                className="mono"
                dangerouslySetInnerHTML={{ __html: CODE }}
              />
            </div>
          </div>
        </section>

        <section id="about">
          <Reveal className="wrap">
            <h2>Men haqimda</h2>
            <p className="lead">Amaliyot orqali o‘rganaman.</p>
            <div className="card" style={{ maxWidth: 820 }}>
              <p style={{ marginTop: 0 }}>
                Men web dasturlash yo‘nalishida rivojlanayotgan developer
                sifatida zamonaviy web ilovalar yaratishni o‘rganib kelmoqdaman.
                Dasturlashni faqat nazariy jihatdan emas, balki real loyihalar
                va amaliy topshiriqlar orqali o‘rganishga katta e’tibor beraman.
              </p>
              <p>
                Frontend va backend texnologiyalarida ishlash, API yaratish,
                database bilan ishlash, authentication, CRUD tizimlari va
                zamonaviy web application arxitekturasini o‘rganib kelmoqdaman.
              </p>
              <p style={{ marginBottom: 0 }}>
                Maqsadim — kuchli full-stack developer bo‘lish va
                foydalanuvchilar uchun foydali, tezkor va professional web
                ilovalar yaratish.
              </p>
            </div>
            <div className="card" style={{ maxWidth: 820, marginTop: 18 }}>
              <b>Education</b>
              <div style={{ color: "var(--mu)" }}>
                Bekent — Web Development / Programming
              </div>
            </div>
          </Reveal>
        </section>

        <Skills />
        <Journey />
        <Projects />

        <section id="backend">
          <Reveal className="wrap">
            <h2>Backend Development</h2>
            <p className="lead">
              Server tomonda ishlatadigan tushunchalar va ularning qisqa izohi.
            </p>
            <div className="grid cx">
              {BE.map(([t, d]) => (
                <div className="card" key={t}>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="frontend" style={{ background: "var(--bg2)" }}>
          <Reveal className="wrap">
            <h2>Frontend Development</h2>
            <p className="lead">
              Foydalanuvchi ko‘radigan qism bilan ishlash ko‘nikmalarim.
            </p>
            <div className="tags">
              <Chips a={FE} />
            </div>
          </Reveal>
        </section>

        <section id="activity">
          <Reveal className="wrap">
            <h2>My Development Activity</h2>
            <p className="lead">
              GitHub API ulanmagan. Quyida faqat dizayn namunasi.
            </p>
            <div className="card">
              <Heatmap />
              <div className="demo">
                Demo data — haqiqiy GitHub statistikasi emas.
              </div>
            </div>
          </Reveal>
        </section>

        <section id="now" style={{ background: "var(--bg2)" }}>
          <Reveal className="wrap">
            <h2>Currently Learning</h2>
            <div className="tags" style={{ margin: "16px 0 40px" }}>
              <Chips a={CL} />
            </div>
            <h2>My Goals</h2>
            <div className="grid" style={{ marginTop: 16 }}>
              {GL.map((g) => (
                <div className="card" key={g}>
                  {g}
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <Contact />
      </main>

      <footer>
        <div className="wrap">
          <div>
            © 2026 Rahmatilloh Xayrullayev
            <br />
            Built with passion for Web Development.
          </div>
          <div className="fl">
            <span>GitHub</span>
            <span>Telegram</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </footer>

      <div id="fab">
        <button className="btn p" onClick={() => go("contact")}>
          Bog‘lanish
        </button>
        <button
          id="top"
          className={`ib ${top ? "v" : ""}`}
          aria-label="Yuqoriga"
          onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      </div>
    </>
  );
}

function NotFound() {
  return (
    <div id="nf">
      <div>
        <b>404</b>
        <h2>Sahifa topilmadi</h2>
        <p className="lead" style={{ margin: "0 auto 20px" }}>
          Bunday sahifa mavjud emas.
        </p>
        <Link className="btn p" to="/">
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
