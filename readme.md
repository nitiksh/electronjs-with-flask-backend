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

## ⚡ Packaging (Build)

To create an executable:

```bash
npm install --save-dev electron-packager
```

```bash
npm run build
```

This generates a standalone desktop app that includes both your Electron frontend and Flask backend.

---

## 🧩 License

This project is licensed under the **MIT License**.
Feel free to use, modify, and distribute for educational or personal projects.
Made by <a target="_blank" href="https://www.nitiksh.ntxm.org">nitiksh</a>
