# 🛍️ ShopEasy — MVP Shopping Website

A simple, beginner-friendly shopping website built with **HTML, CSS, and Vanilla JavaScript**. No frameworks or backend required — cart data is stored in the browser using `localStorage`.

## ✨ Features

- **Home page** with 8 sample products displayed in a responsive grid
- **Search bar** to filter products by name
- **Add to Cart** with visual feedback
- **Cart page** showing added items with:
  - Quantity controls (increase / decrease)
  - Remove individual items
  - Live total price
- **Persistent cart** — data is saved in `localStorage` so it survives page reloads
- **Responsive design** — works great on mobile, tablet, and desktop
- **Hover animations** on product cards and buttons

## 📁 File Structure

```
shopping-website/
├── index.html    # Home page — product listing
├── cart.html     # Cart page — view & manage cart items
├── style.css     # All styles (responsive, minimal, clean)
├── script.js     # All logic (cart, search, rendering)
└── README.md     # This file
```

## 🚀 Deploy with GitHub Pages (FREE)

Follow these steps to host your site for free using GitHub Pages:

### 1. Push to GitHub

If you haven't already, initialize a git repo and push your code:

```bash
git init
git add .
git commit -m "Initial commit — MVP shopping website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/shopping-website.git
git push -u origin main
```

> Replace `YOUR_USERNAME` with your actual GitHub username.

### 2. Enable GitHub Pages

1. Go to your repository on GitHub.
2. Click **Settings** (top menu).
3. In the left sidebar, click **Pages**.
4. Under **Source**, select **Deploy from a branch**.
5. Choose the **main** branch and **/ (root)** folder.
6. Click **Save**.

### 3. Access Your Live Site

After a minute or two, your site will be live at:

```
https://YOUR_USERNAME.github.io/shopping-website/
```

GitHub will also show the URL on the **Pages** settings page.

## 🛠️ Tech Stack

| Layer     | Technology            |
|-----------|----------------------|
| Frontend  | HTML, CSS, JavaScript |
| Storage   | Browser localStorage  |
| Hosting   | GitHub Pages          |

## 📝 How It Works

1. **Products** are defined as a JavaScript array in `script.js`.
2. **Home page** renders product cards dynamically and supports real-time search filtering.
3. **Add to Cart** saves the product to `localStorage` and updates the cart count badge.
4. **Cart page** reads from `localStorage` to display items, and lets you change quantities or remove items.
5. **Cart count** in the navbar updates on every page load and after every cart action.

## 📄 License

This project is open source and available for anyone to use and learn from.
