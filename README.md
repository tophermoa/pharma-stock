# PharmaStock - Pharmacy Inventory Management UI

PharmaStock is a modern, responsive frontend User Interface template built for Pharmacy Inventory Management Systems. It is constructed using React, Vite, and Tailwind CSS. The template features a suite of detailed screens suitable for managing products, suppliers, inventory stock, transactions, users, and detailed reports.

This project is a visual mock/UI-template. It does not contain an active backend integration, and effectively uses mock JSON data throughout all pages to demonstrate the UI behavior.

test commit 2

## Technologies Used

*   **React 18**
*   **Vite** - Build tool and fast development server
*   **React Router v6** - For client-side navigation
*   **Tailwind CSS** - For utility-first styling and layout
*   **Material Symbols** - Standardized Google icon set

## Project Structure

```text
pharmastock/
├── src/
│   ├── components/       # Reusable UI components (Sidebar, Header, Layout wrappers)
│   ├── layouts/          # Top-level Page Layouts (MainLayout)
│   ├── pages/            # Page components grouped by feature
│   │   ├── dashboard/    # Dashboard summary statistics
│   │   ├── products/     # Product catalog and adding products
│   │   ├── purchase/     # Create purchase order/stock-in
│   │   ├── reports/      # Reporting and charts
│   │   ├── stock/        # Stock management and history
│   │   ├── suppliers/    # Supplier directories and modals
│   │   ├── transactions/ # Sales POS Register
│   │   └── users/        # User role management
│   ├── App.jsx           # React Router configuration
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global Tailwind directives
├── tailwind.config.js    # Customized theme, colors, fonts
└── package.json
```

## Getting Started

1.  **Dependencies Installation**
    Make sure you have Node.js installed. In the project directory, install dependencies:
    ```bash
    npm install
    ```

2.  **Start the Development Server**
    Run the application using the Vite development server:
    ```bash
    npm run dev
    ```
    This will usually start the application at `http://localhost:5173`. Open this URL in your browser to view the UI.

3.  **Build for Production**
    To bundle the application in optimized format:
    ```bash
    npm run build
    ```
    The bundled files will be generated in the `dist` directory.

## Pages Implemented

*   **Dashboard:** High-level overview, statistics, charts, and alerts.
*   **Product Management:** Catalog view with Add New Product modal.
*   **Supplier Management:** Directory with search and Add New Supplier modal.
*   **Stock Management:** Adjust quantity levels and history logging with Add Stock modal.
*   **Sales POS:** Point Of Sale cart calculation terminal for outgoing stock/sales.
*   **Purchase/Stock In:** Multi-item purchase form layout.
*   **Reports:** Various mock reports with downloadable placeholders.
*   **User Management:** Administrative interface to activate/deactivate users, and add new users via modal.

## Customization

The theme details, including brand colors (`primary`, `background-light`, `background-dark`), and fonts are all managed inside `tailwind.config.js` and can be rapidly adjusted to suit specialized branding needs.
