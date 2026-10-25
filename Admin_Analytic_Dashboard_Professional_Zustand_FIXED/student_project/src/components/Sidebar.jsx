function Sidebar({
  collapsed,
  activePage,
  setActivePage,
  userName,
  currentPlan,
  onUpgrade,
}) {
  const menuItems = [
    {
      id: "dashboard",
      icon: "▦",
      label: "Dashboard",
    },
    {
      id: "users",
      icon: "♙",
      label: "Users",
    },
    {
      id: "products",
      icon: "▣",
      label: "Products",
    },
    {
      id: "reports",
      icon: "▤",
      label: "Reports",
    },
    {
      id: "settings",
      icon: "⚙",
      label: "Settings",
    },
  ];

  const initials = userName
    ? userName
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
    : "AU";

  const planName =
    currentPlan === "free"
      ? "FREE PLAN"
      : `${currentPlan.toUpperCase()} PLAN`;

  const isFreePlan = currentPlan === "free";

  return (
    <aside
      className={
        collapsed
          ? "sidebar collapsed"
          : "sidebar"
      }
    >

      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-mark">
          A
        </div>

        {!collapsed && (
          <div className="logo-text">
            <strong>AdminPro</strong>
            <span>Analytics</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="nav-section">

        {!collapsed && (
          <p className="nav-title">
            MAIN MENU
          </p>
        )}

        <nav>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={
                activePage === item.id
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() =>
                setActivePage(item.id)
              }
              title={
                collapsed
                  ? item.label
                  : ""
              }
            >
              <span className="nav-icon">
                {item.icon}
              </span>

              {!collapsed && (
                <span className="nav-label">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Upgrade / Current Plan Card */}
      {!collapsed && (
        <div className="upgrade-card">

          <div className="upgrade-icon">
            {isFreePlan ? "✦" : "◆"}
          </div>

          <div className="upgrade-plan-label">
            {planName}
          </div>

          <h4>
            {isFreePlan
              ? "Upgrade your plan"
              : "You're on a premium plan"}
          </h4>

          <p>
            {isFreePlan
              ? "Get more powerful analytics and advanced features."
              : "Enjoy advanced analytics and premium features."}
          </p>

          <button onClick={onUpgrade}>
            {isFreePlan
              ? "Upgrade Now"
              : "Manage Plan"}
          </button>

        </div>
      )}

      {/* User */}
      <div className="sidebar-user">

        <div className="user-avatar">
          {initials}
        </div>

        {!collapsed && (
          <div className="user-details">
            <strong>{userName}</strong>
            <span>Administrator</span>
          </div>
        )}

      </div>

    </aside>
  );
}

export default Sidebar;