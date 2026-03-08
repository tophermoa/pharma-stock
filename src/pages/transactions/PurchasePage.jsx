import { useState } from 'react';

const MOCK_ITEMS = [
    {
        id: 1,
        name: "Amoxicillin 500mg",
        batch: "BX-29381",
        expiry: "12/2025",
        qty: 500,
        price: 0.45,
        total: 225.00
    },
    {
        id: 2,
        name: "Lisinopril 10mg",
        batch: "LS-90021",
        expiry: "08/2024",
        qty: 200,
        price: 1.12,
        total: 224.00
    }
];

export default function PurchasePage() {
    const [items] = useState(MOCK_ITEMS);

    return (
        <div className="layout-container flex h-full grow flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen -m-8">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 lg:px-10">
                <div className="flex items-center gap-4 text-primary">
                    <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg">
                        <span className="material-symbols-outlined text-primary">medication</span>
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">PharmaStock</h2>
                </div>

                <div className="flex flex-1 justify-end gap-4 items-center">
                    <nav className="hidden md:flex items-center gap-6 mr-6">
                        <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Dashboard</a>
                        <a className="text-primary text-sm font-bold border-b-2 border-primary py-1" href="#">Inventory</a>
                        <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Suppliers</a>
                    </nav>

                    <div className="flex gap-2">
                        <button className="flex size-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-all">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button className="flex size-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-all">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                    </div>

                    <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-primary/20 overflow-hidden">
                        <img
                            alt="Medical professional profile avatar"
                            className="h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYDE2w55MZYzVrOKlg2adX472wBgAl8HAdvvd6PgHhX2qAAgqmItJqQGEpEIk1AQj0wPJr3uDlwKhVacBe-te1W46w0zJcdL97KRDc54gp1G1KSRInVKyb3UOaQhrsFe0c4IsKlrHQ6yp5lqcbUbKRXqf_xJHokVyIA6LwUyHl6A4Lg5_p-o7A6QpEsJS5Q859Mkz5rko2JTzJwr_M8ibLOAbm_nnydvz5OooY2y5AlbEu7psS1ZI79j9qWPdqA1l6unYLTohDpXih"
                        />
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8">
                <div className="mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                        <a className="hover:text-primary flex items-center gap-1 transition-colors" href="#">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Back to Inventory
                        </a>
                        <span>/</span>
                        <span className="text-slate-900 dark:text-slate-100 font-medium">New Purchase Transaction</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Stock In Transaction</h1>
                            <p className="text-slate-500 dark:text-slate-400">Record and verify new medical supplies from authorized distributors.</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                Save as Draft
                            </button>
                            <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
                                Process Stock In
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mb-8 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary dark:text-blue-400 mt-0.5">info</span>
                    <div>
                        <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">Auto-Replenishment Active</p>
                        <p className="text-sm text-blue-700 dark:text-blue-400/80">3 items in this transaction are currently marked as "Low Stock" and will be automatically updated upon processing.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">local_shipping</span>
                                <h3 className="font-bold text-slate-900 dark:text-white">Supplier Details</h3>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Supplier Name</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                                        <input
                                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                            placeholder="Search authorized suppliers..."
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Transaction Date</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">calendar_today</span>
                                        <input
                                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                            type="date"
                                            defaultValue="2023-10-24"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">inventory_2</span>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Item Details</h3>
                                </div>
                                <button className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
                                    <span className="material-symbols-outlined text-sm">upload_file</span>
                                    Import CSV
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">
                                            <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Product Name</th>
                                            <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Batch #</th>
                                            <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Expiry</th>
                                            <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Qty</th>
                                            <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 text-right">Price</th>
                                            <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 text-right">Total</th>
                                            <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {items.map(item => (
                                            <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                                <td className="px-4 py-4 font-medium">{item.name}</td>
                                                <td className="px-4 py-4">{item.batch}</td>
                                                <td className="px-4 py-4">{item.expiry}</td>
                                                <td className="px-4 py-4">{item.qty}</td>
                                                <td className="px-4 py-4 text-right">${item.price.toFixed(2)}</td>
                                                <td className="px-4 py-4 text-right font-semibold">${item.total.toFixed(2)}</td>
                                                <td className="px-4 py-4 text-center">
                                                    <button className="text-slate-400 hover:text-red-500 transition-colors">
                                                        <span className="material-symbols-outlined text-lg">delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="bg-primary/5 dark:bg-primary/10">
                                            <td className="px-4 py-3">
                                                <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm px-3 py-1.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Search product..." type="text" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm px-3 py-1.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Batch" type="text" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm px-3 py-1.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="MM/YY" type="text" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm px-3 py-1.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Qty" type="number" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm px-3 py-1.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-right" placeholder="Price" type="number" />
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <span className="text-slate-400 font-medium">$0.00</span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <button className="bg-primary text-white size-8 rounded-lg flex items-center justify-center hover:bg-primary/90 transition-all mx-auto">
                                                    <span className="material-symbols-outlined text-xl">add</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-950/50 flex justify-between items-center">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Add all products listed on the delivery invoice before processing.</p>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Items: {items.length}</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6">
                        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sticky top-8">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">receipt_long</span>
                                Transaction Summary
                            </h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">$449.00</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400">
                                    <span>Tax (5%)</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">$22.45</span>
                                </div>
                                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between items-center">
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">Total Amount</span>
                                    <span className="text-2xl font-bold text-primary">$471.45</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800 mb-8">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input className="peer appearance-none size-5 rounded border-2 border-slate-300 dark:border-slate-700 checked:bg-primary checked:border-primary transition-all cursor-pointer" type="checkbox" />
                                        <span className="material-symbols-outlined absolute text-white text-sm opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">check</span>
                                    </div>
                                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Confirm quality inspection completed</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input className="peer appearance-none size-5 rounded border-2 border-slate-300 dark:border-slate-700 checked:bg-primary checked:border-primary transition-all cursor-pointer" type="checkbox" />
                                        <span className="material-symbols-outlined absolute text-white text-sm opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">check</span>
                                    </div>
                                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Print barcodes after processing</span>
                                </label>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">verified</span>
                                    Process Stock In
                                </button>
                                <button className="w-full py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                    Save Transaction Draft
                                </button>
                            </div>

                            <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-2 mb-2 text-slate-900 dark:text-white">
                                    <span className="material-symbols-outlined text-primary text-sm">help</span>
                                    <span className="text-xs font-bold uppercase tracking-wider">Quick Help</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">New batch IDs are automatically generated if left blank. Quality inspection is mandatory for controlled substances.</p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
