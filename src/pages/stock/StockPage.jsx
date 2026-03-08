import { useState } from 'react';

const MOCK_STOCK = [
    {
        id: 1,
        date: "Oct 24, 2023",
        time: "10:45 AM",
        productName: "Amoxicillin 500mg",
        category: "Antibiotics",
        batch: "BTH-29384",
        type: "Stock In",
        qty: "+500",
        changedBy: "Admin Jane",
        reason: "New supplier shipment #S-122"
    },
    {
        id: 2,
        date: "Oct 24, 2023",
        time: "09:15 AM",
        productName: "Paracetamol 500mg",
        category: "Analgesic",
        batch: "BTH-10293",
        type: "Stock Out",
        qty: "-120",
        changedBy: "Pharmacist Lee",
        reason: "Daily prescription sales fulfillment"
    },
    {
        id: 3,
        date: "Oct 23, 2023",
        time: "04:30 PM",
        productName: "Loratadine 10mg",
        category: "Antihistamine",
        batch: "BTH-44512",
        type: "Mutation",
        qty: "-50",
        changedBy: "Admin Jane",
        reason: "Transfer to Clinical Dept B"
    },
    {
        id: 4,
        date: "Oct 23, 2023",
        time: "11:00 AM",
        productName: "Insulin Glargine",
        category: "Diabetes Care",
        batch: "BTH-00921",
        type: "Stock Out",
        qty: "-10",
        changedBy: "Admin Jane",
        reason: "Disposal of expired/damaged stock",
        isDamage: true
    }
];

const getTypeBadge = (type, isDamage) => {
    if (isDamage) {
        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 uppercase tracking-wide">
                <span className="material-symbols-outlined text-sm">warning</span>
                Stock Out
            </span>
        );
    }

    switch (type) {
        case 'Stock In':
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 uppercase tracking-wide">
                    <span className="material-symbols-outlined text-sm">arrow_upward</span>
                    Stock In
                </span>
            );
        case 'Stock Out':
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 uppercase tracking-wide">
                    <span className="material-symbols-outlined text-sm">arrow_downward</span>
                    Stock Out
                </span>
            );
        case 'Mutation':
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                    <span className="material-symbols-outlined text-sm">sync_alt</span>
                    Mutation
                </span>
            );
        default:
            return null;
    }
};

const getQtyColor = (type, isDamage) => {
    if (isDamage) return "text-red-600 dark:text-red-400";
    switch (type) {
        case 'Stock In': return "text-green-600 dark:text-green-400";
        case 'Stock Out': return "text-orange-600 dark:text-orange-400";
        case 'Mutation': return "text-blue-600 dark:text-blue-400";
        default: return "";
    }
};

