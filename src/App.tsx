import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import ExecutiveView from './pages/ExecutiveView';
import OperationalView from './pages/OperationalView';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/executive" replace />} />
        <Route path="/executive" element={<ExecutiveView />} />
        <Route path="/operational" element={<OperationalView />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50 font-sans">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Header />
          <div className="pt-[72px]">
            <AnimatedRoutes />
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
