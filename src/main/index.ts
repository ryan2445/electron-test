import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";
import { fileURLToPath } from "url";
import squirrelStartup from "electron-squirrel-startup";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (squirrelStartup) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.resolve(__dirname, "..", "preload", "preload.cjs"),
    },
  });

  const MAIN_WINDOW_URL = app.isPackaged
    ? url.format({
        pathname: path.resolve(__dirname, "..", "renderer", "index.html"),
        protocol: "file:",
        slashes: true,
      })
    : "http://localhost:5173";

  mainWindow.loadURL(MAIN_WINDOW_URL);

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
