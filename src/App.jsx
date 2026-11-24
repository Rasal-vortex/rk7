import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Wrench,
  X,
  Construction,
  Images,
  LogOut,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { readData, writeData, ADMIN_EMAIL, ADMIN_PASSWORD } from "./data";

const PHONE = "+91 8606 101 333",
  EMAIL = "vortexglobaltechnologies.in@gmail.com",
  WA = "918606101333";
const useStore = (key) => {
  const [value, setValue] = useState(() => readData(key));
  const save = (next) => {
    setValue(next);
    writeData(key, next);
  };
  return [value, save];
};
const photo = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

function Button({ to, children, variant = "dark", className = "", ...props }) {
  const cls = `button button-${variant} ${className}`;
  if (to && /^https?:/.test(to))
    return (
      <a href={to} className={cls} {...props}>
        {children}
      </a>
    );
  return to ? (
    <Link to={to} className={cls} {...props}>
      {children}
    </Link>
  ) : (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
function SectionTitle({ eyebrow, title, copy, light = false }) {
  return (
    <div className={`section-title ${light ? "light" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}
function Notice({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 3400);
    return () => clearTimeout(t);
  }, [message]);
  return message ? (
    <div className="toast">
      <Check size={17} />
      {message}
      <button onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  ) : null;
}
function Header() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc]);
  const links = [
    ["About", "/about"],
    ["Construction", "/construction"],
    ["Events", "/events"],
    ["Rent tools", "/tools"],
    ["Gallery", "/gallery"],
  ];
  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <img className="brand-logo" src="/RK7-1-Photoroom.png" alt="RK7" />
      </Link>
      <button
        className="mobile-menu"
        aria-label="Toggle menu"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? "nav-open" : ""}>
        {links.map(([label, to]) => (
          <NavLink key={to} to={to}>
            {label}
          </NavLink>
        ))}
      </nav>
      <Button to="/contact" className="header-cta">
        Let’s talk <ArrowUpRight size={16} />
      </Button>
    </header>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Link to="/" className="brand footer-brand">
            <img className="brand-logo" src="/RK7-1-Photoroom.png" alt="RK7" />
          </Link>
          <p>
            Good work starts with good people.
            <br />
            Let’s build something that lasts.
          </p>
        </div>
        <div>
          <span className="footer-label">Explore</span>
          <Link to="/about">Our story</Link>
          <Link to="/construction">Construction</Link>
          <Link to="/events">Event management</Link>
          <Link to="/tools">Tool rentals</Link>
          <Link to="/gallery">Selected work</Link>
        </div>
        <div>
          <span className="footer-label">Get in touch</span>
          <a href={`tel:${PHONE}`}>{PHONE}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span>
            Manjeri, Malappuram
            <br />
            Kerala, India
          </span>
        </div>
        <div>
          <span className="footer-label">A note from our team</span>
          <p>
            Tell us what you’re planning.
            <br />
            We’ll help you find a good way forward.
          </p>
          <Button to="/contact" variant="line">
            Start a conversation <ArrowRight size={15} />
          </Button>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 RK7. Made with care in Kerala.</span>
        <Link to="/admin/login">Team access</Link>
        <Link to="/review">Leave a review</Link>
      </div>
    </footer>
  );
}
function PublicLayout() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/construction"
            element={<ServicePage id="construction" />}
          />
          <Route path="/events" element={<ServicePage id="events" />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/review" element={<ReviewForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
function Home() {
  const [services] = useStore("services"),
    [gallery] = useStore("gallery"),
    [reviews] = useStore("reviews");
  const featured = gallery.filter((x) => x.published).slice(0, 3),
    approved = reviews.filter((x) => x.status === "Approved");
  return (
    <>
      <section className="hero">
        <img
          className="hero-image"
          src={photo("photo-1600607687939-ce8a6c25118c")}
          alt="Sunlit contemporary home"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow">A local team. A lasting difference.</span>
          <h1>
            Built with care.
            <br />
            <em>Made to matter.</em>
          </h1>
          <p>
            From foundations to celebrations, RK7 brings skilled people and
            thoughtful planning to the work that shapes your life.
          </p>
          <div className="hero-actions">
            <Button to="/construction">
              Explore our services <ArrowUpRight size={16} />
            </Button>
            <Button to="/contact" variant="line">
              Talk to our team
            </Button>
          </div>
        </div>
        <div className="hero-foot">
          <span>MANJERI, KERALA · EST. WITH PURPOSE</span>
          <a href="#intro">
            SCROLL TO EXPLORE <ArrowDownRight size={15} />
          </a>
        </div>
      </section>
      <section className="intro section" id="intro">
        <div className="intro-label">
          <span className="eyebrow">01 / A little about us</span>
          <span className="vertical-note">PEOPLE FIRST. ALWAYS.</span>
        </div>
        <div className="intro-copy">
          <h2>
            We believe good work should feel <em>personal.</em>
          </h2>
          <p>
            RK7 is a hands-on team serving our community across construction,
            event management and tool rentals. We bring clear communication,
            steady workmanship and a genuine commitment to doing things right.
          </p>
          <Link className="text-link" to="/about">
            Get to know us <ArrowRight size={17} />
          </Link>
        </div>
        <div className="intro-photo">
          <img
            src={photo("photo-1504307651254-35680f356dfd", 900)}
            alt="Construction team at work"
          />
          <span>Good work. Good people.</span>
        </div>
      </section>
      <section className="services-section section">
        <div className="services-heading">
          <SectionTitle
            eyebrow="02 / What we do"
            title={
              <>
                One trusted team.
                <br />
                <em>Three ways to help.</em>
              </>
            }
            copy="Whether you’re planning a build, gathering or project, we’re here to make it happen."
          />
          <span className="index-note">
            LOCAL KNOW-HOW
            <br />
            THOUGHTFUL DELIVERY
          </span>
        </div>
        <div className="service-grid">
          {services
            .filter((s) => s.published)
            .map((s, i) => (
              <Link
                className="service-card"
                to={
                  s.id === "events"
                    ? "/events"
                    : s.id === "tools"
                      ? "/tools"
                      : "/construction"
                }
                key={s.id}
              >
                <div className="service-image">
                  <img src={s.image} alt={s.title} />
                  <span className="service-index">0{i + 1}</span>
                </div>
                <div className="service-info">
                  <div>
                    <span className="eyebrow">{s.eyebrow}</span>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                  </div>
                  <span className="round-arrow">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </section>
      <section className="why-section">
        <div className="why-image">
          <img
            src={photo("photo-1600585154340-be6161a56a0c", 1200)}
            alt="A finished RK7 home"
          />
          <span className="photo-caption">MADE WITH CARE IN MALAPPURAM</span>
        </div>
        <div className="why-copy">
          <span className="eyebrow">03 / Why RK7</span>
          <h2>
            Good things happen when people <em>care.</em>
          </h2>
          <p>
            We take your plans personally. That means showing up, saying what we
            mean and paying attention to the little things that make all the
            difference.
          </p>
          <div className="value-list">
            <div>
              <span>01</span>
              <div>
                <h4>People you can reach</h4>
                <p>Clear answers and a real person at the other end.</p>
              </div>
            </div>
            <div>
              <span>02</span>
              <div>
                <h4>Care in every detail</h4>
                <p>Thoughtful work from the first conversation to handover.</p>
              </div>
            </div>
            <div>
              <span>03</span>
              <div>
                <h4>Rooted in our community</h4>
                <p>
                  Local knowledge, lasting relationships and work we stand
                  behind.
                </p>
              </div>
            </div>
          </div>
          <Link to="/about" className="text-link">
            How we work <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <section className="work-section section">
        <div className="work-heading">
          <SectionTitle
            eyebrow="04 / Selected work"
            title={
              <>
                A few things we’re
                <br />
                <em>proud to be part of.</em>
              </>
            }
          />
          <Link className="text-link" to="/gallery">
            View all projects <ArrowRight size={17} />
          </Link>
        </div>
        <div className="work-grid">
          {featured.map((item, i) => (
            <Link
              to="/gallery"
              className={`work-item work-item-${i + 1}`}
              key={item.id}
            >
              <img src={item.image} alt={item.title} />
              <div>
                <span>{item.category} · 2026</span>
                <h3>{item.title}</h3>
              </div>
              <span className="work-arrow">
                <ArrowUpRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="review-section">
        <div className="review-left">
          <span className="eyebrow">05 / Kind words</span>
          <h2>
            It means a lot
            <br />
            when you <em>tell us.</em>
          </h2>
          <Link className="text-link" to="/review">
            Share your experience <ArrowRight size={17} />
          </Link>
        </div>
        <div className="review-list">
          {approved.slice(0, 2).map((r) => (
            <article className="quote-card" key={r.id}>
              <div className="stars">
                {Array.from({ length: r.rating }, (_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>
              <blockquote>“{r.review}”</blockquote>
              <div className="quote-author">
                <span>{r.name}</span>
                <span>{r.service}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ContactBand />
    </>
  );
}
function ContactBand() {
  return (
    <section className="contact-band">
      <div>
        <span className="eyebrow">Have a plan in mind?</span>
        <h2>
          Let’s make a good
          <br />
          <em>start together.</em>
        </h2>
      </div>
      <Button to="/contact" variant="light">
        Tell us about it <ArrowUpRight size={16} />
      </Button>
      <span className="band-mark">RK7</span>
    </section>
  );
}
function About() {
  return (
    <>
      <PageHero
        eyebrow="A little about RK7"
        title={
          <>
            Good work, built
            <br />
            <em>on good relationships.</em>
          </>
        }
        image={photo("photo-1600607687939-ce8a6c25118c")}
      />
      <section className="about-story section">
        <div className="eyebrow">OUR STORY</div>
        <div>
          <h2>
            A local team with a simple idea: <em>care about the outcome.</em>
          </h2>
          <p>
            RK7 brings together construction, event management and tool rental
            under one roof. We started with a belief that reliable service is
            personal: it comes from people who listen, keep their word and take
            pride in what they do.
          </p>
          <p>
            Based in Manjeri, we work across Malappuram and beyond, helping
            families, businesses and community groups bring their plans to life.
          </p>
        </div>
      </section>
      <section className="vision-section">
        <img
          src={photo("photo-1517248135467-4c7edcad34c4", 1200)}
          alt="A beautifully prepared gathering"
        />
        <div>
          <span className="eyebrow">OUR VISION</span>
          <h2>To be the team you’re glad you called.</h2>
          <p>
            We want every project and gathering to feel considered, every
            customer to feel heard, and every piece of work to reflect the care
            we put into it.
          </p>
          <Button to="/contact" variant="light">
            Meet our team <ArrowRight size={16} />
          </Button>
        </div>
      </section>
      <section className="about-values section">
        <SectionTitle
          eyebrow="WHAT MAKES RK7 RELIABLE"
          title="The way we work is the promise."
        />
        <div className="values-grid">
          <div>
            <ShieldCheck />
            <h3>We keep our word</h3>
            <p>
              Clear expectations, honest updates and follow-through you can
              count on.
            </p>
          </div>
          <div>
            <Wrench />
            <h3>We know our craft</h3>
            <p>
              Skilled hands and practical experience, with pride in the finish.
            </p>
          </div>
          <div>
            <MessageCircle />
            <h3>We listen first</h3>
            <p>
              Your needs shape the plan. We make space for questions at every
              stage.
            </p>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
function PageHero({ eyebrow, title, image, copy }) {
  return (
    <section className="page-hero">
      <img src={image} alt="" />
      <div className="page-hero-shade" />
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {copy && <p>{copy}</p>}
      </div>
      <span className="page-hero-bottom">RK7 / MANJERI, KERALA</span>
    </section>
  );
}
function LegacyServicePage({ id }) {
  const [services] = useStore("services"),
    [gallery] = useStore("gallery");
  const s = services.find((x) => x.id === id);
  if (!s?.published)
    return (
      <div className="empty-public">
        This service is currently unavailable.{" "}
        <Link to="/contact">Contact our team</Link>
      </div>
    );
  const event = id === "events";
  const imgs = gallery
    .filter(
      (g) => g.published && g.category === (event ? "Events" : "Construction"),
    )
    .slice(0, 3);
  const offerings = event
    ? [
        "Weddings & receptions",
        "Corporate gatherings",
        "Community celebrations",
        "Private occasions",
      ]
    : [
        "New home construction",
        "Renovation & extensions",
        "Commercial projects",
        "Finishing & interiors",
      ];
  return (
    <>
      <PageHero
        eyebrow={s.eyebrow}
        title={
          event ? (
            <>
              Good days deserve
              <br />
              <em>good planning.</em>
            </>
          ) : (
            <>
              A solid start.
              <br />
              <em>A lasting finish.</em>
            </>
          )
        }
        image={s.image}
        copy={s.description}
      />
      <section className="service-intro section">
        <div className="eyebrow">MADE FOR YOUR PLANS</div>
        <div>
          <h2>
            {s.title}, with <em>care at every step.</em>
          </h2>
          <p>{s.content}</p>
          <p>
            We begin with a conversation, shape a clear plan together, then take
            care of the details with a team you can count on.
          </p>
          <Button to="/contact">
            Tell us what you need <ArrowRight size={16} />
          </Button>
        </div>
      </section>
      <section className="offering-section">
        <div>
          <span className="eyebrow">HOW WE CAN HELP</span>
          <h2>
            Made to fit
            <br />
            <em>your occasion.</em>
          </h2>
        </div>
        <div className="offering-list">
          {offerings.map((x, i) => (
            <div key={x}>
              <span>0{i + 1}</span>
              <h3>{x}</h3>
              <ArrowUpRight size={18} />
            </div>
          ))}
        </div>
      </section>
      <section className="work-section section">
        <div className="work-heading">
          <SectionTitle
            eyebrow="A FEW RECENT STORIES"
            title="Care you can see."
          />
          <Link to="/gallery" className="text-link">
            See the gallery <ArrowRight size={16} />
          </Link>
        </div>
        <div className="work-grid">
          {imgs.map((g, i) => (
            <Link
              to="/gallery"
              className={`work-item work-item-${i + 1}`}
              key={g.id}
            >
              <img src={g.image} alt={g.title} />
              <div>
                <span>{g.category}</span>
                <h3>{g.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ContactBand />
    </>
  );
}
function LegacyToolsPage() {
  const [tools] = useStore("tools");
  const [q, setQ] = useState(""),
    [cat, setCat] = useState("All"),
    [selected, setSelected] = useState(null);
  const active = tools.filter((t) => t.published),
    cats = ["All", ...new Set(active.map((t) => t.category))];
  const shown = active.filter(
    (t) =>
      (cat === "All" || t.category === cat) &&
      `${t.name} ${t.description}`.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <>
      <PageHero
        eyebrow="Tools for the work ahead"
        title={
          <>
            Get the gear.
            <br />
            <em>Get on with it.</em>
          </>
        }
        image={photo("photo-1504307651254-35680f356dfd")}
        copy="Reliable equipment, straightforward enquiries and a local team ready to help you find the right fit."
      />
      <section className="tool-listing section">
        <div className="listing-head">
          <div>
            <span className="eyebrow">THE RENTAL SHELF</span>
            <h2>
              Good tools make
              <br />
              <em>good work easier.</em>
            </h2>
          </div>
          <p>
            Need a hand choosing? Give us a call and we’ll help you work out
            what’s right.
          </p>
        </div>
        <div className="filter-row">
          <div className="search-box">
            <Search size={17} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Find a tool…"
            />
          </div>
          <div className="filter-chips">
            {cats.map((c) => (
              <button
                onClick={() => setCat(c)}
                className={cat === c ? "active" : ""}
                key={c}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="tool-grid">
          {shown.map((t) => (
            <article className="tool-card" key={t.id}>
              <button className="tool-image" onClick={() => setSelected(t)}>
                <img src={t.image} alt={t.name} />
                <span>
                  View details <ArrowUpRight size={15} />
                </span>
              </button>
              <div className="tool-card-body">
                <span className="eyebrow">{t.category}</span>
                <h3>{t.name}</h3>
                <p>{t.description}</p>
                <div className="tool-card-foot">
                  <span>{t.price}</span>
                  <Button
                    to={`/contact?service=Rent%20Tools`}
                    variant="line-dark"
                  >
                    Enquire <ArrowRight size={15} />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
        {!shown.length && (
          <div className="empty-state">
            No tools match that search. Try a different name or category.
          </div>
        )}
      </section>
      {selected && (
        <Modal title={selected.name} onClose={() => setSelected(null)}>
          <img
            className="modal-photo"
            src={selected.image}
            alt={selected.name}
          />
          <span className="eyebrow">
            {selected.category} · {selected.price}
          </span>
          <p>{selected.description}</p>
          <Button
            to="/contact?service=Rent%20Tools"
            onClick={() => setSelected(null)}
          >
            Ask about this tool <ArrowRight size={16} />
          </Button>
        </Modal>
      )}
      <ContactBand />
    </>
  );
}
function Modal({ title, onClose, children }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X />
        </button>
        <span className="eyebrow">RK7 / DETAILS</span>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
function GalleryPage() {
  const [items] = useStore("gallery");
  const [cat, setCat] = useState("All"),
    [selected, setSelected] = useState(null);
  const live = items.filter((i) => i.published),
    cats = ["All", ...new Set(live.map((i) => i.category))],
    shown = live.filter((i) => cat === "All" || i.category === cat);
  return (
    <>
      <PageHero
        eyebrow="Made with care"
        title={
          <>
            Work and moments
            <br />
            <em>we’re glad to share.</em>
          </>
        }
        image={photo("photo-1464366400600-7168b8af9bc3")}
      />
      <section className="gallery-section section">
        <div className="gallery-filter">
          {cats.map((c) => (
            <button
              key={c}
              className={cat === c ? "active" : ""}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="gallery-grid">
          {shown.map((g, i) => (
            <button
              key={g.id}
              className={`gallery-tile tile-${(i % 6) + 1}`}
              onClick={() => setSelected(g)}
            >
              <img src={g.image} alt={g.title} />
              <div>
                <span>{g.category}</span>
                <h3>{g.title}</h3>
              </div>
              <span className="tile-open">
                <ArrowUpRight size={18} />
              </span>
            </button>
          ))}
        </div>
      </section>
      {selected && (
        <Modal title={selected.title} onClose={() => setSelected(null)}>
          <img
            className="modal-photo"
            src={selected.image}
            alt={selected.title}
          />
          <span className="eyebrow">{selected.category}</span>
          <p>{selected.description}</p>
        </Modal>
      )}
      <ContactBand />
    </>
  );
}
function ContactPage() {
  const [notice, setNotice] = useState("");
  const [params] = useState(() => new URLSearchParams(window.location.search));
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: params.get("service") || "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [enquiries, save] = useStore("enquiries");
  function submit(e) {
    e.preventDefault();
    const er = {};
    if (form.name.trim().length < 2) er.name = "Please enter your name.";
    if (!/^[+()\d\s-]{8,}$/.test(form.phone))
      er.phone = "Enter a valid phone number.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      er.email = "Enter a valid email address.";
    if (!form.service) er.service = "Choose a service.";
    if (form.message.trim().length < 10)
      er.message = "Please add a little more detail.";
    setErrors(er);
    if (Object.keys(er).length) return;
    save([
      {
        ...form,
        id: Date.now(),
        date: new Date().toISOString().slice(0, 10),
        status: "New",
      },
      ...enquiries,
    ]);
    setForm({ name: "", phone: "", email: "", service: "", message: "" });
    setNotice("Thanks for reaching out. Our team will be in touch.");
  }
  return (
    <>
      <PageHero
        eyebrow="Start a conversation"
        title={
          <>
            Tell us what
            <br />
            <em>you have in mind.</em>
          </>
        }
        image={photo("photo-1486406146926-c627a92ad1ab")}
        copy="A project, a celebration or just a question — we’d love to hear from you."
      />
      <section className="contact-page section">
        <div className="contact-details">
          <span className="eyebrow">WE’RE EASY TO REACH</span>
          <h2>
            Real people.
            <br />
            <em>Good conversations.</em>
          </h2>
          <a href={`tel:${PHONE}`}>
            <Phone />
            <span>
              <small>Call our team</small>
              {PHONE}
            </span>
            <ArrowUpRight />
          </a>
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer">
            <MessageCircle />
            <span>
              <small>WhatsApp</small>Start a conversation
            </span>
            <ArrowUpRight />
          </a>
          <a href={`mailto:${EMAIL}`}>
            <Mail />
            <span>
              <small>Email us</small>
              {EMAIL}
            </span>
            <ArrowUpRight />
          </a>
          <div className="location">
            <MapPin />
            <span>
              <small>Come say hello</small>Manjeri, Malappuram
              <br />
              Kerala, India
            </span>
          </div>
          <div className="map-placeholder">
            <MapPin />
            <span>MANJERI, KERALA</span>
            <small>
              RK7 is based in Manjeri, serving Malappuram and beyond.
            </small>
          </div>
        </div>
        <form className="contact-form form-card" onSubmit={submit} noValidate>
          <span className="eyebrow">SEND AN ENQUIRY</span>
          <h3>Let’s get the conversation started.</h3>
          <Field
            label="Your name"
            value={form.name}
            error={errors.name}
            onChange={(v) => setForm({ ...form, name: v })}
            placeholder="Name"
          />
          <div className="form-two">
            <Field
              label="Phone number"
              value={form.phone}
              error={errors.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
              placeholder="+91"
            />
            <Field
              label="Email (optional)"
              value={form.email}
              error={errors.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="you@example.com"
            />
          </div>
          <label className="field">
            <span>What can we help with?</span>
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
            >
              <option value="">Choose a service</option>
              {[
                "Construction",
                "Event Management",
                "Rent Tools",
                "Something else",
              ].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            {errors.service && (
              <small className="error">{errors.service}</small>
            )}
          </label>
          <label className="field">
            <span>Tell us a little about it</span>
            <textarea
              rows="4"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="What are you planning?"
            />
            {errors.message && (
              <small className="error">{errors.message}</small>
            )}
          </label>
          <button className="button button-dark submit-btn">
            Send enquiry <ArrowRight size={16} />
          </button>
          <p className="form-note">
            Your message is stored in this demo for the RK7 team to review.
          </p>
        </form>
      </section>
      <Notice message={notice} onClose={() => setNotice("")} />
    </>
  );
}
function Field({ label, value, onChange, placeholder, error, type = "text" }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <small className="error">{error}</small>}
    </label>
  );
}
function ReviewForm() {
  const [reviews, save] = useStore("reviews"),
    [notice, setNotice] = useState(""),
    [v, setV] = useState({ name: "", service: "", rating: 5, review: "" }),
    [error, setError] = useState("");
  function submit(e) {
    e.preventDefault();
    if (v.name.trim().length < 2 || !v.service || v.review.trim().length < 10) {
      setError("Please complete each field and write at least 10 characters.");
      return;
    }
    save([
      {
        ...v,
        id: Date.now(),
        date: new Date().toISOString().slice(0, 10),
        status: "Pending",
      },
      ...reviews,
    ]);
    setV({ name: "", service: "", rating: 5, review: "" });
    setError("");
    setNotice("Thank you. Your review has been submitted for approval.");
  }
  return (
    <>
      <PageHero
        eyebrow="Your experience matters"
        title={
          <>
            A few words from you
            <br />
            <em>go a long way.</em>
          </>
        }
        image={photo("photo-1521737711867-e3b97375f902")}
      />
      <section className="review-form-wrap section">
        <div>
          <span className="eyebrow">SHARE YOUR EXPERIENCE</span>
          <h2>
            We’d love to hear
            <br />
            <em>how it went.</em>
          </h2>
          <p>
            Thoughtful feedback helps our team grow and helps others find the
            right people for their plans.
          </p>
        </div>
        <form className="form-card" onSubmit={submit}>
          <Field
            label="Your name"
            value={v.name}
            onChange={(name) => setV({ ...v, name })}
            placeholder="Name"
          />
          <label className="field">
            <span>Service you used</span>
            <select
              value={v.service}
              onChange={(e) => setV({ ...v, service: e.target.value })}
            >
              <option value="">Choose a service</option>
              {["Construction", "Event Management", "Rent Tools"].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <div className="field">
            <span>Your rating</span>
            <div className="rating-select">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  onClick={() => setV({ ...v, rating: n })}
                  className={n <= v.rating ? "selected" : ""}
                  key={n}
                  aria-label={`${n} stars`}
                >
                  <Star fill="currentColor" />
                </button>
              ))}
            </div>
          </div>
          <label className="field">
            <span>Your review</span>
            <textarea
              rows="5"
              value={v.review}
              onChange={(e) => setV({ ...v, review: e.target.value })}
              placeholder="What stood out to you?"
            />
          </label>
          {error && <small className="error">{error}</small>}
          <button className="button button-dark">
            Submit review <ArrowRight size={16} />
          </button>
          <p className="form-note">
            Reviews are checked by our team before being shared publicly.
          </p>
        </form>
      </section>
      <Notice message={notice} onClose={() => setNotice("")} />
    </>
  );
}

function AdminLogin() {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [error, setError] = useState("");
  const nav = useNavigate();
  function submit(e) {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("rk7_admin", "1");
      nav("/admin/tools");
    } else setError("Those details didn’t match. Please try again.");
  }
  return (
    <div className="login-page">
      <Link to="/" className="brand">
        <img className="brand-logo" src="/RK7-1-Photoroom.png" alt="RK7" />
      </Link>
      <form className="login-card" onSubmit={submit}>
        <span className="eyebrow">RK7 / TEAM ACCESS</span>
        <h1>Welcome back.</h1>
        <p>Sign in to manage RK7 photos and tool names.</p>
        <Field
          label="Email address"
          value={email}
          onChange={setEmail}
          placeholder="admin@rk7.in"
          type="email"
        />
        <Field
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          type="password"
        />
        {error && <small className="error">{error}</small>}
        <button className="button button-dark">
          Sign in <ArrowRight size={16} />
        </button>
        <div className="demo-credentials">
          <span>DEMO ACCESS</span>
          <code>{ADMIN_EMAIL}</code>
          <code>{ADMIN_PASSWORD}</code>
        </div>
      </form>
      <Link to="/" className="login-back">
        ← Back to rk7.in
      </Link>
    </div>
  );
}
const adminNav = [
  ["Tools", "/admin/tools", Wrench],
  ["Construction", "/admin/construction", Construction],
  ["Events", "/admin/events", Images],
];
function AdminGuard() {
  return sessionStorage.getItem("rk7_admin") === "1" ? (
    <AdminLayout />
  ) : (
    <Navigate to="/admin/login" replace />
  );
}
function AdminLayout() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc]);
  const title = adminNav.find((x) => x[1] === loc.pathname)?.[0] || "Tools";
  function logout() {
    sessionStorage.removeItem("rk7_admin");
    nav("/admin/login");
  }
  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${open ? "sidebar-open" : ""}`}>
        <Link to="/" className="brand">
          <img className="brand-logo" src="/RK7-1-Photoroom.png" alt="RK7" />
        </Link>
        <div className="sidebar-label">CONTENT</div>
        <nav>
          {adminNav.map(([name, to, Icon]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? "admin-nav-link selected" : "admin-nav-link"
              }
            >
              <Icon size={18} />
              {name}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <span className="admin-avatar">RK</span>
          <span>
            <b>RK7 Admin</b>
            <small>Administrator</small>
          </span>
          <button onClick={logout} title="Log out">
            <LogOut size={17} />
          </button>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-menu" onClick={() => setOpen(!open)}>
            <Menu />
          </button>
          <div>
            <span className="admin-crumb">CONTENT /</span> {title}
          </div>
          <Link to="/" target="_blank">
            View website <ArrowUpRight size={15} />
          </Link>
        </header>
        <div className="admin-content">
          <Routes>
            <Route path="/admin/tools" element={<ToolsAdmin />} />
            <Route
              path="/admin/construction"
              element={<ImageCollectionAdmin kind="Construction" />}
            />
            <Route
              path="/admin/events"
              element={<ImageCollectionAdmin kind="Events" />}
            />
            <Route path="*" element={<Navigate to="/admin/tools" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
function AdminHeading({ eyebrow, title, copy, action }) {
  return (
    <div className="admin-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
      {action}
    </div>
  );
}
function Dashboard() {
  const [enquiries] = useStore("enquiries"),
    [reviews] = useStore("reviews"),
    [tools] = useStore("tools"),
    [gallery] = useStore("gallery");
  const stats = [
    ["Total enquiries", enquiries.length, ClipboardList],
    [
      "New enquiries",
      enquiries.filter((x) => x.status === "New").length,
      Clock3,
    ],
    [
      "Pending reviews",
      reviews.filter((x) => x.status === "Pending").length,
      MessageSquareText,
    ],
    ["Published tools", tools.filter((x) => x.published).length, Wrench],
    ["Gallery images", gallery.length, Images],
  ];
  return (
    <>
      <AdminHeading
        eyebrow={new Intl.DateTimeFormat("en-IN", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
          .format(new Date())
          .toUpperCase()}
        title="Good morning."
        copy="Here’s what’s happening across your RK7 website today."
      />
      <div className="stats-grid">
        {stats.map(([label, n, I]) => (
          <div className="stat-card" key={label}>
            <span>{label}</span>
            <b>{n}</b>
            <I size={18} />
          </div>
        ))}
      </div>
      <div className="dashboard-grid">
        <div className="admin-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">LATEST</span>
              <h3>Recent enquiries</h3>
            </div>
            <Link to="/admin/enquiries">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          {enquiries.slice(0, 4).map((e) => (
            <div className="recent-row" key={e.id}>
              <span className="row-avatar">
                {e.name
                  .split(" ")
                  .map((x) => x[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <span>
                <b>{e.name}</b>
                <small>
                  {e.service} · {e.date}
                </small>
              </span>
              <Status status={e.status} />
            </div>
          ))}
        </div>
        <div className="admin-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">NEEDS A LOOK</span>
              <h3>Review moderation</h3>
            </div>
            <Link to="/admin/reviews">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          {reviews.filter((x) => x.status === "Pending").length ? (
            reviews
              .filter((x) => x.status === "Pending")
              .slice(0, 3)
              .map((r) => (
                <div className="recent-review" key={r.id}>
                  <b>{r.name}</b>
                  <span>
                    {"★".repeat(r.rating)} · {r.service}
                  </span>
                  <p>{r.review}</p>
                </div>
              ))
          ) : (
            <div className="admin-empty">
              All caught up. No pending reviews.
            </div>
          )}
        </div>
      </div>
      <div className="quick-links">
        <span className="eyebrow">QUICK ACCESS</span>
        {adminNav.slice(1).map(([n, to, I]) => (
          <Link key={to} to={to}>
            <I size={17} />
            {n}
            <ArrowUpRight size={15} />
          </Link>
        ))}
      </div>
    </>
  );
}
function Status({ status }) {
  return (
    <span
      className={`status status-${status.toLowerCase().replaceAll(" ", "-")}`}
    >
      {status}
    </span>
  );
}
function ServicesAdmin() {
  const [items, save] = useStore("services"),
    [editing, setEditing] = useState(null),
    [notice, setNotice] = useState("");
  function update(k, v) {
    setEditing({ ...editing, [k]: v });
  }
  function commit() {
    save(items.map((s) => (s.id === editing.id ? editing : s)));
    setEditing(null);
    setNotice("Service updates saved. Public pages now reflect your changes.");
  }
  return (
    <>
      <AdminHeading
        eyebrow="PUBLIC CONTENT"
        title="Services"
        copy="Update the three ways RK7 helps customers."
      />
      {items.map((s) => (
        <div className="manage-card service-manage" key={s.id}>
          <img src={s.image} alt="" />
          <div className="manage-card-copy">
            <span className="eyebrow">{s.id.toUpperCase()}</span>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <Status status={s.published ? "Published" : "Unpublished"} />
          </div>
          <div className="manage-actions">
            <button
              className="icon-button"
              onClick={() => setEditing({ ...s })}
            >
              <Pencil size={16} /> Edit
            </button>
            <button
              className="icon-button"
              onClick={() =>
                save(
                  items.map((x) =>
                    x.id === s.id ? { ...x, published: !x.published } : x,
                  ),
                )
              }
            >
              {s.published ? <EyeOff size={16} /> : <Eye size={16} />}{" "}
              {s.published ? "Unpublish" : "Publish"}
            </button>
          </div>
        </div>
      ))}
      {editing && (
        <Modal title="Edit service" onClose={() => setEditing(null)}>
          <div className="edit-form">
            <Field
              label="Service title"
              value={editing.title}
              onChange={(v) => update("title", v)}
            />
            <Field
              label="Short description"
              value={editing.description}
              onChange={(v) => update("description", v)}
            />
            <label className="field">
              <span>Service content</span>
              <textarea
                rows="3"
                value={editing.content}
                onChange={(e) => update("content", e.target.value)}
              />
            </label>
            <Field
              label="Image URL"
              value={editing.image}
              onChange={(v) => update("image", v)}
            />
            <ImageUpload onImage={(image) => update("image", image)} />
            <img className="edit-preview" src={editing.image} alt="Preview" />
            <label className="check-label">
              <input
                type="checkbox"
                checked={editing.published}
                onChange={(e) => update("published", e.target.checked)}
              />{" "}
              Published on public site
            </label>
            <button className="button button-dark" onClick={commit}>
              Save changes <Check size={16} />
            </button>
          </div>
        </Modal>
      )}
      <Notice message={notice} onClose={() => setNotice("")} />
    </>
  );
}
function LegacyToolsAdmin() {
  return null;
}
function ImageUpload({ onImage }) {
  return (
    <label className="upload-label">
      Choose a local image
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          const reader = new FileReader();
          reader.onload = () => onImage(reader.result);
          reader.readAsDataURL(f);
        }}
      />
    </label>
  );
}
function ToolsAdmin() {
  const [items, save] = useStore("tools"),
    [editing, setEditing] = useState(null),
    [notice, setNotice] = useState(""),
    [error, setError] = useState("");
  const blank = { id: -1, name: "", image: "", published: true };
  function commit() {
    if (!editing.image) {
      setError("Choose an image before saving.");
      return;
    }
    const item = {
      id: editing.id === -1 ? Date.now() : editing.id,
      image: editing.image,
      name: editing.name.trim(),
      published: true,
    };
    save(
      editing.id === -1
        ? [item, ...items]
        : items.map((x) => (x.id === editing.id ? item : x)),
    );
    setEditing(null);
    setError("");
    setNotice("Tool saved.");
  }
  return (
    <>
      <AdminHeading
        eyebrow="RENTAL PHOTOS"
        title="Tools"
        copy="Add a tool photo. A name is optional."
        action={
          <button
            className="button button-dark"
            onClick={() => {
              setEditing({ ...blank });
              setError("");
            }}
          >
            <Plus size={16} /> Add tool
          </button>
        }
      />
      <div className="admin-tool-grid">
        {items.map((t) => (
          <article className="admin-tool-card" key={t.id}>
            <img src={t.image} alt={t.name || "Tool"} />
            <div>
              <span className="eyebrow">TOOL</span>
              <h3>{t.name || "Untitled tool"}</h3>
              <div className="tool-admin-foot">
                <span />
                <span>
                  <button
                    className="icon-button"
                    onClick={() => {
                      setEditing({
                        id: t.id,
                        name: t.name || "",
                        image: t.image,
                      });
                      setError("");
                    }}
                  >
                    <Pencil size={15} /> Edit
                  </button>
                  <button
                    className="icon-button danger"
                    onClick={() => save(items.filter((x) => x.id !== t.id))}
                  >
                    <Trash2 size={15} /> Delete
                  </button>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      {!items.length && (
        <div className="admin-empty">
          No tools yet. Add a photo to get started.
        </div>
      )}
      {editing && (
        <Modal
          title={editing.id === -1 ? "Add tool" : "Edit tool"}
          onClose={() => setEditing(null)}
        >
          <div className="edit-form">
            <label className="field">
              <span>
                Tool name <small>(optional)</small>
              </span>
              <input
                value={editing.name}
                onChange={(e) =>
                  setEditing({ ...editing, name: e.target.value })
                }
                placeholder="e.g. Concrete mixer"
              />
            </label>
            <ImageUpload
              onImage={(image) => {
                setEditing({ ...editing, image });
                setError("");
              }}
            />
            <small className="form-note">A photo is required.</small>
            {editing.image && (
              <img
                className="edit-preview"
                src={editing.image}
                alt="Tool preview"
              />
            )}
            {error && <small className="error">{error}</small>}
            <button className="button button-dark" onClick={commit}>
              Save tool <Check size={16} />
            </button>
          </div>
        </Modal>
      )}
      <Notice message={notice} onClose={() => setNotice("")} />
    </>
  );
}
function ImageCollectionAdmin({ kind }) {
  const [all, save] = useStore("gallery"),
    [editing, setEditing] = useState(null),
    [notice, setNotice] = useState(""),
    [error, setError] = useState("");
  const items = all.filter((x) => x.category === kind);
  const blank = {
    id: -1,
    title: "",
    description: "",
    category: kind,
    image: "",
    published: true,
  };
  function commit() {
    if (!editing.image) {
      setError("Choose an image before saving.");
      return;
    }
    const item = {
      ...editing,
      id: editing.id === -1 ? Date.now() : editing.id,
      title: kind === "Construction" ? editing.title.trim() : "",
      description: editing.description.trim(),
      category: kind,
      published: true,
    };
    save(
      editing.id === -1
        ? [item, ...all]
        : all.map((x) => (x.id === editing.id ? item : x)),
    );
    setEditing(null);
    setError("");
    setNotice(`${kind} image saved.`);
  }
  const isConstruction = kind === "Construction";
  return (
    <>
      <AdminHeading
        eyebrow={isConstruction ? "CONSTRUCTION SITES" : "EVENT PHOTOS"}
        title={isConstruction ? "Construction" : "Events"}
        copy={
          isConstruction
            ? "Manage site photos, with an optional site name and description."
            : "Manage event photos with an optional description."
        }
        action={
          <button
            className="button button-dark"
            onClick={() => {
              setEditing({ ...blank });
              setError("");
            }}
          >
            <Plus size={16} /> Add image
          </button>
        }
      />
      <div className="admin-gallery-grid">
        {items.map((i) => (
          <article key={i.id}>
            <img src={i.image} alt={i.title || `${kind} photo`} />
            <div>
              {isConstruction && <h3>{i.title || "Unnamed site"}</h3>}
              {i.description && <p>{i.description}</p>}
              <div className="tool-admin-foot">
                <span className="eyebrow">{kind.toUpperCase()}</span>
                <span>
                  <button
                    className="icon-button"
                    onClick={() => {
                      setEditing({ ...i });
                      setError("");
                    }}
                  >
                    <Pencil size={15} /> Edit
                  </button>
                  <button
                    className="icon-button danger"
                    onClick={() => save(all.filter((x) => x.id !== i.id))}
                  >
                    <Trash2 size={15} /> Delete
                  </button>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      {!items.length && (
        <div className="admin-empty">
          No {kind.toLowerCase()} images yet. Add an image to get started.
        </div>
      )}
      {editing && (
        <Modal
          title={`${editing.id === -1 ? "Add" : "Edit"} ${kind.toLowerCase()} image`}
          onClose={() => setEditing(null)}
        >
          <div className="edit-form">
            {isConstruction && (
              <label className="field">
                <span>
                  Site name <small>(optional)</small>
                </span>
                <input
                  value={editing.title || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, title: e.target.value })
                  }
                  placeholder="e.g. Riverside residence"
                />
              </label>
            )}
            <label className="field">
              <span>
                Description <small>(optional)</small>
              </span>
              <textarea
                rows="3"
                value={editing.description || ""}
                onChange={(e) =>
                  setEditing({ ...editing, description: e.target.value })
                }
                placeholder="Add a short description"
              />
            </label>
            <ImageUpload
              onImage={(image) => {
                setEditing({ ...editing, image });
                setError("");
              }}
            />
            <small className="form-note">An image is required.</small>
            {editing.image && (
              <img
                className="edit-preview"
                src={editing.image}
                alt="Image preview"
              />
            )}
            {error && <small className="error">{error}</small>}
            <button className="button button-dark" onClick={commit}>
              Save image <Check size={16} />
            </button>
          </div>
        </Modal>
      )}
      <Notice message={notice} onClose={() => setNotice("")} />
    </>
  );
}
function GalleryAdmin() {
  const [items, save] = useStore("gallery"),
    [editing, setEditing] = useState(null),
    [notice, setNotice] = useState("");
  const fresh = {
    id: -1,
    title: "",
    category: "Construction",
    description: "",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    published: true,
  };
  function commit() {
    save(
      editing.id === -1
        ? [{ ...editing, id: Date.now() }, ...items]
        : items.map((x) => (x.id === editing.id ? editing : x)),
    );
    setEditing(null);
    setNotice("Gallery saved. Public gallery is updated.");
  }
  return (
    <>
      <AdminHeading
        eyebrow="PROJECT PHOTOGRAPHY"
        title="Gallery"
        copy="Curate the work and moments shared on the public site."
        action={
          <button
            className="button button-dark"
            onClick={() => setEditing({ ...fresh })}
          >
            <Plus size={16} /> Add image
          </button>
        }
      />
      <div className="admin-gallery-grid">
        {items.map((i) => (
          <article key={i.id}>
            <img src={i.image} alt="" />
            <div>
              <span className="eyebrow">{i.category}</span>
              <h3>{i.title}</h3>
              <div className="tool-admin-foot">
                <Status status={i.published ? "Published" : "Unpublished"} />
                <span>
                  <button
                    className="icon-button"
                    onClick={() => setEditing({ ...i })}
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    className="icon-button danger"
                    onClick={() => save(items.filter((x) => x.id !== i.id))}
                  >
                    <Trash2 size={15} />
                  </button>
                  <button
                    className="icon-button"
                    onClick={() =>
                      save(
                        items.map((x) =>
                          x.id === i.id ? { ...x, published: !x.published } : x,
                        ),
                      )
                    }
                  >
                    {i.published ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      {editing && (
        <Modal
          title={editing.id === -1 ? "Add gallery image" : "Edit gallery image"}
          onClose={() => setEditing(null)}
        >
          <div className="edit-form">
            <Field
              label="Image title"
              value={editing.title}
              onChange={(v) => setEditing({ ...editing, title: v })}
            />
            <label className="field">
              <span>Category</span>
              <select
                value={editing.category}
                onChange={(e) =>
                  setEditing({ ...editing, category: e.target.value })
                }
              >
                {["Construction", "Events", "Tools"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Description</span>
              <textarea
                rows="3"
                value={editing.description}
                onChange={(e) =>
                  setEditing({ ...editing, description: e.target.value })
                }
              />
            </label>
            <Field
              label="Image URL"
              value={editing.image}
              onChange={(v) => setEditing({ ...editing, image: v })}
            />
            <ImageUpload
              onImage={(image) => setEditing({ ...editing, image })}
            />
            <img className="edit-preview" src={editing.image} alt="Preview" />
            <label className="check-label">
              <input
                type="checkbox"
                checked={editing.published}
                onChange={(e) =>
                  setEditing({ ...editing, published: e.target.checked })
                }
              />{" "}
              Published on public site
            </label>
            <button className="button button-dark" onClick={commit}>
              Save image <Check size={16} />
            </button>
          </div>
        </Modal>
      )}
      <Notice message={notice} onClose={() => setNotice("")} />
    </>
  );
}
function EnquiriesAdmin() {
  const [items, save] = useStore("enquiries"),
    [q, setQ] = useState(""),
    [status, setStatus] = useState("All"),
    [selected, setSelected] = useState(null);
  const statuses = [
    "All",
    "New",
    "Contacted",
    "In Progress",
    "Completed",
    "Closed",
  ];
  const shown = items.filter(
    (i) =>
      (status === "All" || i.status === status) &&
      `${i.name} ${i.phone} ${i.service} ${i.message}`
        .toLowerCase()
        .includes(q.toLowerCase()),
  );
  return (
    <>
      <AdminHeading
        eyebrow="CUSTOMER CONVERSATIONS"
        title="Enquiries"
        copy="Keep track of every conversation and what happens next."
      />
      <div className="table-toolbar">
        <div className="search-box">
          <Search size={17} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search customers or messages"
          />
        </div>
        <label>
          <Filter size={15} />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {statuses.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>CUSTOMER</th>
              <th>SERVICE</th>
              <th>MESSAGE</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {shown.map((i) => (
              <tr key={i.id}>
                <td>
                  <b>{i.name}</b>
                  <small>{i.phone}</small>
                </td>
                <td>{i.service}</td>
                <td className="message-cell">{i.message}</td>
                <td>{i.date}</td>
                <td>
                  <select
                    className="status-select"
                    value={i.status}
                    onChange={(e) =>
                      save(
                        items.map((x) =>
                          x.id === i.id ? { ...x, status: e.target.value } : x,
                        ),
                      )
                    }
                  >
                    {statuses.slice(1).map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="icon-button"
                    onClick={() => setSelected(i)}
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!shown.length && (
          <div className="admin-empty">No enquiries match those filters.</div>
        )}
      </div>
      {selected && (
        <Modal title="Enquiry details" onClose={() => setSelected(null)}>
          <div className="detail-list">
            <span>
              <small>CUSTOMER</small>
              {selected.name}
            </span>
            <span>
              <small>PHONE</small>
              <a href={`tel:${selected.phone}`}>{selected.phone}</a>
            </span>
            <span>
              <small>EMAIL</small>
              {selected.email || "Not provided"}
            </span>
            <span>
              <small>SERVICE</small>
              {selected.service}
            </span>
            <span>
              <small>DATE</small>
              {selected.date}
            </span>
            <span>
              <small>MESSAGE</small>
              {selected.message}
            </span>
            <Button
              to={`https://wa.me/${selected.phone.replace(/\D/g, "")}`}
              variant="line-dark"
            >
              Open WhatsApp <ArrowUpRight size={15} />
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
function ReviewsAdmin() {
  const [items, save] = useStore("reviews"),
    [q, setQ] = useState(""),
    [tab, setTab] = useState("All");
  const shown = items.filter(
    (i) =>
      (tab === "All" || i.status === tab) &&
      `${i.name} ${i.review} ${i.service}`
        .toLowerCase()
        .includes(q.toLowerCase()),
  );
  function setStatus(id, s) {
    save(items.map((x) => (x.id === id ? { ...x, status: s } : x)));
  }
  return (
    <>
      <AdminHeading
        eyebrow="CUSTOMER FEEDBACK"
        title="Reviews"
        copy="Approve reviews to share them on the public website."
      />
      <div className="review-admin-controls">
        <div className="filter-chips">
          {["All", "Pending", "Approved", "Rejected"].map((x) => (
            <button
              key={x}
              className={tab === x ? "active" : ""}
              onClick={() => setTab(x)}
            >
              {x}{" "}
              <small>
                {x === "All"
                  ? items.length
                  : items.filter((r) => r.status === x).length}
              </small>
            </button>
          ))}
        </div>
        <div className="search-box">
          <Search size={16} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search reviews"
          />
        </div>
      </div>
      <div className="review-admin-list">
        {shown.map((r) => (
          <article key={r.id}>
            <div className="review-admin-head">
              <span className="row-avatar">
                {r.name.slice(0, 2).toUpperCase()}
              </span>
              <span>
                <b>{r.name}</b>
                <small>
                  {r.service} · {r.date}
                </small>
              </span>
              <div className="stars">
                {Array.from({ length: r.rating }, (_, i) => (
                  <Star size={14} fill="currentColor" key={i} />
                ))}
              </div>
              <Status status={r.status} />
            </div>
            <p>“{r.review}”</p>
            <div className="review-actions">
              {r.status !== "Approved" && (
                <button
                  className="button button-dark small-button"
                  onClick={() => setStatus(r.id, "Approved")}
                >
                  <Check size={15} /> Approve
                </button>
              )}
              {r.status !== "Rejected" && (
                <button
                  className="button button-line-dark small-button"
                  onClick={() => setStatus(r.id, "Rejected")}
                >
                  Reject
                </button>
              )}
              <button
                className="icon-button danger"
                onClick={() => save(items.filter((x) => x.id !== r.id))}
              >
                <Trash2 size={15} /> Delete
              </button>
            </div>
          </article>
        ))}
        {!shown.length && (
          <div className="admin-empty">No reviews in this view.</div>
        )}
      </div>
    </>
  );
}
function ToolsPage() {
  const [tools] = useStore("tools");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);
  const shown = tools.filter(
    (t) => t.published !== false && (t.name || "").toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <>
      <PageHero eyebrow="Tools for the work ahead" title={<>Get the gear.<br/><em>Get on with it.</em></>} image={photo("photo-1504307651254-35680f356dfd")} copy="Reliable equipment, straightforward enquiries and a local team ready to help you find the right fit." />
      <section className="tool-listing section">
        <div className="listing-head"><div><span className="eyebrow">THE RENTAL SHELF</span><h2>Good tools make<br/><em>good work easier.</em></h2></div><p>Need a hand choosing? Give us a call and we’ll help you work out what’s right.</p></div>
        <div className="filter-row"><div className="search-box"><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Find a tool…"/></div></div>
        <div className="tool-grid">{shown.map(t=><article className="tool-card" key={t.id}><button className="tool-image" onClick={()=>setSelected(t)}><img src={t.image} alt={t.name||"Tool"}/><span>View photo <ArrowUpRight size={15}/></span></button><div className="tool-card-body"><h3>{t.name||"Tool"}</h3><div className="tool-card-foot"><span/><Button to="/contact?service=Rent%20Tools" variant="line-dark">Enquire <ArrowRight size={15}/></Button></div></div></article>)}</div>
        {!shown.length&&<div className="empty-state">No tools match that search.</div>}
      </section>
      {selected&&<Modal title={selected.name||"Tool"} onClose={()=>setSelected(null)}><img className="modal-photo" src={selected.image} alt={selected.name||"Tool"}/><Button to="/contact?service=Rent%20Tools" onClick={()=>setSelected(null)}>Enquire <ArrowRight size={16}/></Button></Modal>}
      <ContactBand />
    </>
  );
}

function ServicePage({ id }) {
  const [services] = useStore("services"), [gallery] = useStore("gallery");
  const s = services.find(x => x.id === id);
  if (!s?.published) return <div className="empty-public">This service is currently unavailable. <Link to="/contact">Contact our team</Link></div>;
  const event = id === "events", kind = event ? "Events" : "Construction";
  const imgs = gallery.filter(g => g.published !== false && g.category === kind).slice(0, 3);
  const offerings = event ? ["Weddings & receptions", "Corporate gatherings", "Community celebrations", "Private occasions"] : ["New home construction", "Renovation & extensions", "Commercial projects", "Finishing & interiors"];
  return <><PageHero eyebrow={s.eyebrow} title={event ? <>Good days deserve<br/><em>good planning.</em></> : <>A solid start.<br/><em>A lasting finish.</em></>} image={imgs[0]?.image || s.image} copy={s.description}/><section className="service-intro section"><div className="eyebrow">MADE FOR YOUR PLANS</div><div><h2>{s.title}, with <em>care at every step.</em></h2><p>{s.content}</p><p>We begin with a conversation, shape a clear plan together, then take care of the details with a team you can count on.</p><Button to="/contact">Tell us what you need <ArrowRight size={16}/></Button></div></section><section className="offering-section"><div><span className="eyebrow">HOW WE CAN HELP</span><h2>Made to fit<br/><em>your occasion.</em></h2></div><div className="offering-list">{offerings.map((x,i)=><div key={x}><span>0{i+1}</span><h3>{x}</h3><ArrowUpRight size={18}/></div>)}</div></section><section className="work-section section"><div className="work-heading"><SectionTitle eyebrow="A FEW RECENT STORIES" title="Care you can see."/><Link to="/gallery" className="text-link">See the gallery <ArrowRight size={16}/></Link></div><div className="work-grid">{imgs.map((g,i)=><Link to="/gallery" className={`work-item work-item-${i+1}`} key={g.id}><img src={g.image} alt={g.title || `${kind} photo`}/><div><span>{kind}</span><h3>{g.title || (event ? "Event photo" : "Site photo")}</h3>{g.description&&<p>{g.description}</p>}</div></Link>)}</div></section><ContactBand/></>;
}

function App() {
  const loc = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loc.pathname]);
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<AdminGuard />} />
      <Route path="/*" element={<PublicLayout />} />
    </Routes>
  );
}

export default App;
