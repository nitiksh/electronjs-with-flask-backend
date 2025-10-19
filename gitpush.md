👍 Let’s push local project to GitHub repo step-by-step.
Assuming you already have the project folder locally, here’s exactly what to run:

---

### 🧠 **Pre-check**

Make sure Git is installed:

```bash
git --version
```

If not, install Git first.

---

### 🚀 **Steps to Push Your Project**

1. **Open terminal in your project folder**

   ```bash
   cd path/to/your/project
   ```

2. **Initialize Git (if not already done)**

   ```bash
   git init
   ```

3. **Add your files**

   ```bash
   git add .
   ```

4. **Commit your project**

   ```bash
   git commit -m "Initial commit - video-tools-dekstop-app"
   ```

5. **Add your GitHub remote**
   (Replace the URL with your repo URL)

   ```bash
   git remote add origin https://github.com/ntxmtools/video-tools-dekstop-app.git
   ```

6. **Set main branch (if not already created)**

   ```bash
   git branch -M main
   ```

7. **Push to GitHub**

   ```bash
   git push -u origin main
   ```

---

### ⚠️ If you see an error like:

> `fatal: remote origin already exists`

Run this instead:

```bash
git remote set-url origin https://github.com/ntxmtools/video-tools-dekstop-app.git
git push -u origin main
```

---

### ✅ **After success**

Go to → [https://github.com/ntxmtools/video-tools-dekstop-app](https://github.com/ntxmtools/video-tools-dekstop-app)
You should see your full project uploaded.
