import { useState } from "react";

function Reports() {
  const [reportType, setReportType] = useState("monthly");
  const [showExportMenu, setShowExportMenu] = useState(false);

  // ================================
  // SUMMARY DATA
  // ================================

  const summaryData = [
    {
      title: "Total Revenue",
      value: "$91,200",
      change: "+8.2%",
      icon: "↗",
    },
    {
      title: "Total Orders",
      value: "8,452",
      change: "+6.8%",
      icon: "▣",
    },
    {
      title: "Total Customers",
      value: "24,500",
      change: "+12.5%",
      icon: "♙",
    },
    {
      title: "Retention Rate",
      value: "84.2%",
      change: "+4.1%",
      icon: "↻",
    },
  ];

  // ================================
  // MONTHLY DATA
  // ================================

  const monthlyData = [
    {
      period: "January",
      revenue: "$62,400",
      orders: "5,820",
      customers: "17,200",
      retention: "76%",
      performance: 76,
    },
    {
      period: "February",
      revenue: "$65,800",
      orders: "6,120",
      customers: "18,100",
      retention: "78%",
      performance: 78,
    },
    {
      period: "March",
      revenue: "$69,500",
      orders: "6,480",
      customers: "18,900",
      retention: "79%",
      performance: 79,
    },
    {
      period: "April",
      revenue: "$71,200",
      orders: "6,730",
      customers: "19,400",
      retention: "80%",
      performance: 80,
    },
    {
      period: "May",
      revenue: "$74,600",
      orders: "6,950",
      customers: "20,100",
      retention: "81%",
      performance: 81,
    },
    {
      period: "June",
      revenue: "$77,300",
      orders: "7,120",
      customers: "20,800",
      retention: "82%",
      performance: 82,
    },
    {
      period: "July",
      revenue: "$81,500",
      orders: "7,480",
      customers: "21,500",
      retention: "83%",
      performance: 83,
    },
    {
      period: "August",
      revenue: "$86,700",
      orders: "8,020",
      customers: "23,100",
      retention: "84%",
      performance: 87,
    },
    {
      period: "September",
      revenue: "$91,200",
      orders: "8,452",
      customers: "24,500",
      retention: "84%",
      performance: 92,
    },
    {
      period: "October",
      revenue: "$94,800",
      orders: "8,730",
      customers: "25,200",
      retention: "85%",
      performance: 94,
    },
    {
      period: "November",
      revenue: "$98,400",
      orders: "9,120",
      customers: "26,100",
      retention: "86%",
      performance: 96,
    },
    {
      period: "December",
      revenue: "$105,600",
      orders: "9,840",
      customers: "27,400",
      retention: "88%",
      performance: 98,
    },
  ];

  // ================================
  // YEARLY DATA
  // ================================

  const yearlyData = [
    
    {
      period: "2023",
      revenue: "$538,700",
      orders: "51,200",
      customers: "15,800",
      retention: "73%",
      performance: 73,
    },
    {
      period: "2024",
      revenue: "$682,400",
      orders: "63,500",
      customers: "18,900",
      retention: "78%",
      performance: 78,
    },
    {
      period: "2025",
      revenue: "$814,600",
      orders: "74,800",
      customers: "21,700",
      retention: "81%",
      performance: 81,
    },
    {
      period: "2026",
      revenue: "$1,024,300",
      orders: "91,420",
      customers: "28,600",
      retention: "86%",
      performance: 92,
    },
  ];

  const currentData =
    reportType === "monthly"
      ? monthlyData
      : yearlyData;

  // ================================
  // EXPORT CSV
  // ================================

  const exportCSV = () => {
    const rows = [];

    rows.push([
      "ADMINPRO ANALYTICS REPORT",
    ]);

    rows.push([
      `Report Type: ${reportType === "monthly"
        ? "Monthly Performance"
        : "Yearly Performance"
      }`,
    ]);

    rows.push([
      `Generated: ${new Date().toLocaleString()}`,
    ]);

    rows.push([]);

    rows.push([
      "Period",
      "Revenue",
      "Orders",
      "Customers",
      "Retention",
      "Performance",
    ]);

    currentData.forEach((item) => {
      rows.push([
        item.period,
        item.revenue,
        item.orders,
        item.customers,
        item.retention,
        `${item.performance}%`,
      ]);
    });

    const csvContent = rows
      .map((row) =>
        row
          .map((cell) => {
            const value = String(cell ?? "");

            if (
              value.includes(",") ||
              value.includes('"') ||
              value.includes("\n")
            ) {
              return `"${value.replace(/"/g, '""')}"`;
            }

            return value;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
      reportType === "monthly"
        ? "AdminPro_Monthly_Report.csv"
        : "AdminPro_Yearly_Report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setShowExportMenu(false);
  };

  // ================================
  // PRINT / PDF
  // ================================

  const printReport = () => {
    setShowExportMenu(false);

    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="reports-page">

      {/* =================================
          HEADER
      ================================= */}

      <div className="page-header">

        <div>
          <span className="eyebrow">
            BUSINESS ANALYTICS
          </span>

          <h1>Reports</h1>

          <p>
            Monitor your business performance
            across monthly and yearly periods.
          </p>
        </div>

        {/* EXPORT */}

        <div className="export-wrapper">

          <button
            className="export-button"
            onClick={() =>
              setShowExportMenu(!showExportMenu)
            }
          >
            <span>↓</span>

            Export Report

            <span className="export-arrow">
              {showExportMenu ? "▲" : "▼"}
            </span>
          </button>

          {showExportMenu && (
            <div className="export-menu">

              <button onClick={exportCSV}>
                <span className="export-menu-icon">
                  ▣
                </span>

                <div>
                  <strong>
                    Export CSV
                  </strong>

                  <small>
                    Download {reportType} data
                  </small>
                </div>
              </button>

              <button onClick={printReport}>
                <span className="export-menu-icon">
                  ⎙
                </span>

                <div>
                  <strong>
                    Print / Save PDF
                  </strong>

                  <small>
                    Generate printable report
                  </small>
                </div>
              </button>

            </div>
          )}

        </div>

      </div>

      {/* =================================
          SUMMARY CARDS
      ================================= */}

      <div className="report-card-grid">

        {summaryData.map((item) => (
          <div
            className="report-summary-card"
            key={item.title}
          >

            <div className="report-summary-icon">
              {item.icon}
            </div>

            <div className="report-card-content">

              <span>
                {item.title}
              </span>

              <strong>
                {item.value}
              </strong>

              <small>
                <b>{item.change}</b>
                {" "}vs previous period
              </small>

            </div>

          </div>
        ))}

      </div>

      {/* =================================
          PERFORMANCE SECTION
      ================================= */}

      <div className="report-section">

        {/* SECTION HEADER */}

        <div className="report-section-header">

          <div>
            <span className="eyebrow">
              PERFORMANCE
            </span>

            <h2>
              {reportType === "monthly"
                ? "Monthly Performance"
                : "Yearly Performance"}
            </h2>

            <p>
              {reportType === "monthly"
                ? "Track your business performance month by month."
                : "Compare your annual business performance and growth."}
            </p>
          </div>

          {/* PERIOD SWITCH */}

          <div className="report-switch">

            <button
              className={
                reportType === "monthly"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setReportType("monthly")
              }
            >
              Monthly
            </button>

            <button
              className={
                reportType === "yearly"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setReportType("yearly")
              }
            >
              Yearly
            </button>

          </div>

        </div>

        {/* =================================
            TABLE
        ================================= */}

        <div className="performance-table-wrapper">

          <table className="performance-table">

            <thead>
              <tr>
                <th>
                  {reportType === "monthly"
                    ? "MONTH"
                    : "YEAR"}
                </th>

                <th>REVENUE</th>

                <th>ORDERS</th>

                <th>CUSTOMERS</th>

                <th>RETENTION</th>

                <th>PERFORMANCE</th>

                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>

              {currentData.map((item) => (

                <tr key={item.period}>

                  <td>
                    <strong>
                      {item.period}
                    </strong>
                  </td>

                  <td>
                    <strong>
                      {item.revenue}
                    </strong>
                  </td>

                  <td>
                    {item.orders}
                  </td>

                  <td>
                    {item.customers}
                  </td>

                  <td>
                    <span className="retention-value">
                      {item.retention}
                    </span>
                  </td>

                  <td>

                    <div className="performance-cell">

                      <div className="report-progress">

                        <div className="report-progress-track">

                          <div
                            className="report-progress-bar"
                            style={{
                              width: `${item.performance}%`,
                            }}
                          ></div>

                        </div>

                      </div>

                      <span>
                        {item.performance}%
                      </span>

                    </div>

                  </td>

                  <td>

                    <span
                      className={`report-status ${item.performance >= 90
                          ? "excellent"
                          : item.performance >= 80
                            ? "good"
                            : "track"
                        }`}
                    >
                      {item.performance >= 90
                        ? "Excellent"
                        : item.performance >= 80
                          ? "Good"
                          : "On Track"}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* FOOTER */}

        <div className="report-table-footer">

          <span>
            Showing {currentData.length}{" "}
            {reportType === "monthly"
              ? "months"
              : "years"}
          </span>

          <span>
            Last updated: Today
          </span>

        </div>

      </div>

    </div>
  );
}

export default Reports;