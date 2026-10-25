# AdminPro Analytics — student project

A React dashboard classroom project demonstrating page navigation, Zustand global state, reusable form fields, validation, and asynchronous loading/error feedback.

## Run it
1. Install Node.js (LTS).
2. Open this folder in VS Code.
3. Run `npm install` (this installs Zustand along with the existing dependencies).
4. Run `npm run dev` and open the local URL printed in the terminal.
5. Before presenting, run `npm run build` to check the production build.

## How to test the features
- **Signup:** Open `/signup`, try empty fields, an invalid email, and mismatched passwords. Then create a demo account.
- **Login/loading/errors:** Sign out, try an incorrect password, then log in with the account you created. The button displays a loading label while the demo request runs.
- **SPA navigation:** Use the sidebar to open Dashboard, Users, Products, Reports, and Settings. These are client-side routes.
- **Zustand global state:** Open `src/store/useAppStore.js`. The `create(...)` store holds `user` and `notice`; components read values with `useAppStore((state) => state.user)` and update them with `setUser`.
- **Local state:** Open `src/App.jsx` and `src/pages/Auth.jsx`. UI-only values such as the collapsed sidebar, form input values, and validation errors use `useState` locally.
- **Reusable fields:** Open `src/components/FormField.jsx`; `src/pages/Auth.jsx` uses it for each input.

## Topics demonstrated
- Multi-page SPA navigation: `BrowserRouter`, `Routes`, `Navigate`, `useLocation`, `useNavigate`.
- Global state with **Zustand**: `src/store/useAppStore.js`.
- Global vs local state: Zustand store versus component-level `useState`.
- Form validation and reusable inputs: `src/pages/Auth.jsx`, `src/components/FormField.jsx`.
- Async loading/error handling: the login/signup submit handler in `src/pages/Auth.jsx`.

## Important limitation
This is a frontend classroom demonstration. Demo account passwords are stored in `localStorage` and are not secure. Do not use real passwords. A real app needs a backend, hashed passwords, and server-side session/token handling.


## Latest classroom demo features
- Signup form includes email validation, password visibility toggles, password confirmation, and password strength checks.
- Signup lets a demo account choose User, Manager, or Admin; the role appears in the navigation profile and Users list.
- Login state is intentionally memory-only. Reloading or reopening the project starts at signup, while accounts and data remain in localStorage.
- Products are saved in `adminProProducts`; newly added products show who added them.
- Account data is stored in `adminProAccounts`, and the password-free user directory is stored in `adminProUsers`. This is for a local classroom demo only, not production authentication.
