import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="font-poppins min-h-screen flex items-center justify-center p-8 bg-neutral-900">
      <header className="flex flex-col items-center justify-center space-y-6 text-center">
        <h1 className="text-3xl font-semibold text-neutral-100">
          Ryan Test App
        </h1>
        <p>
          <button
            onClick={() => setCount((count) => count + 1)}
            className="px-6 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            count is {count}
          </button>
        </p>
        <p className="text-neutral-300">
          Edit{" "}
          <code className="px-1 py-0.5 bg-neutral-200 bg-neutral-700 rounded text-primary-400">
            src/renderer/App.tsx
          </code>{" "}
          and save to test HMR
        </p>
        <p>
          <a
            className="text-primary-400 hover:text-primary-300"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          {" | "}
          <a
            className="text-primary-400 hover:text-primary-300"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite
          </a>
          {" | "}
          <a
            className="text-primary-400 hover:text-primary-300"
            href="https://www.electronjs.org/docs/latest/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Electron
          </a>
        </p>
      </header>
    </div>
  );
}
