import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Electron + Vite + React + TS</h1>
        <p>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </p>
        <p>
          Edit <code>src/renderer/App.tsx</code> and save to test HMR
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://www.electronjs.org/docs/latest/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Electron Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
