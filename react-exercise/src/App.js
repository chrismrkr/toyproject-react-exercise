import logo from './logo.svg';
import './App.css';
import { SearchController, SearchResult, SearchMain } from './components/search';
import { Contents } from './components/main';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Contents />
      </header>
    </div>
  );
}
export default App;
