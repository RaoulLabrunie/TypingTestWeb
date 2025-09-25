# ⚡ TypingTestWeb

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/MIT-green)

> A simple and clean typing speed test with Spanish language support.

## ✨ Features

- **Real-time typing feedback** with color-coded accuracy
- **Spanish words** with accent support (á, é, í, ó, ú)
- **Performance metrics**: WPM, accuracy, and time tracking
- **Clean dark theme** for comfortable typing
- **Backspace correction** support

## 🚀 Quick Start

1. **Clone and open**:

   ```bash
   git clone https://github.com/RaoulLabrunie/TypingTestWeb.git
   cd TypingTestWeb
   ```

2. **Add word database** (`palabras.json`):

   ```json
   {
     "español": ["palabra", "ejemplo", "texto", "prueba"]
   }
   ```

3. **Open `index.html`** in your browser

## 🎯 How to Use

- Start typing when the page loads
- **Green** = correct, **Red** = incorrect
- Use **Backspace** to fix mistakes
- Test completes automatically when finished

## 🗂️ Files

```
TypingTestWeb/
├── index.html     # Main page
├── style.css      # Styling
├── script.js      # Core logic
└── palabras.json  # Spanish words
```

## ⚙️ Customization

Change word count in `script.js`:

```javascript
for (let i = 0; i < 40; i++) { // Change 40 to desired number
```

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/RaoulLabrunie">Raoul Labrunie Espinosa</a>
</div>
