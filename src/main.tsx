import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

(window as any).__RESEARCHMIND_MOUNTED__ = true;

const rootElement = document.getElementById('root');

if (rootElement) {
  const bootLoader = document.getElementById('app-boot-loader');
  if (bootLoader) bootLoader.remove();

  createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
} else {
  console.error('Failed to locate root element #root');
}
