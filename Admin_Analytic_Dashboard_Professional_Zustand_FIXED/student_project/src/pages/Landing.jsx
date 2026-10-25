import { useNavigate } from "react-router-dom";

const productCards = [
  {
    icon: "▥",
    title: "Overview",
    description: "See the full picture with clear, at-a-glance metrics.",
    className: "preview-overview",
    detail: (
      <div className="mini-kpi-grid">
        <div><span>Revenue</span><strong>$4.28L</strong><i>↗ 12.8%</i></div>
        <div><span>Active users</span><strong>2,840</strong><i>↗ 8.2%</i></div>
        <div className="mini-chart" aria-label="Decorative revenue chart">
          <b /><b /><b /><b /><b /><b /><b />
        </div>
      </div>
    ),
  },
  {
    icon: "♙",
    title: "Users",
    description: "Keep teams, account roles, and user details organized.",
    className: "preview-users",
    detail: (
      <div className="mini-user-list">
        <div><span className="mini-avatar blue">AS</span><span><strong>Aman Sharma</strong><small>Administrator</small></span><em>Active</em></div>
        <div><span className="mini-avatar violet">MK</span><span><strong>Meera Kapoor</strong><small>Manager</small></span><em>Active</em></div>
        <div><span className="mini-avatar teal">RD</span><span><strong>Rahul Das</strong><small>User</small></span><em>Active</em></div>
      </div>
    ),
  },
  {
    icon: "▤",
    title: "Products",
    description: "Track inventory and spot items that need attention.",
    className: "preview-products",
    detail: (
      <div className="mini-product-list">
        <div><span className="product-tile purple">▦</span><span><strong>Workspace kit</strong><small>Office supplies</small></span><b>124 <small>in stock</small></b></div>
        <div><span className="product-tile cyan">▧</span><span><strong>Wireless headset</strong><small>Electronics</small></span><b>48 <small>in stock</small></b></div>
        <div><span className="product-tile orange">▤</span><span><strong>Notebook set</strong><small>Stationery</small></span><b>12 <small>in stock</small></b></div>
      </div>
    ),
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <header className="landing-navbar">
        <button className="landing-brand" onClick={() => navigate("/")} aria-label="AdminPro home">
          <span className="landing-brand-mark">A</span>
          <span className="landing-brand-copy">
            <strong>AdminPro</strong>
            <small>ANALYTICS PLATFORM</small>
          </span>
        </button>

        <nav className="landing-links" aria-label="Main navigation">
          <a href="#platform">Platform</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </nav>

        <div className="landing-nav-actions">
          <button className="landing-login" onClick={() => navigate("/login")}>Log in</button>
          <button className="landing-signup" onClick={() => navigate("/signup")}>Sign up free <span>↗</span></button>
        </div>
      </header>

      <main>
        <section className="landing-hero" id="platform">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="hero-copy">
            <div className="hero-eyebrow"><span className="eyebrow-dot" /> ONE WORKSPACE. BETTER DECISIONS.</div>
            <h1>Great work starts<br />when <span>everything connects.</span></h1>
            <p>
              Manage users, track products, and understand your business from one
              clear, connected dashboard built to keep your work moving.
            </p>
            <div className="hero-buttons">
              <button className="hero-primary" onClick={() => navigate("/signup")}>Explore AdminPro <span>→</span></button>
              <button className="hero-secondary" onClick={() => navigate("/login")}>Log in to your workspace</button>
            </div>
            <div className="hero-trust"><span className="trust-check">✓</span> Simple to use <span className="trust-separator">•</span> Designed for teams <span className="trust-separator">•</span> One connected workspace</div>
          </div>

          <div className="hero-visual" aria-label="AdminPro dashboard preview">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="dashboard-window">
              <div className="window-topbar">
                <div className="window-dots"><i /><i /><i /></div>
                <span>adminpro / overview</span>
                <span className="window-status"><i /> Live preview</span>
              </div>
              <div className="window-body">
                <aside className="preview-sidebar">
                  <div className="preview-logo"><span>A</span><b>AdminPro</b></div>
                  <small>WORKSPACE</small>
                  <div className="preview-side-active">▦ <span>Overview</span></div>
                  <div>♙ <span>Users</span></div>
                  <div>▤ <span>Products</span></div>
                  <div>▥ <span>Reports</span></div>
                  <div>⚙ <span>Settings</span></div>
                  <div className="preview-side-user"><span>AS</span><b>Aman Sharma<small>Administrator</small></b></div>
                </aside>
                <div className="preview-main">
                  <div className="preview-heading"><div><small>MONDAY, OCTOBER 26</small><h3>Good morning, Aman <span>✦</span></h3></div><button>↻ Refresh</button></div>
                  <div className="preview-metrics">
                    <div><span>Total revenue</span><strong>$4,28,540</strong><small className="metric-up">↗ 12.8% <em>vs last month</em></small></div>
                    <div><span>Active users</span><strong>2,840</strong><small className="metric-up">↗ 8.2% <em>vs last month</em></small></div>
                    <div><span>Products</span><strong>1,342</strong><small className="metric-neutral">● Inventory healthy</small></div>
                  </div>
                  <div className="preview-chart-card">
                    <div className="chart-card-heading"><div><strong>Performance overview</strong><small>Revenue over the last 7 months</small></div><span>Last 7 months⌄</span></div>
                    <div className="chart-area">
                      <div className="chart-y-labels"><span>₹5L</span><span>₹4L</span><span>₹3L</span><span>₹2L</span></div>
                      <div className="chart-graph">
                        <div className="chart-gridline line-a" /><div className="chart-gridline line-b" /><div className="chart-gridline line-c" /><div className="chart-gridline line-d" />
                        <svg viewBox="0 0 420 120" preserveAspectRatio="none" role="img" aria-label="Illustrative rising revenue trend">
                          <defs><linearGradient id="landingChartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#78a5ff" stopOpacity=".38" /><stop offset="100%" stopColor="#78a5ff" stopOpacity="0" /></linearGradient></defs>
                          <path d="M0,94 C28,82 37,87 62,70 S102,80 128,57 S166,68 192,47 S230,63 254,37 S296,49 322,30 S364,37 390,16 L420,10 L420,120 L0,120 Z" fill="url(#landingChartFill)" />
                          <path d="M0,94 C28,82 37,87 62,70 S102,80 128,57 S166,68 192,47 S230,63 254,37 S296,49 322,30 S364,37 390,16 L420,10" fill="none" stroke="#82aaff" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        <div className="chart-x-labels"><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="floating-insight"><span className="insight-icon">↗</span><span><strong>Performance is growing</strong><small>Revenue up 12.8% this month</small></span><b>+12.8%</b></div>
          </div>
          <div className="hero-bottom-fade" />
        </section>

        <section className="landing-modules" id="features">
          <div className="modules-intro">
            <div><span className="section-eyebrow">YOUR WORK, IN SYNC</span><h2>Everything you need.<br /><span>All in one place.</span></h2></div>
            <p>Less time switching between tools. More time understanding what matters and moving forward with confidence.</p>
          </div>
          <div className="landing-feature-grid">
            {productCards.map((card) => (
              <article className={`landing-feature-card ${card.className}`} key={card.title}>
                <div className="feature-card-preview">{card.detail}</div>
                <div className="feature-card-text">
                  <span className="feature-icon">{card.icon}</span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <button onClick={() => navigate("/signup")}>Get started <span>→</span></button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-bottom-cta" id="about">
          <div><span className="section-eyebrow">READY WHEN YOU ARE</span><h2>Make your next decision<br />your best one.</h2><p>Start with a clearer view of your users, products, and performance.</p></div>
          <button onClick={() => navigate("/signup")}>Create your workspace <span>→</span></button>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-brand"><span className="landing-brand-mark">A</span><strong>AdminPro</strong></div>
        <span>© 2026 AdminPro Analytics Dashboard · Student project</span>
        <button onClick={() => navigate("/login")}>Sign in <span>→</span></button>
      </footer>
    </div>
  );
}
