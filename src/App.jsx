import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navigation from '@/components/common/navigation';
import Home from '@/pages/home';
import About from '@/pages/about';
import Projects from '@/pages/projects';

/**
 * App 컴포넌트
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <App />
 */
function App() {
  return (
    <BrowserRouter basename="/my-portfolio">
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
