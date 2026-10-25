import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import UpgradeModal from "./components/UpgradeModel";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";

import { useAppStore } from "./store/useAppStore";

const pageNames = {
  "/dashboard": "Dashboard",
  "/users": "Users",
  "/products": "Products",
  "/reports": "Reports",
  "/settings": "Settings",
};

function ProtectedLayout() {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState(user?.name || "Admin User");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [billing, setBilling] = useState("monthly");
  const [currentPlan, setCurrentPlan] = useState("free");

  useEffect(() => {
    setUserName(user?.name || "Admin User");
  }, [user]);

  useEffect(() => {
    const plan = localStorage.getItem("adminProPlan");
    if (plan) setCurrentPlan(plan);
  }, []);

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  const activePage =
    location.pathname === "/dashboard"
      ? "dashboard"
      : location.pathname.slice(1);

  const handleUpgrade = (plan) => {
    setCurrentPlan(plan);
    localStorage.setItem("adminProPlan", plan);
    setShowUpgradeModal(false);
  };

  const renderPage = () => {
    switch (location.pathname) {
      case "/users":
        return <Users />;
      case "/products":
        return <Products />;
      case "/reports":
        return <Reports />;
      case "/settings":
        return <Settings setUserName={setUserName} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Sidebar
        collapsed={sidebarCollapsed}
        activePage={activePage}
        setActivePage={(page) =>
          navigate(page === "dashboard" ? "/dashboard" : `/${page}`)
        }
        userName={userName}
        currentPlan={currentPlan}
        onUpgrade={() => setShowUpgradeModal(true)}
      />

      <div className={sidebarCollapsed ? "main collapsed" : "main"}>
        <Navbar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          userName={userName}
          userRole={user?.role || "User"}
          currentPage={pageNames[location.pathname] || "Dashboard"}
          onLogout={() => {
            setUser(null);
            navigate("/", { replace: true });
          }}
        />
        <main className="content">{renderPage()}</main>
      </div>

      {showUpgradeModal && (
        <UpgradeModal
          currentPlan={currentPlan}
          billing={billing}
          setBilling={setBilling}
          onUpgrade={handleUpgrade}
          onClose={() => setShowUpgradeModal(false)}
        />
      )}
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public landing page is the initial page */}
      <Route path="/" element={<Landing />} />

      {/* Login and signup open the existing Auth component */}
      <Route path="/login" element={<Auth key="login" />} />
      <Route path="/signup" element={<Auth key="signup" />} />

      {/* Protected application pages */}
      <Route path="/dashboard" element={<ProtectedLayout />} />
      <Route path="/users" element={<ProtectedLayout />} />
      <Route path="/products" element={<ProtectedLayout />} />
      <Route path="/reports" element={<ProtectedLayout />} />
      <Route path="/settings" element={<ProtectedLayout />} />

      {/* Unknown routes go back to the landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
