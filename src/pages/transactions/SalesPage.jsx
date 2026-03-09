import { useState, useEffect, useRef } from 'react';

const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        desc: "10 Tabs / Strip",
        price: 4.50,
        stock: 142,
        stockStatus: "good",
        category: "Over-the-Counter",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcCzEV32Zv05_BrNaJEBOSujOtqjjoFdvwalRG3I7h1dmH-jwOsiZGfxgWiKEQFKszw4cjQM94vou7V9IctVrNbrrTyX0SBgVXnv9FfRCxx3ZUbUCTN4p8cxmAhTFSCLmkh8QUv7yJisZjcqpE2gzlGlUzQgD4NLFanN_TX5oDLpwVc8ZBAGIqfMc1dkwQ33bGrEJUQWooA1wxNUDBmOv3apAk18IPKbWaGr1w-ybmjXeMGrIYe49w6ltwu1HoYa0KB6Zg7ncvz_6X"
    },
    {
        id: 2,
        name: "Amoxicillin Syrup",
        desc: "60ml Bottle",
        price: 12.25,
        stock: 18,
        stockStatus: "warning",
        category: "Prescription",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ2I6gP1R0D9Sakl0kZTvTM4XgKN75axaxyI5352WeVIhlvTbISPVhNSE4f6gz3Qmm-Slz5n3T6XVib5szD64HsI8gT4XjYkt7OWGuNWYRoN6-3mQM1b_qp7EghEbJBUDBsoWPFFD02t-fqqYn69WoFld5V0SM6HdXgjkB0GBMg-Kcziwv_CMJTTAeM5opMpOVz0rTBJz3jDim69z9zrRyXM3hQmk0lyffkB28Eax9_ywu_9nK4hT9DkP5OawpJYet1YKUq8EPPVag"
    },
    {
        id: 3,
        name: "Vitamin C 1000mg",
        desc: "30 Chewable Tabs",
        price: 8.99,
        stock: 89,
        stockStatus: "good",
        category: "Supplements",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYf-YmNdHgRwvZfTgaez_zsTrzhvO6K-xEBm9Ko-PDhB6DhovzDgtxNUbmKjTkeERZC2fO9edDk9bfCb17XlTgtcZq-r3bOiig-bzuH4kDkyEHtU-wp2ypYEN4cJX7pQnbYwzDx_kjEGcm1LkaH9TsFrVFMYNk6KAI4WlOU56tEwgWGQmvJQ5YjA4YGC0TPDdt7LWyr4XqLIba82q6go_9_8H-2bHFeu4SCAAu6hU5J1Q2fCuEWLR4v_RqYkPOsgDcP7Pe3g-8rW-v"
    },
    {
        id: 4,
        name: "Digital Thermometer",
        desc: "High Precision",
        price: 15.50,
        stock: 4,
        stockStatus: "danger",
        category: "First Aid",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCerzePV-w4utuaCdxXymWMPfLSx8HQCkx6fy9fKDFp3Dls29ixZ6A8WKfeIMAxNK5SvyxdwAOO_JVQT1Q94HljGHR0KJXUmyDBhgFMxHkfSTpOLdZ5jufoc9zTcF0q4x1zGaF5ojOK3byL_slaE0d4E-1A1JrssfwCvU1qEnXz4kjqLBkWExsa8nnkGNMqD7Rv3v3bdCPypb2swDdRKJfsbTnD4gxSUfMPVFC9OFj8WR1B7tenrVQDOqe_-Yefde5EDt_UF0V5wyE_"
    },
    {
        id: 5,
        name: "Sterile Bandage",
        desc: "5cm x 4m Roll",
        price: 1.20,
        stock: 215,
        stockStatus: "good",
        category: "First Aid",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZIk9pBrMPzygUARNmkzwoOhWc-QHN1DK_lnTCjC8YXzyyFLBP5AQP_jJiQwe4xBJheef8UJ_mfzRi9jL2BzlBWOgxrEOjyEXnNpzGu6REfiwh6E5j0vX4PHutnQu4qhgB4dKjUAkN8BK_avIN2KD-IiLgef9YBesKBCLtrPwa8mrbFr3PlxoMRSjeGCJ81Ji4JxZ2gFWchMlPB2WcDDpRhTWoZPgerLVRnUhbsh5JQVXPZzM_5kyKs2id1ASfXaiwH_DSJ1uNRuLj"
    },
    {
        id: 6,
        name: "Surgical Mask",
        desc: "Box of 50 Pcs",
        price: 5.00,
        stock: "50+",
        stockStatus: "good",
        category: "First Aid",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAG6f56lCJnZov202BYJxcB04GfuZwLTwdbgaqeE6w1LyY_oYYlG2aNJEXlXEZPtiBFwNvp_TzBEJRZV4EQgu-tvTLDUHekbEPz6IYIGJKHXnOQj-yQR7W9Jm0Yf16oz9zEPuGum4GUAF1Ajw3NbIh3VrbsArqHXJ4k4LxqZ3qWpSU3UyN6ptQdpv0cUW4_Iv9Qri8ErvQDE8pCA1tPteOyhw_qJh6zErhcNaRS2qLw1DVAYACDCk7D4eGBkC5H1rOkiuJrFaqhrS_"
    }
];

