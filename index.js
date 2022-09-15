const electron = require("electron");
const path = require("path");
const { app, Tray, BrowserWindow, Menu, shell, nativeImage } = electron;
Menu.setApplicationMenu(false);
electron.app.setAppUserModelId("Google Messages");

let mainWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
    });
    mainWindow.maximize();
    mainWindow.setTitle("Google Messages");
    mainWindow.loadURL("https://messages.google.com/web");

    icon = nativeImage.createFromPath(path.join(__dirname, "src", "icons", "icon.png"));
    tray = new Tray(icon);
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "About",
            type: "normal",
            click: async () => {
                let win;
                (async () => {
                    await app.whenReady();
                    win = new BrowserWindow({ width: 400, height: 300 })
					win.setTitle('About Google Messages');
					win.loadFile('src/about.html');
                })();
            },
        },
        {
            label: "Website",
            type: "normal",
            click: async () => {
                await shell.openExternal("https://github.com/LuckVintage");
            },
        },
        {
            label: "Github",
            type: "normal",
            click: async () => {
                await shell.openExternal("https://github.com/LuckVintage");
            },
        },
        {
            label: "Exit",
            type: "normal",
            click: async () => {
                await app.exit(0);
            },
        },
    ]);
    tray.setToolTip("Google Messages");
    tray.setContextMenu(contextMenu);

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
});
