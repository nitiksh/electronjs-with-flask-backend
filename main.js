const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

const FLASK_URL = 'http://127.0.0.1:5000';
let flaskProcess;

// Simple function to check if Flask is running
function checkFlaskRunning(callback) {
    http.get(FLASK_URL, res => {
        if (res.statusCode === 200) callback(true);
        else callback(false);
    }).on('error', () => callback(false));
}

// Wait until Flask starts
function waitForFlaskServer(callback) {
    const start = Date.now();
    const interval = setInterval(() => {
        checkFlaskRunning((ready) => {
            if (ready) {
                clearInterval(interval);
                callback();
            } else if (Date.now() - start > 10000) {
                clearInterval(interval);
                console.error("Flask server did not start in time.");
            }
        });
    }, 500);
}

// Create the Electron window
function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 700,
    });
    win.loadURL(FLASK_URL);
}

// Start Flask + Electron
app.whenReady().then(() => {
    console.log("Starting Flask server...");

    // Start Flask server
    const flaskPath = path.join(__dirname, 'main.py');
    flaskProcess = spawn('python', [flaskPath], { stdio: 'inherit' });

    // Wait until Flask is ready, then open Electron window
    waitForFlaskServer(() => {
        console.log("Flask server is ready. Launching Electron...");
        createWindow();
    });

    // Handle re-activation (macOS)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Close Flask when Electron exits
app.on('window-all-closed', () => {
    if (flaskProcess) flaskProcess.kill();
    if (process.platform !== 'darwin') app.quit();
});
