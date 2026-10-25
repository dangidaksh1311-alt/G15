import { useEffect, useState } from "react";

const demoUsers = [
  { id: 1, name: "Rahul Kumar", email: "rahul.kumar@gmail.com", role: "Admin", status: "Active", joined: "Sep 01, 2026", initials: "RK" },
  { id: 2, name: "Priya Sharma", email: "priya.sharma@gmail.com", role: "Manager", status: "Active", joined: "Aug 28, 2026", initials: "PS" },
  { id: 3, name: "Amit Kumar", email: "amit.kumar@gmail.com", role: "User", status: "Active", joined: "Aug 25, 2026", initials: "AK" },
  { id: 4, name: "Neha Verma", email: "neha.verma@gmail.com", role: "User", status: "Inactive", joined: "Aug 21, 2026", initials: "NV" },
  { id: 5, name: "Arjun Singh", email: "arjun.singh@gmail.com", role: "Manager", status: "Active", joined: "Aug 18, 2026", initials: "AS" },
];

function makeInitials(name = "") {
  return name.split(" ").filter(Boolean).map((word) => word[0]).join("").substring(0, 2).toUpperCase();
}

function loadUsers() {
  try {
    const savedUsers = JSON.parse(localStorage.getItem("adminProUsers") || "[]");
    const accounts = JSON.parse(localStorage.getItem("adminProAccounts") || "{}");
    const registeredUsers = Object.entries(accounts).map(([email, account]) => ({
      id: `registered-${email}`,
      name: account.name,
      email,
      role: account.role || "User",
      status: "Active",
      joined: account.joined || "Recently",
      initials: makeInitials(account.name),
      source: "signup",
    }));
    // Combine demo users, users managed from this page, and signup-created accounts.
    const combined = [...demoUsers, ...savedUsers, ...registeredUsers];
    const unique = new Map();
    combined.forEach((user) => unique.set(user.email.toLowerCase(), user));
    return [...unique.values()];
  } catch {
    return demoUsers;
  }
}

function Users() {
  const [users, setUsers] = useState(loadUsers);

  // Persist edits, additions, and deletions across refreshes.
  useEffect(() => {
    localStorage.setItem("adminProUsers", JSON.stringify(users));
  }, [users]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    setEditingUser(null);

    setForm({
      name: "",
      email: "",
      role: "User",
      status: "Active",
    });

    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);

    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });

    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const generateInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id
            ? {
              ...user,
              ...form,
              initials: generateInitials(form.name),
            }
            : user
        )
      );
    } else {
      const newUser = {
        id: Date.now(),
        name: form.name,
        email: form.email,
        role: form.role,
        status: form.status,
        joined: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        initials: generateInitials(form.name),
      };

      setUsers([newUser, ...users]);
    }

    setShowModal(false);
  };

  const deleteUser = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    setUsers(users.filter((user) => user.id !== id));
  };

  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
            ...user,
            status:
              user.status === "Active" ? "Inactive" : "Active",
          }
          : user
      )
    );
  };

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  return (
    <div className="users-page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <span className="eyebrow">USER MANAGEMENT</span>

          <h1>Users</h1>

          <p >
            Manage users, roles, permissions and account status.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={openAddModal}
        >
          <span>＋</span>
          Add User
        </button>
      </div>

      {/* USER STATISTICS */}
      <div className="user-stat-grid">

        <div className="user-stat-card">
          <div className="user-stat-icon blue">
            👥
          </div>

          <div>
            <span>Total Users</span>
            <strong>{users.length}</strong>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon green">
            ✓
          </div>

          <div>
            <span>Active Users</span>
            <strong>{activeUsers}</strong>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon orange">
            ◷
          </div>

          <div>
            <span>Inactive Users</span>
            <strong>{inactiveUsers}</strong>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon purple">
            ↗
          </div>

          <div>
            <span>Growth</span>
            <strong>+12.8%</strong>
          </div>
        </div>

      </div>

      {/* USERS TABLE PANEL */}
      <div className="panel users-panel">

        <div className="users-toolbar">

          <div>
            <h3>All Users</h3>
            <p>
              {filteredUsers.length} users found
            </p>
          </div>

          <div className="users-actions">

            <div className="user-search">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

          </div>

        </div>

        {/* TABLE */}

        <div className="table-wrapper">

          <table className="users-table">

            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (

                  <tr key={user.id}>

                    {/* USER */}
                    <td>

                      <div className="table-user">

                        <div className="table-avatar">
                          {user.initials}
                        </div>

                        <div>
                          <strong>
                            {user.name}
                          </strong>

                          <span>
                            {user.email}
                          </span>
                        </div>

                      </div>

                    </td>

                    {/* ROLE */}
                    <td>
                      <span className="role-badge">
                        {user.role}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td>

                      <button
                        className={`status-badge ${user.status === "Active"
                            ? "active"
                            : "inactive"
                          }`}
                        onClick={() =>
                          toggleStatus(user.id)
                        }
                        title="Click to change status"
                      >

                        <span></span>

                        {user.status}

                      </button>

                    </td>

                    {/* JOINED */}
                    <td>
                      <span className="joined-date">
                        {user.joined}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td>

                      <div className="table-actions">

                        <button
                          className="action-btn edit"
                          onClick={() =>
                            openEditModal(user)
                          }
                          title="Edit user"
                        >
                          ✎
                        </button>

                        <button
                          className="action-btn delete"
                          onClick={() =>
                            deleteUser(user.id)
                          }
                          title="Delete user"
                        >
                          ×
                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="empty-users"
                  >
                    <div>
                      <span>⌕</span>
                      <strong>No users found</strong>
                      <p>
                        Try changing your search or filter.
                      </p>
                    </div>
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ADD / EDIT MODAL */}

      {showModal && (

        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="user-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>
                <span className="modal-icon">
                  {editingUser ? "✎" : "＋"}
                </span>

                <div>
                  <h2>
                    {editingUser
                      ? "Edit User"
                      : "Add New User"}
                  </h2>

                  <p>
                    {editingUser
                      ? "Update user information."
                      : "Create a new user account."}
                  </p>
                </div>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              {/* NAME */}

              <div className="form-group">

                <label>
                  Full Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                />

              </div>

              {/* EMAIL */}

              <div className="form-group">

                <label>
                  Email Address <span>*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                />

              </div>

              {/* ROLE + STATUS */}

              <div className="form-row">

                <div className="form-group">

                  <label>Role</label>

                  <select
                    name="role"
                    value={form.role}
                    onChange={handleInputChange}
                  >
                    <option value="User">
                      User
                    </option>

                    <option value="Manager">
                      Manager
                    </option>

                    <option value="Admin">
                      Admin
                    </option>
                  </select>

                </div>

                <div className="form-group">

                  <label>Status</label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>

                </div>

              </div>

              {/* FORM BUTTONS */}

              <div className="modal-footer">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  {editingUser
                    ? "Save Changes"
                    : "Create User"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Users;