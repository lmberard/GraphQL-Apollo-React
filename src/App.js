import logo from './logo.png';
import './App.css';
import { DisplayLocation } from './DisplayLocation';
// 4. show in app 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Learning Apollo Client + GraphQL</h1>
        <img width="400" src={logo} alt="logo" />
      </header>
      <body className="App-body">
        <DisplayLocation />
      </body>
    </div>
  );
}

export default App;
