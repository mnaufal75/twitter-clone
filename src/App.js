import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';
import Main from './components/Main';

function App() {
  return (
    <div className="App container mx-auto px-4 flex">
      <LeftBar />
      <Main />
      <RightBar />
    </div>
  );
}

export default App;
