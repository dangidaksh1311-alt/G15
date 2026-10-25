import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { useAppStore } from "../store/useAppStore";

function validate(values, signup) {
  const errors = {};
  const email = values.email.trim();
  if (signup && values.name.trim().length < 2) errors.name = "Enter your full name (at least 2 characters).";
  if (!email) errors.email = "Email address is required.";
  else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(email)) errors.email = "Enter a valid email, such as name@example.com.";
  if (!values.password) errors.password = "Password is required.";
  else if (values.password.length < 8) errors.password = "Use at least 8 characters.";
  else if (signup && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(values.password)) errors.password = "Use an uppercase letter, a lowercase letter, and a number.";
  if (signup && values.password !== values.confirmPassword) errors.confirmPassword = "Passwords do not match.";
  return errors;
}

export default function Auth() {
  const location = useLocation();
  // Keep the form mode tied strictly to the current route.
  const signup = location.pathname === "/signup";
  const [values, setValues] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "User" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const setUser = useAppStore((state) => state.setUser);
  const navigate = useNavigate();

  function change(e) {
    const { name, value } = e.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
    setMessage("");
  }

  function submit(e) {
    e.preventDefault();
    const nextErrors = validate(values, signup);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    setMessage("");

    window.setTimeout(() => {
      try {
        const accounts = JSON.parse(localStorage.getItem("adminProAccounts") || "{}");
        const email = values.email.trim().toLowerCase();
        if (signup) {
          if (accounts[email]) { setMessage("An account with this email already exists. Please sign in instead."); setLoading(false); return; }
          const name = values.name.trim();
          const role = values.role;
          const joined = new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
          accounts[email] = { name, email, role, joined, password: values.password };
          localStorage.setItem("adminProAccounts", JSON.stringify(accounts));
          const registeredUser = { id: `registered-${email}`, name, email, role, status: "Active", joined, initials: name.split(/\s+/).map((word) => word[0]).join("").slice(0, 2).toUpperCase(), source: "signup" };
          const savedUsers = JSON.parse(localStorage.getItem("adminProUsers") || "[]");
          localStorage.setItem("adminProUsers", JSON.stringify([registeredUser, ...savedUsers.filter((item) => item.email?.toLowerCase() !== email)]));
          setUser({ name, email, role });
          navigate("/dashboard", { replace: true });
        } else {
          const account = accounts[email];
          if (!account || account.password !== values.password) { setMessage("Email or password is incorrect. Check your details or create an account."); setLoading(false); return; }
          setUser({ name: account.name, email, role: account.role || "User" });
          navigate("/dashboard", { replace: true });
        }
      } catch {
        setMessage("We could not save your details. Please check browser storage and try again.");
      }
      setLoading(false);
    }, 300);
  }

  return (
    <main className="auth-page">
      <section className="auth-showcase">
        <div className="auth-brand"><span className="auth-logo">A</span><span><strong>AdminPro</strong><small>ANALYTICS PLATFORM</small></span></div>
        <div className="auth-pitch"><span className="auth-eyebrow">YOUR WORKSPACE, AT A GLANCE</span><h2>Make every<br />decision count.</h2><p>Manage users, track products, and understand your business from one simple dashboard.</p><div className="auth-feature"><span>✓</span><div><strong>One connected workspace</strong><small>Users, products and reports together</small></div></div><div className="auth-feature"><span>✓</span><div><strong>Role-aware access</strong><small>Know who is signing in to your workspace</small></div></div></div>
        <p className="auth-showcase-footer">STUDENT PROJECT · REACT + ZUSTAND</p>
      </section>
      <section className="auth-panel">
        <div className="auth-card">
          <p className="auth-kicker">{signup ? "GET STARTED" : "WELCOME BACK"}</p>
          <h1>{signup ? "Create your account" : "Sign in to AdminPro"}</h1>
          <p className="auth-subtitle">{signup ? "Enter your details to set up your workspace." : "Use the email and password you registered with."}</p>
          <form onSubmit={submit} noValidate>
            {signup && <FormField label="Full name" name="name" value={values.name} onChange={change} error={errors.name} autoComplete="name" placeholder="e.g. Aman Sharma" />}
            {signup && <div className="form-field"><label htmlFor="role">Account role</label><select id="role" name="role" value={values.role} onChange={change} className="auth-select"><option value="User">User</option><option value="Manager">Manager</option><option value="Admin">Admin</option></select><small className="field-hint">Choose the role for this classroom demo account.</small></div>}
            <FormField label="Email address" name="email" type="email" value={values.email} onChange={change} error={errors.email} autoComplete="email" placeholder="you@example.com" />
            <div className="password-field"><FormField label="Password" name="password" type={showPassword ? "text" : "password"} value={values.password} onChange={change} error={errors.password} autoComplete={signup ? "new-password" : "current-password"} placeholder={signup ? "8+ characters, upper/lowercase and number" : "Enter your password"} /><button className="password-toggle" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button></div>
            {signup && <div className="password-field"><FormField label="Confirm password" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={values.confirmPassword} onChange={change} error={errors.confirmPassword} autoComplete="new-password" placeholder="Enter your password again" /><button className="password-toggle confirm-toggle" type="button" onClick={() => setShowConfirmPassword((visible) => !visible)} aria-label={showConfirmPassword ? "Hide confirmation password" : "Show confirmation password"}>{showConfirmPassword ? "Hide" : "Show"}</button></div>}
            {message && <p className="auth-message" role="alert">{message}</p>}
            <button className="auth-submit" type="submit" disabled={loading}>{loading ? "Please wait…" : signup ? "Create account →" : "Sign in →"}</button>
          </form>
          <p className="auth-switch">{signup ? "Already have an account? " : "Don't have an account? "}<Link to={signup ? "/login" : "/signup"}>{signup ? "Sign in" : "Create account"}</Link></p>
          <p className="demo-note">Your account and dashboard records are saved in this browser. Sign-in state resets when you reopen the app.</p>
        </div>
      </section>
    </main>
  );
}
