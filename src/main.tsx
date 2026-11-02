import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

// Immediately signal that the JavaScript application has started
(window as any).__RESEARCHMIND_MOUNTED__ = true;

const rootElement = document.getElementById('root');

if (rootElement) {
  // Clean up any initial loading indicator
  const initialSpinner = document.getElementById('initial-spinner');
  if (initialSpinner) {
    initialSpinner.remove();
  }
  const bootLoader = document.getElementById('app-boot-loader');
  if (bootLoader) {
    bootLoader.remove();
  }

  const existingRoot = (window as any).__RESEARCHMIND_ROOT__;
  if (existingRoot) {
    existingRoot.render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
  } else {
    const root = createRoot(rootElement);
    (window as any).__RESEARCHMIND_ROOT__ = root;
    root.render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
  }
} else {
  console.error('Failed to locate root element #root');
}
