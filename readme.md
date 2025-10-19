## 🚀 Electron + Flask Integration

### 📘 Overview

This project shows how to **integrate an Electron desktop app with a Python Flask backend**.
When you run the Electron app, it automatically launches a local Flask server, waits for it to start, and then displays the Flask web app inside an Electron window — making your Flask app behave like a native desktop application.

---

## 📂 Project Structure

```
electron-flask-app/
│
├── main.js           # Electron main process (starts Flask + creates window)
├── main.py           # Flask backend (serves HTML and API)
├── package.json      # Node project file (Electron configs)
└── templates/
    └── index.html    # Flask HTML page / Flask Templating
```

---

## ⚙️ Requirements

### 1️⃣ Install Python and Flask

Make sure you have Python 3.x installed.
Then install Flask:

```bash
pip install flask
```

### 2️⃣ Install Node.js and Electron

Install Node.js (v18+ recommended), then install Electron locally:

```bash
npm install
```

---

## ▶️ How to Run the Project

### Step 1. Start the app

Run this command in the project directory:

```bash
npm start
```

✅ What happens:

- Electron automatically starts your Flask backend (`main.py`)
- Waits for the Flask server to start at **[http://127.0.0.1:5000](http://127.0.0.1:5000)**
- Opens the Flask app inside a native Electron window

You don’t need to run Flask separately.

---

## 🧠 How It Works

### 🔹 `main.py` (Flask Backend)

Your Flask server serves HTML and APIs.

```python
@app.route("/")
def hello():
    return render_template("index.html")
```

It runs on port `5000` and handles any backend logic (data, ML, APIs, etc.).

### 🔹 `main.js` (Electron Main Process)

This script:

1. Starts the Flask server using Node’s `child_process.spawn()`.
2. Waits until the server responds on port `5000`.
3. Opens an Electron browser window that loads `http://127.0.0.1:5000`.
4. Automatically kills the Flask process when the Electron app closes.

Simplified flow:

```
Electron start → Run Python main.py → Wait for Flask → Load URL → Show UI
```

---

## 🪄 Example Code Summary

### ✅ Flask (`main.py`)

```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
```

### ✅ Electron (`main.js`)

```js
const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const http = require("http");

const FLASK_URL = "http://127.0.0.1:5000";
let flaskProcess;

function checkFlaskRunning(cb) {
  http
    .get(FLASK_URL, (res) => cb(res.statusCode === 200))
    .on("error", () => cb(false));
}

function waitForFlaskServer(cb) {
  const start = Date.now();
  const interval = setInterval(() => {
    checkFlaskRunning((ready) => {
      if (ready) {
        clearInterval(interval);
        cb();
      } else if (Date.now() - start > 10000) {
        clearInterval(interval);
        console.error("Flask server did not start in time.");
      }
    });
  }, 500);
}

function createWindow() {
  const win = new BrowserWindow({ width: 1000, height: 700 });
  win.loadURL(FLASK_URL);
}

app.whenReady().then(() => {
  console.log("Starting Flask...");
  const flaskPath = path.join(__dirname, "main.py");
  flaskProcess = spawn("python", [flaskPath], { stdio: "inherit" });

  waitForFlaskServer(() => {
    console.log("Flask is ready. Launching Electron...");
    createWindow();
  });
});

app.on("window-all-closed", () => {
  if (flaskProcess) flaskProcess.kill();
  if (process.platform !== "darwin") app.quit();
});
```

---

## 💡 Development Tips

- You can modify Flask routes and reload Electron to see updates.
- If using `python3`, change:

  ```js
  spawn("python", [flaskPath]);
  ```

  to:

  ```js
  spawn("python3", [flaskPath]);
  ```

- To open Chrome DevTools inside Electron:

  ```js
  win.webContents.openDevTools();
  ```

---

## ⚡ Packaging (Optional)

To create an executable:

```bash
npm install --save-dev electron-packager
npx electron-packager . MyApp
```

This generates a standalone desktop app that includes both your Electron frontend and Flask backend.

---

## 🧩 License

This project is licensed under the **MIT License**.
Feel free to use, modify, and distribute for educational or personal projects.
Made by <a target="_blank" href="https://www.nitiksh.ntxm.org">nitiksh</a>
