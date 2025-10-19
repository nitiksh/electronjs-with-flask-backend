const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

const FLASK_URL = 'http://127.0.0.1:5500';
let flaskProcess = null;
let mainWindow = null;

// Check if Flask server is ready
function checkFlaskReady(callback) {
    http.get(`${FLASK_URL}/health`, (res) => {
        callback(res.statusCode === 200);
    }).on('error', () => callback(false));
}

// Wait for Flask to start (max 20 seconds)
function waitForFlask(callback) {
    const startTime = Date.now();
    const checkInterval = setInterval(() => {
        checkFlaskReady((isReady) => {
            if (isReady) {
                clearInterval(checkInterval);
                console.log("✅ Flask is ready!");
                callback(true);
            } else if (Date.now() - startTime > 20000) {
                clearInterval(checkInterval);
                console.log("❌ Flask timeout");
                callback(false);
            }
        });
    }, 500);
}

// Create Electron window
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.loadURL(FLASK_URL);

    // Open DevTools in development
    // mainWindow.webContents.openDevTools();
}

// Start the app
app.whenReady().then(() => {
    console.log("🚀 Starting Flask + Electron...");

    // Get Flask file path
    const flaskPath = app.isPackaged
        ? path.join(process.resourcesPath, 'main.py')
        : path.join(__dirname, 'main.py');

    console.log("📂 Flask path:", flaskPath);

    // Start Flask server
    flaskProcess = spawn('python', [flaskPath], {
        windowsHide: true  // Hide console window
    });

    // Wait for Flask, then open window
    waitForFlask((ready) => {
        if (ready) {
            createWindow();
        } else {
            console.error("Failed to start Flask");
            app.quit();
        }
    });

    // macOS: Recreate window when dock icon is clicked
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Cleanup: Kill Flask when app closes
app.on('window-all-closed', () => {
    if (flaskProcess) flaskProcess.kill();
    app.quit();
});