const { spawn } = require("child_process");
const { createServer } = require("vite");
const path = require("path");
const electron = require("electron");

/**
 * @type {import('child_process').ChildProcessWithoutNullStreams | null}
 */
let electronProcess = null;

/**
 * Start the Electron app
 */
function startElectron() {
  if (electronProcess) {
    // Kill existing process if it exists
    electronProcess.kill();
    electronProcess = null;
  }

  // Compile the main process code
  const proc = spawn("npx", ["tsc", "-p", "tsconfig.electron.json"], {
    shell: true,
    env: process.env,
    stdio: "inherit",
  });

  proc.on("close", (code) => {
    if (code !== 0) {
      console.error("Failed to compile main process code");
      return;
    }

    // Start Electron
    electronProcess = spawn(
      electron,
      [path.join(__dirname, "..", "dist", "main", "index.js")],
      {
        env: {
          ...process.env,
          NODE_ENV: "development",
        },
      }
    );

    // Pipe output
    electronProcess.stdout.on("data", (data) => {
      console.log(`Electron: ${data.toString()}`);
    });

    electronProcess.stderr.on("data", (data) => {
      console.error(`Electron Error: ${data.toString()}`);
    });

    electronProcess.on("close", (code) => {
      console.log(`Electron process exited with code ${code}`);
    });
  });
}

async function start() {
  try {
    // Start Vite dev server
    const server = await createServer({
      // Vite config options
      configFile: path.join(__dirname, "..", "vite.config.ts"),
    });
    await server.listen();

    // Log Vite server URL
    server.printUrls();

    // Start Electron
    startElectron();

    // Restart Electron when main process files change
    console.log("Watching main process files...");
    const { watch } = require("fs");
    watch(
      path.join(__dirname, "..", "src", "main"),
      { recursive: true },
      () => {
        console.log("Main process files changed, restarting Electron...");
        startElectron();
      }
    );
  } catch (error) {
    console.error("Error starting dev server:", error);
    process.exit(1);
  }
}

start();
