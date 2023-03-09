import { Route, Routes } from 'react-router-dom';

import { Home, News } from '../../Pages/index';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/news-one/:id" element={<News/>}/>
      </Routes>
    </div>
  );
}

export default App;
