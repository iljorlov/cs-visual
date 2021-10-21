import { useState } from 'react';
import { GameOfLife } from './components/GameOfLife/GameOfLife';
import { Header } from './components/Header';
import './styles/global.css';
import { AppContainer, Body } from './styles/mainCanvas';
import { AbsoluteShadow } from './styles/sidebarStyles';

function App() {

  const [sidebarEnabled, setSidebarEnabled] = useState(false)

  return (
    <AppContainer className="App">
      <AbsoluteShadow 
        className="shadow"
        enabled={sidebarEnabled}
      />
      <Header />
      <GameOfLife sidebarEnabled={sidebarEnabled} setSidebarEnabled={setSidebarEnabled}/>
    </AppContainer>
  );
}

export default App;
