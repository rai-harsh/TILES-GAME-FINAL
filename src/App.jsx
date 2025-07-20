import "../src/style/App.css"
import "../src/style/index.css"
import "../src/style/Tiles.css"
import GameScreen from './pages/gameScreen';
import { GameProvider } from './Context/GeneralContext';
export default function App() {
  return (
    <GameProvider>
      <GameScreen />
    </GameProvider>
  );
}