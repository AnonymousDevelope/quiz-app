import React, { useEffect } from 'react';
import './App.css';
import { Footer, Header } from './components';
import Circle from './gradient-component/circle';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Home, Quiz, Result } from './pages';
import { QuizContextProvider } from './context';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.classList.add('bgBody'); // Apply your background class here
    navigate('/');
  }, []);
  return (
    <QuizContextProvider >
      <>
        <Header />
        <Circle position={1} top={'20%'} left={'8%'} />
        <Circle position={3} top={'5%'} right={'10%'} />
        <Circle position={10} top={'50%'} left={'35%'} />
        <Circle position={4} top={'40%'} right={'50%'} />
        <Routes>
          <Route expact path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
        <Footer />
      </>
    </QuizContextProvider>
  );
}

export default App;
