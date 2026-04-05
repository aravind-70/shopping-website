# 🛍️ ShopEasy – MVP Shopping Website

A clean, beginner-friendly shopping website built with plain **HTML, CSS, and Vanilla JavaScript**.  
No frameworks, no build tools – just open the files in a browser or deploy for free with GitHub Pages.

## ✨ Features

| Feature | Details |
|---|---|
| Product catalogue | 8 sample products with images, names, and prices |
| Shopping cart | Add / remove items, adjust quantities, live total |
| Persistent cart | Cart stored in `localStorage` (survives page refresh) |
| Dynamic badge | Cart item count updates in real time |
| Search bar | Filter products by name or category instantly |
| Responsive design | Works on desktop, tablet, and mobile |
| Hover animations | Subtle card lift & image zoom effects |

## 🔗 Live Demo

The site is deployed via GitHub Pages and accessible at:  
👉 **https://aravind-70.github.io/shopping-website/**

## 📁 File Structure

```
shopping-website/
├── .github/
│   └── workflows/
│       └── deploy.yml  ← Automated GitHub Pages deployment
├── index.html          ← Home page (product grid + search)
├── cart.html           ← Cart page (items, quantities, totals)
├── style.css           ← All styles (no frameworks)
├── script.js           ← All JavaScript logic
└── README.md           ← This file
```

## 🚀 Running Locally

No installation needed – just open `index.html` in any modern browser.

```bash
# Clone your fork / the repo
git clone https://github.com/<your-username>/shopping-website.git
cd shopping-website

# Open in browser (macOS / Linux)
open index.html

# Or with VS Code Live Server extension – right-click index.html → "Open with Live Server"
```

---

## 🌐 Deploying to GitHub Pages (Free Hosting)

This repository includes a **GitHub Actions workflow** (`.github/workflows/deploy.yml`) that automatically deploys the site whenever code is pushed to `main`.

### Automated Deployment (recommended)

Once the code is on the `main` branch:

1. Go to **Settings → Pages** in your GitHub repository
2. Under **Source**, select **GitHub Actions**
3. That's it! The workflow runs automatically on every push to `main`

The deployment workflow:
- Uses `actions/checkout@v4` to fetch the code
- Uses `actions/upload-pages-artifact@v3` to package the static files
- Uses `actions/deploy-pages@v4` to publish to GitHub Pages

### Manual Deployment (alternative)

If you prefer the simpler branch-based approach:

1. Go to **Settings → Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose branch **`main`** and folder **`/ (root)`**
4. Click **Save**

### Access your live site

Your site will be available at:  
`https://<your-username>.github.io/shopping-website/`

It may take 1–2 minutes for the first deploy.  
Every subsequent `git push` to `main` will automatically update the live site.

---

## 🛠 Customising Products

All products are defined in the `PRODUCTS` array at the top of **`script.js`**.  
Each product has:

```js
{
  id: 1,                    // unique number
  name: 'Product Name',
  price: 29.99,             // number (USD)
  image: 'https://...',     // any image URL
  category: 'Electronics',  // used by the search filter
}
```

Add, remove, or edit entries there to customise the catalogue.

---

## 📄 License

MIT – free to use and modify.
