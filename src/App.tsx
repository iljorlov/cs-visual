import { GameOfLife } from './components/GameOfLife/GameOfLife';
import { Header } from './components/Header';
import './styles/global.css';
import { AppContainer, Body } from './styles/mainCanvas';

function App() {
  return (
    <AppContainer className="App">
      <Header />
      <GameOfLife />
    </AppContainer>
  );
}

export default App;
