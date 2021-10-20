import { GameOfLife } from './components/GameOfLife/GameOfLife';
import { Header } from './components/Header';
import './styles/global.css';
import { Body } from './styles/mainCanvas';

function App() {
  return (
    <div className="App">
      <Header />
      <GameOfLife />
    </div>
  );
}

export default App;