const MOCK_CART = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        price: 4.50,
        qty: 2,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATI4kE8wQW4wUkabOglADC-mhZ9xzm6QVDyTB0PT8y5TrbCIaOcT4c0RcNYJ9oJslbj-9foZAEHGPuZFDFQrg3ql5FPmKJzg8sDQEDDMJ3dSWGMute4CjnXLnjkKar-wAs_e8BIxMeDvsVAfGHuyQWMwPAS_3QlUl5UiPNHhMB8yQ9n0bHAvO54-uFSG0ASn1yyBstNBYo_pcn5zBPVxXyp3a72GhkHaNcFuq6o2xqQTasAFJFXFIKBi967FqhrR4nPMelNClZc-80"
    },
    {
        id: 4,
        name: "Digital Thermometer",
        price: 15.50,
        qty: 1,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMPqllN5aTDlKRmM1SmxracBkxeHO_Rx0hnNKwlNo00c-kaxrQtZCKgC3DO1yIfL1h5Xc4YHCfNmZo37DRWPhEWaN_Gzn9e1DCdLrO8VyYRJ3-WWgr6e2Eiyjs4pLagfdG4o595PdZH-cZojYQrENrA4DF4hRrSSlD00ZVqUJMwW4-QrMXA94vphIIhwgjKORLQbeBqTQvNMgNjSVvF3DFHd0Xnq7s_H48Btj0a5OJore6mkYQOZyxH3V8SVo0oZQ10JyMrRh087wl"
    }
];

const getStockBadgeClasses = (status) => {
    switch (status) {
        case 'danger': return 'bg-red-100 text-red-700';
        case 'warning': return 'bg-yellow-100 text-yellow-700';
        default: return 'bg-green-100 text-green-700';
    }
};

const ProductCardSkeleton = () => (
    <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden animate-pulse">
        <div className="aspect-square bg-slate-100 dark:bg-slate-800/50 p-4 relative"></div>
        <div className="p-3 flex flex-col flex-1 gap-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2"></div>
            <div className="mt-auto flex items-center justify-between">
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                <div className="size-8 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
            </div>
        </div>
    </div>
);

