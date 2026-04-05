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

## 📁 File Structure

```
shopping-website/
├── index.html   ← Home page (product grid + search)
├── cart.html    ← Cart page (items, quantities, totals)
├── style.css    ← All styles (no frameworks)
├── script.js    ← All JavaScript logic
└── README.md    ← This file
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

Follow these steps to publish the site at  
`https://<your-username>.github.io/shopping-website/`

### Step 1 – Push your code to GitHub

```bash
# If you haven't already, initialise git and push
git init
git add .
git commit -m "Initial commit – ShopEasy MVP"
git branch -M main
git remote add origin https://github.com/<your-username>/shopping-website.git
git push -u origin main
```

### Step 2 – Enable GitHub Pages

1. Open your repository on **github.com**
2. Click **Settings** (top menu)
3. In the left sidebar click **Pages**
4. Under **Source** select **Deploy from a branch**
5. Choose branch **`main`** and folder **`/ (root)`**
6. Click **Save**

### Step 3 – Access your live site

GitHub will show a banner:  
> *"Your site is published at https://\<your-username\>.github.io/shopping-website/"*

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