export default function StockPage() {
    const [stock] = useState(MOCK_STOCK);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex-1 overflow-y-auto p-8">
            {/* Header handled by Layout usually, but adding specifics here */}
            <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-8 -mx-8 -mt-8 mb-8 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Stock Management</h2>
                    <div className="relative w-64">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg leading-none">search</span>
                        <input
                            className="w-full pl-10 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                            placeholder="Search batch or product..."
                            type="text"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                    </button>
                    <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                    <div className="h-8 w-px bg-slate-200 dark:border-slate-800 mx-2"></div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                    >
                        <span className="material-symbols-outlined text-xl leading-none">add</span>
                        Add New Stock
                    </button>
                </div>
            </header>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6">
                <button className="px-6 py-3 text-sm font-bold text-primary border-b-2 border-primary -mb-px">Stock In History</button>
                <button className="px-6 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border-b-2 border-transparent hover:border-slate-300 transition-all">Stock Out History</button>
                <button className="px-6 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border-b-2 border-transparent hover:border-slate-300 transition-all">Stock Mutation</button>
            </div>

            {/* Filters & Actions */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-6">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div className="flex flex-wrap items-center gap-4 flex-1">
                        <div className="flex flex-col gap-1.5">
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date Range</span>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300">
                                <span className="material-symbols-outlined text-lg leading-none">calendar_month</span>
                                Last 30 Days
                                <span className="material-symbols-outlined text-lg leading-none">expand_more</span>
                            </button>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</span>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300">
                                All Categories
                                <span className="material-symbols-outlined text-lg leading-none">expand_more</span>
                            </button>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Movement Type</span>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300">
                                All Movements
                                <span className="material-symbols-outlined text-lg leading-none">expand_more</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined text-lg leading-none">description</span>
                            Export PDF
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined text-lg leading-none">table_view</span>
                            Export Excel
                        </button>
                    </div>
                </div>
            </div>

            {/* Stock Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Product Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Batch #</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Qty</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Changed By</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Reason</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {stock.map(row => (
                                <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-slate-900 dark:text-white font-medium">{row.date}</div>
                                        <div className="text-xs text-slate-500">{row.time}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-slate-900 dark:text-white font-medium">{row.productName}</div>
                                        <div className="text-xs text-slate-500">{row.category}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                                            {row.batch}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getTypeBadge(row.type, row.isDamage)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <span className={`text-sm font-bold ${getQtyColor(row.type, row.isDamage)}`}>
                                            {row.qty}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-slate-900 dark:text-white">{row.changedBy}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">{row.reason}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Showing 1 to 10 of 256 results</p>
                    <div className="flex items-center gap-2">
                        <button className="p-1 rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50" disabled>
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button className="w-8 h-8 rounded bg-primary text-white text-sm font-bold">1</button>
                        <button className="w-8 h-8 rounded text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800">2</button>
                        <button className="w-8 h-8 rounded text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800">3</button>
                        <span className="text-slate-400 mx-1">...</span>
                        <button className="w-8 h-8 rounded text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800">26</button>
                        <button className="p-1 rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    {/* Modal Container */}
                    <div className="bg-white dark:bg-slate-900 w-full max-w-[560px] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <header className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/10 p-2 rounded-lg">
                                    <span className="material-symbols-outlined text-primary text-2xl">inventory_2</span>
                                </div>
                                <div>
                                    <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight">Add New Stock</h2>
                                    <p className="text-slate-500 text-xs mt-0.5">Record a new stock movement for inventory</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <span className="material-symbols-outlined text-slate-500">close</span>
                            </button>
                        </header>

                        {/* Scrollable Content */}
                        <div className="overflow-y-auto flex-1 p-6 space-y-6">
                            <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                                {/* Product & Batch Row */}
                                <div className="space-y-4">
                                    <label className="block">
                                        <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2 block">Product Name</span>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                                            <select defaultValue="" className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                                                <option disabled value="">Search or select product</option>
                                                <option value="amox-500">Amoxicillin 500mg Capsule</option>
                                                <option value="para-500">Paracetamol 500mg Tablet</option>
                                                <option value="metf-850">Metformin 850mg Tablet</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                        </div>
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <label className="block">
                                            <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2 block">Batch Number</span>
                                            <input className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400" placeholder="e.g. BATCH-2023-001" type="text" />
                                        </label>
                                        <label className="block">
                                            <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2 block">Date</span>
                                            <div className="relative">
                                                <input className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="date" defaultValue="2023-10-27" />
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Movement Type */}
                                <div className="space-y-3 mt-6">
                                    <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold block">Movement Type</span>
                                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                                        <label className="flex-1 cursor-pointer">
                                            <input defaultChecked className="peer hidden" name="movement" type="radio" value="in" />
                                            <div className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-slate-500 peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:text-primary peer-checked:shadow-sm transition-all text-sm font-medium">
                                                <span className="material-symbols-outlined text-lg">add_circle</span>
                                                Stock In
                                            </div>
                                        </label>
                                        <label className="flex-1 cursor-pointer">
                                            <input className="peer hidden" name="movement" type="radio" value="out" />
                                            <div className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-slate-500 peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:text-red-500 peer-checked:shadow-sm transition-all text-sm font-medium">
                                                <span className="material-symbols-outlined text-lg">remove_circle</span>
                                                Stock Out
                                            </div>
                                        </label>
                                        <label className="flex-1 cursor-pointer">
                                            <input className="peer hidden" name="movement" type="radio" value="mutation" />
                                            <div className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-slate-500 peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:text-orange-500 peer-checked:shadow-sm transition-all text-sm font-medium">
                                                <span className="material-symbols-outlined text-lg">swap_horiz</span>
                                                Mutation
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Quantity & Reason */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <label className="block">
                                        <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2 block">Quantity</span>
                                        <div className="relative">
                                            <input className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400" placeholder="0" type="number" />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">Units</span>
                                        </div>
                                    </label>
                                    <label className="block">
                                        <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2 block">Reason</span>
                                        <div className="relative">
                                            <select defaultValue="" className="w-full pl-4 pr-10 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                                                <option disabled value="">Select reason</option>
                                                <option value="purchase">Purchase Order</option>
                                                <option value="return">Patient Return</option>
                                                <option value="adjustment">Inventory Adjustment</option>
                                                <option value="expired">Expiry Removal</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                        </div>
                                    </label>
                                </div>

                                {/* Additional Notes */}
                                <label className="block mt-6">
                                    <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2 block">Additional Notes (Optional)</span>
                                    <textarea className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none placeholder:text-slate-400" placeholder="Enter any additional details here..." rows={2}></textarea>
                                </label>

                                {/* Footer */}
                                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-xl">save</span>
                                        Confirm Entry
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