export default function SalesPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Items");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Cash");
    const searchInputRef = useRef(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Cart Management Functions
    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prevCart, { ...product, qty: 1 }];
        });
    };

    const updateQuantity = (id, delta) => {
        setCart(prevCart =>
            prevCart.map(item => {
                if (item.id === id) {
                    const newQty = item.qty + delta;
                    return newQty > 0 ? { ...item, qty: newQty } : item;
                }
                return item;
            })
        );
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const clearCart = () => {
        if (window.confirm('Are you sure you want to clear the current order?')) {
            setCart([]);
        }
    };

    useEffect(() => {
        // We update time just once here to match the static UI since it's a template, 
        // or we could use setInterval for real time. For exact match, hardcoding or static format is fine.
        setCurrentDate("Oct 24, 2023");
        setCurrentTime("14:42:01");
    }, []);

    useEffect(() => {
        const loadCatalog = async () => {
            await new Promise(resolve => setTimeout(resolve, 800));
            setProducts(MOCK_PRODUCTS);
            setIsLoading(false);
        };
        loadCatalog();
    }, []);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'F1') {
                e.preventDefault();
                searchInputRef.current?.focus();
            } else if (e.key === 'F5') {
                e.preventDefault();
                setIsRefreshing(true);
                // Simulate network request
                setTimeout(() => {
                    setIsRefreshing(false);
                }, 500);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const filteredProducts = selectedCategory === "All Items"
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        // Note: This layout is full-screen and different from MainLayout.
        // If we drop it into the existing router inside MainLayout, it will be nested.
        // To match the HTML exactly, we should ideally render it outside MainLayout, 
        // but for now we'll structure it to take up the full available flex area of the Outlet.
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-background-light dark:bg-background-dark -m-8">
            {/* Main POS Interface */}
            <main className="flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden">
                {/* Left Column: Product Selection */}
                <section className="flex flex-col h-[60vh] lg:h-auto w-full lg:w-3/5 xl:w-2/3 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
                    {/* Search & Filters */}
                    <div className="p-4 space-y-4">
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                                <input
                                    ref={searchInputRef}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary transition-all text-base outline-none"
                                    placeholder="Search medicine, SKU, or generic name..."
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {['All Items', 'Prescription', 'Over-the-Counter', 'Supplements', 'First Aid'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${selectedCategory === cat
                                        ? 'bg-primary text-white'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 overflow-y-auto p-4 pt-0 relative">
                        {isRefreshing && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl">
                                <div className="flex flex-col items-center gap-3 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
                                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Refreshing Stock...</p>
                                </div>
                            </div>
                        )}
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                            {isLoading ? (
                                Array(8).fill(0).map((_, i) => <ProductCardSkeleton key={`skeleton-${i}`} />)
                            ) : (
                                filteredProducts.map((product) => (
                                    <div key={product.id} className="group flex flex-col bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:border-primary transition-all">
                                        <div className="aspect-square bg-white dark:bg-slate-800 p-4 relative">
                                            <img className="w-full h-full object-contain" alt={product.name} src={product.image} />
                                            <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded uppercase ${getStockBadgeClasses(product.stockStatus)}`}>
                                                Stock: {product.stock}
                                            </span>
                                        </div>
                                        <div className="p-3 flex flex-col flex-1">
                                            <p className="text-sm font-bold line-clamp-1">{product.name}</p>
                                            <p className="text-xs text-slate-500 mb-2">{product.desc}</p>
                                            <div className="mt-auto flex items-center justify-between">
                                                <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
                                                <button onClick={() => addToCart(product)} className="size-8 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                                                    <span className="material-symbols-outlined text-lg">add</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>

                {/* Right Column: Shopping Cart / Checkout */}
                <section className="flex flex-col h-auto lg:h-auto w-full lg:w-2/5 xl:w-1/3 bg-slate-50 dark:bg-background-dark shrink-0">
                    {/* Header */}
                    <div className="p-6 pb-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">shopping_cart</span>
                            Current Order
                        </h3>
                        <button onClick={clearCart} className="text-red-500 hover:text-red-600 text-sm font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">delete</span>
                            Clear All
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] lg:min-h-0">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                                <span className="material-symbols-outlined text-5xl mb-2 opacity-50">shopping_cart</span>
                                <p className="text-sm font-medium">Your cart is empty</p>
                                <p className="text-xs mt-1 text-center">Add products from the grid to get started</p>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                                    <div className="size-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                                        <img className="w-full h-full object-contain" alt={item.name} src={item.image} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold truncate">{item.name}</p>
                                        <p className="text-xs text-slate-500">${item.price.toFixed(2)} / unit</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => updateQuantity(item.id, -1)} className="size-7 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
                                            <span className="material-symbols-outlined text-sm font-bold">remove</span>
                                        </button>
                                        <span className="w-6 text-center text-sm font-bold">{item.qty}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} className="size-7 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
                                            <span className="material-symbols-outlined text-sm font-bold">add</span>
                                        </button>
                                    </div>
                                    <div className="text-right ml-2 w-12 flex flex-col items-end gap-1">
                                        <p className="text-sm font-bold">${(item.price * item.qty).toFixed(2)}</p>
                                        <button onClick={() => removeFromCart(item.id)} className="text-[10px] text-red-500 hover:underline">Remove</button>
                                    </div>
                                </div>
                            )))}
                    </div>

                    {/* Payment & Checkout */}
                    <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 rounded-t-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-slate-500">
                                <span>Subtotal</span>
                                <span className="font-medium">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Tax (10%)</span>
                                <span className="font-medium">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">sell</span>
                                    <input className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Discount code" type="text" />
                                </div>
                                <button className="px-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-bold">Apply</button>
                            </div>
                            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
                                <span className="text-lg font-bold">Total Payable</span>
                                <span className="text-3xl font-black text-primary">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Payment Method Selection */}
                        <div className="mb-6">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Payment Method</p>
                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    onClick={() => setSelectedPaymentMethod('Cash')}
                                    className={`flex flex-col items-center justify-center gap-2 p-3 border-2 rounded-xl transition-all ${selectedPaymentMethod === 'Cash' ? 'border-primary bg-primary/5' : 'border-transparent bg-slate-100 dark:bg-slate-800 hover:border-slate-300'}`}
                                >
                                    <span className={`material-symbols-outlined ${selectedPaymentMethod === 'Cash' ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>payments</span>
                                    <span className={`text-xs font-bold ${selectedPaymentMethod === 'Cash' ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>Cash</span>
                                </button>
                                <button
                                    onClick={() => setSelectedPaymentMethod('Debit')}
                                    className={`flex flex-col items-center justify-center gap-2 p-3 border-2 rounded-xl transition-all ${selectedPaymentMethod === 'Debit' ? 'border-primary bg-primary/5' : 'border-transparent bg-slate-100 dark:bg-slate-800 hover:border-slate-300'}`}
                                >
                                    <span className={`material-symbols-outlined ${selectedPaymentMethod === 'Debit' ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>credit_card</span>
                                    <span className={`text-xs font-bold ${selectedPaymentMethod === 'Debit' ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>Debit</span>
                                </button>
                                <button
                                    onClick={() => setSelectedPaymentMethod('QRIS')}
                                    className={`flex flex-col items-center justify-center gap-2 p-3 border-2 rounded-xl transition-all ${selectedPaymentMethod === 'QRIS' ? 'border-primary bg-primary/5' : 'border-transparent bg-slate-100 dark:bg-slate-800 hover:border-slate-300'}`}
                                >
                                    <span className={`material-symbols-outlined ${selectedPaymentMethod === 'QRIS' ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>qr_code_2</span>
                                    <span className={`text-xs font-bold ${selectedPaymentMethod === 'QRIS' ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>QRIS</span>
                                </button>
                            </div>
                        </div>

                        <button
                            disabled={cart.length === 0}
                            className="w-full bg-primary hover:bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed"
                        >
                            Complete Transaction
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                </section>
            </main>

            {/* Quick Access Footer Bar */}
            <footer className="hidden lg:flex h-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 items-center justify-between text-[11px] text-slate-400 font-medium">
                <div className="flex gap-4">
                    <span>F1: Search</span>
                    <span>F5: Refresh Stock</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_today</span> {currentDate}</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> {currentTime}</span>
                </div>
            </footer>
        </div>
    );
}
