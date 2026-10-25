function Navbar({
  collapsed,
  setCollapsed,
  darkMode,
  setDarkMode,
  userName,
  currentPage,
  onLogout,
  userRole = "User",
}) {
  const initials = userName
    ? userName
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
    : "AU";

  return (
    <header className="navbar">

      {/* LEFT */}
      <div className="navbar-left">

        <button
          className="menu-button"
          onClick={() =>
            setCollapsed(!collapsed)
          }
          title="Toggle Sidebar"
        >
          ☰
        </button>

        <div className="breadcrumb">

          <span>
            Admin
          </span>

          <b>
            /
          </b>

          <strong>
            {currentPage}
          </strong>

        </div>

      </div>

      {/* RIGHT */}
      <div className="navbar-right">

        {/* SEARCH */}
        <div className="search-box">

          <span>
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search..."
          />

          <kbd>
            Ctrl K
          </kbd>

        </div>

        {/* NOTIFICATION */}
        <button
          className="navbar-icon"
          title="Notifications"
        >
          🔔
          <span className="notification-dot"></span>
        </button>

        {/* DARK MODE */}
        <button
          className="navbar-icon"
          onClick={() =>
            setDarkMode(!darkMode)
          }
          title={
            darkMode
              ? "Light Mode"
              : "Dark Mode"
          }
        >
          {darkMode ? "☀" : "☾"}
        </button>

        {/* PROFILE */}
        <div className="profile">

          <div className="profile-avatar">
            {initials}
          </div>

          <div className="profile-info">

            <strong>
              {userName}
            </strong>

            <span>
              {userRole}
            </span>

          </div>

          <button className="profile-logout" onClick={onLogout} title="Sign out">Sign out</button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;