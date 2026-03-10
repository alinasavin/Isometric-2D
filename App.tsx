import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

// Lazy load pages for performance
const HomePage = React.lazy(() => import('./pages/HomePage'));

const App: React.FC = () => {
  return (
    <HashRouter>
      <Suspense fallback={<div className="flex items-center justify-center h-screen text-slate-400">Loading Experience...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;