
import { useMemo, useState } from "react";

const monthLabels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const monthlyData = {
  all: [42, 55, 48, 68, 60, 76, 72, 84, 78, 91, 86, 96],
  top: [24, 32, 28, 43, 39, 51, 48, 60, 56, 68, 64, 74],
};

const quarterlyData = {
  all: [64, 48, 82, 39],
  top: [42, 35, 68, 54],
};

const yearlyData = {
  all: [48, 61, 55, 76, 68],
  top: [30, 42, 38, 59, 51],
};

const periodLabels = {
  Monthly: monthLabels,
  Quarterly: ["Q1", "Q2", "Q3", "Q4"],
  Yearly: ["2022", "2023", "2024", "2025", "2026"],
};

function readArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function Dashboard() {
  const [period, setPeriod] = useState("Monthly");
  const [productFilter, setProductFilter] = useState("All Products");
  const [notice, setNotice] = useState("");

  const users = useMemo(() => readArray("adminProUsers"), []);
  const products = useMemo(() => readArray("adminProProducts"), []);

  const registeredUsers = users.length;
  const productCount = products.length;

  const selectedData = useMemo(() => {
    const source =
      period === "Monthly"
        ? monthlyData
        : period === "Quarterly"
          ? quarterlyData
          : yearlyData;

    return productFilter === "All Products" ? source.all : source.top;
  }, [period, productFilter]);

  const labels = periodLabels[period];

  // Currency display: US dollars (USD).
  // The converted values are illustrative demo amounts.
  const metrics = [
    {
      label: "Total Sales",
      value: "$42,86,540",
      change: "+8.3%",
      icon: "↗",
      points: "2,18 9,14 16,17 23,8 30,12 37,4 44,7",
    },
    {
      label: "Total Revenue",
      value: "$91,200",
      change: "+8.3%",
      icon: "$",
      points: "2,17 9,13 16,16 23,9 30,11 37,3 44,6",
    },
    {
      label: "Net Profit",
      value: "$1,000",
      change: "+8.3%",
      icon: "↗",
      points: "2,20 9,15 16,17 23,11 30,12 37,4 44,5",
    },
    {
      label: "Customer Retention",
      value: "72%",
      change: "−8.3%",
      negative: true,
      icon: "↘",
      points: "2,5 9,8 16,7 23,13 30,11 37,17 44,19",
    },
    {
      label: "Products",
      value: productCount.toLocaleString("en-US"),
      change: "Stored locally",
      icon: "▣",
      points: "2,18 9,14 16,15 23,8 30,10 37,5 44,7",
    },
  ];

  const exportData = () => {
    const rows = [
      ["Metric", "Value"],
      ["Total Sales", "132.5K"],
      ["Total Revenue (USD)", "$600K"],
      ["Net Profit (USD)", "$211K"],
      ["Customer Retention", "72%"],
      ["Users in local storage", registeredUsers],
      ["Products in local storage", productCount],
    ];

    const csv = rows
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "AdminPro_Analytics_USD.csv";
    link.click();
    URL.revokeObjectURL(url);

    setNotice("Dashboard report exported in USD.");
  };

  const highestValue = Math.max(...selectedData);
  const lowestValue = Math.min(...selectedData);
  const highestIndex = selectedData.indexOf(highestValue);
  const lowestIndex = selectedData.indexOf(lowestValue);
  const pointX = (index) =>
    index * (594 / Math.max(selectedData.length - 1, 1));
  const pointY = (value) => 190 - value * 1.65;

  return (
    <div className="dashboard-page exec-dashboard">
      <header className="exec-header">
        <div className="exec-heading">
          <div className="exec-brand-mark">✦</div>
          <div>
            <span className="exec-kicker">ADMINPRO ANALYTICS</span>
            <h1>Executive Business Dashboard</h1>
            <p>Your workspace performance at a glance.</p>
          </div>
        </div>

        <div className="exec-header-actions">
          <button
            className="exec-icon-button"
            aria-label="Search"
            onClick={() =>
              setNotice("Use the Users and Products pages to search records.")
            }
          >
            ⌕
          </button>
          <button
            className="exec-icon-button"
            aria-label="Notifications"
            onClick={() =>
              setNotice("You're all caught up — no new notifications.")
            }
          >
            ♧
            <span className="exec-notification-dot" />
          </button>
          <div className="exec-avatar" title="Admin profile">
            A
          </div>
        </div>
      </header>

      {notice && (
        <div className="exec-notice" role="status">
          {notice}
          <button onClick={() => setNotice("")} aria-label="Dismiss">
            ×
          </button>
        </div>
      )}

      <section className="exec-metric-grid" aria-label="Business metrics">
        {metrics.map((metric, index) => (
          <article className="exec-metric-card" key={metric.label}>
            <div className="exec-metric-top">
              <span>{metric.label}</span>
              <span className="exec-metric-arrow">{metric.icon}</span>
            </div>
            <div className="exec-metric-value">{metric.value}</div>
            <div className="exec-metric-bottom">
              <span
                className={
                  metric.negative ? "exec-change negative" : "exec-change"
                }
              >
                {metric.change}
              </span>
              <svg
                viewBox="0 0 48 24"
                className="exec-sparkline"
                aria-hidden="true"
              >
                <polyline points={metric.points} />
              </svg>
            </div>
            <span className="exec-metric-caption">
              {index === 4
                ? "Current saved product records"
                : "Compared with previous period"}
            </span>
          </article>
        ))}
      </section>

      <section className="exec-charts-grid">
        <article className="exec-panel exec-sales-panel">
          <div className="exec-panel-header">
            <div>
              <span className="exec-kicker">SALES PERFORMANCE</span>
              <h2>
                {productFilter} — {period} Sales
              </h2>
              <div className="exec-chart-summary">
                {selectedData
                  .reduce((sum, value) => sum + value, 0)
                  .toLocaleString("en-US")}
                <span className="exec-change">↗ Interactive demo</span>
              </div>
            </div>

            <div className="exec-filters">
              <select
                aria-label="Chart period"
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
              >
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Yearly</option>
              </select>

              <select
                aria-label="Product filter"
                value={productFilter}
                onChange={(event) => setProductFilter(event.target.value)}
              >
                <option>All Products</option>
                <option>Top Products</option>
              </select>
            </div>
          </div>

          <div className="exec-line-chart">
            <div className="exec-y-labels">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            <div className="exec-line-chart-inner">
              <div className="exec-chart-gridlines">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>

              <svg
                viewBox="0 0 600 210"
                preserveAspectRatio="none"
                role="img"
                aria-label={`${period} ${productFilter} sales graph`}
              >
                <defs>
                  <linearGradient
                    id="salesFill"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#3869f6"
                      stopOpacity=".18"
                    />
                    <stop
                      offset="100%"
                      stopColor="#3869f6"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <path
                  d={`M ${selectedData
                    .map((value, index) => `${pointX(index)},${pointY(value)}`)
                    .join(" L ")} L 594,210 L 0,210 Z`}
                  fill="url(#salesFill)"
                />

                <polyline
                  points={selectedData
                    .map((value, index) => `${pointX(index)},${pointY(value)}`)
                    .join(" ")}
                  fill="none"
                  stroke="#3869f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />

                {selectedData.map((value, index) => (
                  <circle
                    key={`${period}-${productFilter}-${index}`}
                    cx={pointX(index)}
                    cy={pointY(value)}
                    r="4"
                    fill="#3869f6"
                  />
                ))}
              </svg>

              <div
                className="exec-x-labels"
                style={{
                  gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))`,
                }}
              >
                {labels.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="exec-chart-footnote">
            <span>
              <i className="exec-legend-dot" /> Sales trend
            </span>
            <span>
              {period} view · {productFilter}
            </span>
          </div>
        </article>

        <article className="exec-panel exec-quarter-panel">
          <div className="exec-panel-header">
            <div>
              <span className="exec-kicker">GROWTH</span>
              <h2>{period} Growth</h2>
              <div className="exec-chart-summary">
                {productFilter}
                <span className="exec-change">Updated by filters</span>
              </div>
            </div>
          </div>

          <div className="exec-quarter-bars">
            {selectedData.map((value, index) => (
              <div
                className="exec-quarter-column"
                key={`${period}-${productFilter}-${index}`}
              >
                <div
                  className={`exec-quarter-bar ${
                    index === highestIndex ? "selected" : ""
                  }`}
                  style={{ height: `${value}%` }}
                  title={`${labels[index]}: ${value}`}
                >
                  {index === highestIndex && (
                    <span>Highest: {value}</span>
                  )}
                </div>
                <small>{labels[index]}</small>
              </div>
            ))}
          </div>

          <div className="exec-quarter-footer">
            <span>
              <i className="exec-legend-dot" /> Performance comparison
            </span>
            <span>{productFilter}</span>
          </div>
        </article>
      </section>

      <section className="exec-bottom-grid">
        <article className="exec-panel exec-products-panel">
          <div className="exec-panel-header">
            <div>
              <span className="exec-kicker">PRODUCT MIX</span>
              <h2>Top Products by Revenue</h2>
            </div>
            <button
              className="exec-small-action"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("navigateToPage", {
                    detail: "products",
                  })
                )
              }
            >
              ↗
            </button>
          </div>

          <div className="exec-donut-wrap">
            <div className="exec-donut">
              <div className="exec-donut-center">
                <strong>68%</strong>
                <span>Top product</span>
              </div>
            </div>
            <div className="exec-donut-legend">
              <span>
                <i className="exec-legend-dot" /> AdminPro featured products
              </span>
              <span>
                <i className="exec-legend-dot muted" /> Other products
              </span>
              <small>
                {productCount} product record
                {productCount === 1 ? "" : "s"} saved in this browser
              </small>
            </div>
          </div>
        </article>

        <article className="exec-panel exec-insight-panel">
          <div className="exec-panel-header">
            <div>
              <span className="exec-kicker">HIGHLIGHTS</span>
              <h2>Business Insights</h2>
            </div>
            <span className="exec-insight-icon">✦</span>
          </div>

          <div className="exec-insight-grid">
            <div className="exec-insight-tile">
              <span>
                Best{" "}
                {period === "Monthly"
                  ? "Month"
                  : period === "Quarterly"
                    ? "Quarter"
                    : "Year"}
              </span>
              <strong>{highestValue}</strong>
              <small>{labels[highestIndex]} · demo data</small>
            </div>
            <div className="exec-insight-tile">
              <span>Lowest Period</span>
              <strong>{lowestValue}</strong>
              <small>{labels[lowestIndex]} · demo data</small>
            </div>
            <div className="exec-insight-tile">
              <span>Registered Users</span>
              <strong>{registeredUsers.toLocaleString("en-US")}</strong>
              <small>Read from local storage</small>
            </div>
            <div className="exec-insight-tile">
              <span>Product Catalogue</span>
              <strong>{productCount.toLocaleString("en-US")}</strong>
              <small>Read from local storage</small>
            </div>
          </div>
        </article>
      </section>

      <div className="exec-disclaimer">
        Revenue and profit are displayed in US dollars (USD). Financial values
        and graph data are illustrative demo figures, not live business data.
        User and product totals are read from this browser's saved AdminPro
        records.
      </div>

      <div className="exec-footer-actions">
        <span>AdminPro Analytics · Executive overview · USD</span>
        <button onClick={exportData}>↓ Export report</button>
      </div>
    </div>
  );
}

export default Dashboard;
