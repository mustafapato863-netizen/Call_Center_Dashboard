import { useState } from 'react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50 font-sans selection:bg-blue-500/30 selection:text-blue-900 relative">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 lg:ml-64 min-h-screen flex flex-col transition-all duration-300 w-full lg:w-auto">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          <div className="pt-[76px] flex-1 w-full">
            <AnimatedRoutes />
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
