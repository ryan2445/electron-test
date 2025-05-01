import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { createServer } from "vite";
import path from "path";
import { watch } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let electronProcess: ChildProcessWithoutNullStreams | null = null;

function startElectron() {
  if (electronProcess) {
    electronProcess.kill();
    electronProcess = null;
  }

  const proc = spawn(
    "npx",
    [
      "vite",
      "build",
      "--config",
      path.resolve(__dirname, "..", "src", "main", "vite.config.ts"),
    ],
    {
      shell: true,
      env: process.env,
      stdio: "inherit",
    }
  );

  proc.on("close", (code) => {
    if (code !== 0) {
      console.error("Failed to compile main process code");
      return;
    }

    electronProcess = spawn(
      "npx",
      ["electron", path.resolve(__dirname, "..", "dist", "main", "index.js")],
      {
        env: {
          ...process.env,
          NODE_ENV: "development",
        },
      }
    );

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
    const server = await createServer({
      configFile: path.resolve(
        __dirname,
        "..",
        "src",
        "renderer",
        "vite.config.ts"
      ),
    });
    await server.listen();

    server.printUrls();

    startElectron();

    console.log("Watching main process files...");
    watch(
      path.resolve(__dirname, "..", "src", "main"),
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
