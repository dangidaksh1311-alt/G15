import { useEffect, useState } from "react";

function Settings({ setUserName }) {
  const defaultSettings = {
    fullName: "Admin User",
    email: "admin@adminpro.com",
    role: "Administrator",
    phone: "+91 98765 43210",
    company: "AdminPro Analytics",
    jobTitle: "System Administrator",
    emailNotifications: true,
    weeklyReport: true,
    productAlerts: true,
    securityAlerts: true,
    twoFactor: false,
  };

  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const savedSettings =
      localStorage.getItem("adminProSettings");

    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);

        const mergedSettings = {
          ...defaultSettings,
          ...parsed,
        };

        setSettings(mergedSettings);

        if (
          mergedSettings.fullName &&
          setUserName
        ) {
          setUserName(mergedSettings.fullName);
        }
      } catch (error) {
        console.error(
          "Failed to load settings:",
          error
        );
      }
    }
  }, [setUserName]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSettings((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleToggle = (name) => {
    setSettings((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));

    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(
      "adminProSettings",
      JSON.stringify(settings)
    );

    if (setUserName) {
      setUserName(settings.fullName);
    }

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset all settings?"
    );

    if (!confirmed) return;

    setSettings(defaultSettings);

    localStorage.removeItem(
      "adminProSettings"
    );

    if (setUserName) {
      setUserName(defaultSettings.fullName);
    }

    setSaved(false);
  };

  const getInitials = (name) => {
    if (!name) return "AU";

    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const initials = getInitials(
    settings.fullName
  );

  return (
    <div className="settings-page">

      {/* =================================
          PAGE HEADER
      ================================= */}

      <div className="page-header settings-heading">

        <div>
          <span className="eyebrow">
            ACCOUNT CENTER
          </span>

          <h1>Settings</h1>

          <p>
            Manage your account, preferences,
            notifications and security.
          </p>
        </div>

        <div className="settings-status">

          <span className="status-indicator"></span>

          All systems operational

        </div>

      </div>

      {/* =================================
          PROFILE HERO
      ================================= */}

      <div className="settings-profile-card">

        <div className="settings-profile-main">

          <div className="settings-large-avatar">
            {initials}
          </div>

          <div className="settings-profile-info">

            <div className="settings-name-row">

              <h2>
                {settings.fullName}
              </h2>

              <span className="verified-badge">
                ✓ Verified
              </span>

            </div>

            <p>
              {settings.email}
            </p>

            <div className="settings-profile-meta">

              <span>
                ◉ {settings.role}
              </span>

              <span>
                ● Active
              </span>

              <span>
                Member since 2026
              </span>

            </div>

          </div>

        </div>

        <div className="settings-profile-actions">

          <div className="profile-completion">

            <div className="completion-top">

              <span>
                Profile completion
              </span>

              <strong>
                92%
              </strong>

            </div>

            <div className="completion-track">

              <div
                className="completion-bar"
                style={{ width: "92%" }}
              ></div>

            </div>

          </div>

        </div>

      </div>

      {/* =================================
          SETTINGS LAYOUT
      ================================= */}

      <div className="settings-layout">

        {/* SIDEBAR */}

        <aside className="settings-navigation">

          <div className="settings-nav-title">
            SETTINGS
          </div>

          <button
            className={
              activeSection === "profile"
                ? "settings-nav-item active"
                : "settings-nav-item"
            }
            onClick={() =>
              setActiveSection("profile")
            }
          >
            <span className="settings-nav-icon">
              ♙
            </span>

            <div>
              <strong>Profile</strong>
              <small>
                Personal information
              </small>
            </div>

            <span className="settings-nav-arrow">
              ›
            </span>
          </button>

          <button
            className={
              activeSection === "notifications"
                ? "settings-nav-item active"
                : "settings-nav-item"
            }
            onClick={() =>
              setActiveSection("notifications")
            }
          >
            <span className="settings-nav-icon">
              🔔
            </span>

            <div>
              <strong>Notifications</strong>
              <small>
                Email preferences
              </small>
            </div>

            <span className="settings-nav-arrow">
              ›
            </span>
          </button>

          <button
            className={
              activeSection === "security"
                ? "settings-nav-item active"
                : "settings-nav-item"
            }
            onClick={() =>
              setActiveSection("security")
            }
          >
            <span className="settings-nav-icon">
              🔒
            </span>

            <div>
              <strong>Security</strong>
              <small>
                Account protection
              </small>
            </div>

            <span className="settings-nav-arrow">
              ›
            </span>
          </button>

          <div className="settings-nav-divider"></div>

          <div className="settings-help-card">

            <div className="help-icon">
              ?
            </div>

            <strong>
              Need help?
            </strong>

            <p>
              Contact our support team if
              you need assistance.
            </p>

            <button>
              Contact Support
            </button>

          </div>

        </aside>

        {/* CONTENT */}

        <div className="settings-content">

          {/* =============================
              PROFILE
          ============================= */}

          {activeSection === "profile" && (
            <section className="professional-settings-card">

              <div className="professional-card-header">

                <div>
                  <span className="section-label">
                    ACCOUNT
                  </span>

                  <h2>
                    Personal Information
                  </h2>

                  <p>
                    Keep your account information
                    up to date.
                  </p>
                </div>

                <div className="section-number">
                  01
                </div>

              </div>

              <div className="professional-divider"></div>

              <div className="professional-form">

                <div className="professional-field">

                  <label>
                    FULL NAME
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={settings.fullName}
                    onChange={handleChange}
                  />

                  <small>
                    This name will appear across
                    your dashboard.
                  </small>

                </div>

                <div className="professional-field">

                  <label>
                    EMAIL ADDRESS
                  </label>

                  <div className="input-with-icon">

                    <span>
                      @
                    </span>

                    <input
                      type="email"
                      name="email"
                      value={settings.email}
                      onChange={handleChange}
                    />

                  </div>

                  <small>
                    Your primary account email.
                  </small>

                </div>

                <div className="professional-field">

                  <label>
                    JOB TITLE
                  </label>

                  <input
                    type="text"
                    name="jobTitle"
                    value={settings.jobTitle}
                    onChange={handleChange}
                  />

                </div>

                <div className="professional-field">

                  <label>
                    PHONE NUMBER
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={settings.phone}
                    onChange={handleChange}
                  />

                </div>

                <div className="professional-field full-width">

                  <label>
                    COMPANY
                  </label>

                  <input
                    type="text"
                    name="company"
                    value={settings.company}
                    onChange={handleChange}
                  />

                </div>

                <div className="professional-field">

                  <label>
                    ACCOUNT ROLE
                  </label>

                  <input
                    type="text"
                    value={settings.role}
                    disabled
                  />

                  <small>
                    Role can only be changed by
                    an administrator.
                  </small>

                </div>

              </div>

            </section>
          )}

          {/* =============================
              NOTIFICATIONS
          ============================= */}

          {activeSection === "notifications" && (
            <section className="professional-settings-card">

              <div className="professional-card-header">

                <div>
                  <span className="section-label">
                    PREFERENCES
                  </span>

                  <h2>
                    Notification Settings
                  </h2>

                  <p>
                    Control how AdminPro keeps
                    you informed.
                  </p>
                </div>

                <div className="section-number">
                  02
                </div>

              </div>

              <div className="professional-divider"></div>

              <div className="notification-list">

                <NotificationItem
                  icon="✉"
                  title="Email Notifications"
                  description="Receive important account and activity updates."
                  enabled={
                    settings.emailNotifications
                  }
                  onClick={() =>
                    handleToggle(
                      "emailNotifications"
                    )
                  }
                />

                <NotificationItem
                  icon="▤"
                  title="Weekly Reports"
                  description="Receive a weekly summary of your business performance."
                  enabled={
                    settings.weeklyReport
                  }
                  onClick={() =>
                    handleToggle(
                      "weeklyReport"
                    )
                  }
                />

                <NotificationItem
                  icon="▣"
                  title="Product Alerts"
                  description="Get notified when products are low in stock."
                  enabled={
                    settings.productAlerts
                  }
                  onClick={() =>
                    handleToggle(
                      "productAlerts"
                    )
                  }
                />

                <NotificationItem
                  icon="⚠"
                  title="Security Alerts"
                  description="Receive alerts about suspicious account activity."
                  enabled={
                    settings.securityAlerts
                  }
                  onClick={() =>
                    handleToggle(
                      "securityAlerts"
                    )
                  }
                />

              </div>

            </section>
          )}

          {/* =============================
              SECURITY
          ============================= */}

          {activeSection === "security" && (
            <section className="professional-settings-card">

              <div className="professional-card-header">

                <div>
                  <span className="section-label">
                    PROTECTION
                  </span>

                  <h2>
                    Security & Privacy
                  </h2>

                  <p>
                    Protect your account and
                    personal information.
                  </p>
                </div>

                <div className="section-number">
                  03
                </div>

              </div>

              <div className="professional-divider"></div>

              <div className="security-overview">

                <div className="security-score">

                  <div className="security-score-circle">
                    <strong>
                      85
                    </strong>
                    <span>
                      /100
                    </span>
                  </div>

                  <div>
                    <strong>
                      Good security
                    </strong>

                    <p>
                      Your account security is
                      in good condition.
                    </p>
                  </div>

                </div>

                <span className="security-level">
                  GOOD
                </span>

              </div>

              <div className="security-divider"></div>

              <NotificationItem
                icon="2FA"
                title="Two-Factor Authentication"
                description="Add an extra layer of protection when signing in."
                enabled={
                  settings.twoFactor
                }
                onClick={() =>
                  handleToggle("twoFactor")
                }
              />

              <div className="security-login-card">

                <div className="login-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    Password
                  </strong>

                  <p>
                    Last changed more than
                    30 days ago.
                  </p>
                </div>

                <button>
                  Change Password
                </button>

              </div>

              <div className="danger-zone">

                <div>

                  <span>
                    DANGER ZONE
                  </span>

                  <h3>
                    Delete Account
                  </h3>

                  <p>
                    Permanently delete your
                    account and all associated
                    data.
                  </p>

                </div>

                <button
                  onClick={() =>
                    window.alert(
                      "Account deletion would be handled by your backend."
                    )
                  }
                >
                  Delete Account
                </button>

              </div>

            </section>
          )}

          {/* =============================
              SAVE BAR
          ============================= */}

          <div className="settings-bottom-bar">

            <div>

              {saved ? (
                <div className="changes-saved">
                  <span>✓</span>
                  All changes saved
                </div>
              ) : (
                <span className="save-hint">
                  Changes are saved locally
                  to this browser.
                </span>
              )}

            </div>

            <div className="settings-bottom-actions">

              <button
                className="professional-reset"
                onClick={handleReset}
              >
                Reset
              </button>

              <button
                className="professional-save"
                onClick={handleSave}
              >
                <span>✓</span>
                Save Changes
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

/* =========================================
   NOTIFICATION COMPONENT
========================================= */

function NotificationItem({
  icon,
  title,
  description,
  enabled,
  onClick,
}) {
  return (
    <div className="notification-item">

      <div className="notification-item-left">

        <div className="notification-icon">
          {icon}
        </div>

        <div>
          <strong>
            {title}
          </strong>

          <p>
            {description}
          </p>
        </div>

      </div>

      <button
        type="button"
        className={
          enabled
            ? "professional-toggle active"
            : "professional-toggle"
        }
        onClick={onClick}
        aria-label={`Toggle ${title}`}
      >
        <span></span>
      </button>

    </div>
  );
}

export default Settings;