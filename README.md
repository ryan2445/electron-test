# Electron + Vite + React + TypeScript

This is a minimal scaffolding project for Electron using Vite, React, and TypeScript without using frameworks like electron-forge or electron-builder.

## Project Structure

```
├── dist/               # Compiled output
│   ├── main/           # Compiled Electron main process
│   └── renderer/       # Compiled Vite/React renderer
├── scripts/            # Development scripts
│   └── dev.js          # Script to run both Electron and Vite in dev mode
├── src/
│   ├── main/           # Electron main process code
│   │   ├── index.ts    # Main entry point
│   │   └── preload.ts  # Preload script
│   └── renderer/       # React renderer code
│       ├── App.css     # App component styling
│       ├── App.tsx     # Main App component
│       ├── index.css   # Global styles
│       └── main.tsx    # React entry point
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript config for renderer
├── tsconfig.node.json  # TypeScript config for Vite and Node
├── tsconfig.electron.json # TypeScript config for Electron main process
└── vite.config.ts      # Vite configuration
```

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

This will:

1. Start the Vite dev server for the React app
2. Compile the Electron main process code
3. Start the Electron app pointing to the Vite dev server
4. Watch for changes in the main process files

## Building

```bash
npm run build
```

This will:

1. Build the React app with Vite
2. Compile the Electron main process

## Running the built app

```bash
npm start
```

## Notes

- This setup doesn't include packaging (like `electron-builder` would provide). You would need to add packaging yourself if needed.
- In a real project, you might want to add more configurations like ESLint, testing framework, etc.
