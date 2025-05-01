const config = {
  outDir: "./dist/package",
  packagerConfig: {
    asar: true,
    files: ["dist/main/**/*", "dist/preload/**/*", "dist/renderer/**/*"],
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
      platforms: ["win32"],
    },
    {
      name: "@electron-forge/maker-zip",
      config: {},
      platforms: ["darwin", "linux"],
    },
  ],
};

export default config;
