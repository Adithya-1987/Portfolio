import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

// Visible last-resort fallback so an uncaught render error never leaves the
// user staring at a blank white page.
const AppErrorFallback = (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      color: '#39ff14',
      background: '#0a0e1a',
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      textAlign: 'center',
    }}
  >
    <div>
      <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
        Something went wrong rendering the page.
      </p>
      <p style={{ opacity: 0.7 }}>Try refreshing — details are in the console.</p>
    </div>
  </div>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary fallback={AppErrorFallback}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
