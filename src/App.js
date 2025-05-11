import Header from './elements/Header';
import Sidebar from './elements/Sidebar';
import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
         <Sidebar/>
        <main className="main">
          <Routes>
            
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
