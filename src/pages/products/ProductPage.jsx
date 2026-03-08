import { useState, useEffect } from 'react';
import { useHeader } from '../../layouts/HeaderContext';

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedStatus, setSelectedStatus] = useState('All Status');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const { setTitleContent, setActionButton } = useHeader();

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;

        let matchesStatus = true;
        if (selectedStatus !== 'All Status') {
            const stock = parseInt(String(product.initialQty).replace(/,/g, ''), 10) || 0;
            const minStock = parseInt(String(product.minStock).replace(/,/g, ''), 10) || 0;

            if (selectedStatus === 'Out of Stock') {
                matchesStatus = stock === 0;
            } else if (selectedStatus === 'Low Stock') {
                matchesStatus = stock > 0 && stock <= minStock;
            } else if (selectedStatus === 'In Stock') {
                matchesStatus = stock > minStock;
            }
        }

        return matchesCategory && matchesStatus;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, selectedStatus]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products.json');
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        setTitleContent(
            <div className="min-w-0">
                <h2 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white truncate">Product Management</h2>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate hidden sm:block">View and manage your pharmaceutical inventory items.</p>
            </div>
        );

        setActionButton(
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-1 sm:gap-2 bg-primary hover:bg-primary/90 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-semibold transition-all shadow-sm shadow-primary/20 shrink-0"
            >
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">add</span>
                <span className="hidden sm:inline">Add New Product</span>
            </button>
        );

        return () => {
            setTitleContent(null);
            setActionButton(null);
        };
    }, [setTitleContent, setActionButton]);

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-background-light dark:bg-background-dark -m-8">

            <div className="p-8 space-y-6">
                {/* Search Bar */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center shadow-sm">
                    <div className="relative w-full max-w-2xl">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 text-sm outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-500"
                            placeholder="Search by name, barcode, or SKU..."
                            type="text"
                        />
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-6 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-500">Category:</span>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="bg-background-light dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary py-2 px-3 pr-8 min-w-[140px] outline-none text-slate-900 dark:text-slate-100"
                            >
                                <option>All Categories</option>
                                <option>Tablets</option>
                                <option>Syrups</option>
                                <option>Injections</option>
                                <option>Topicals</option>
                                <option>Antibiotics</option>
                                <option>Analgesics</option>
                                <option>Antidiabetic</option>
                                <option>NSAID</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-500">Stock Status:</span>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="bg-background-light dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary py-2 px-3 pr-8 outline-none text-slate-900 dark:text-slate-100"
                            >
                                <option>All Status</option>
                                <option>In Stock</option>
                                <option>Low Stock</option>
                                <option>Out of Stock</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsFilterModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
                    >
                        <span className="material-symbols-outlined text-[18px]">filter_list</span>
                        More Filters
                    </button>
                </div>

                {/* Main Table Section */}
                {isLoading ? (
                    <div className="flex items-center justify-center p-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-center border border-red-200 dark:border-red-800">
                        <p>{error}</p>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider sticky left-0 bg-slate-50 dark:bg-slate-800/90 z-10 backdrop-blur-sm">Product Name</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Drug Classification</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Purchase Price</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Selling Price</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Batch Number</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Expiry Date</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Min. Stock</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Initial Qty</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Shelf Loc.</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Notes</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                    {paginatedProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                                            <td className="px-6 py-4 sticky left-0 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-800/40 z-10 border-r border-slate-100 dark:border-slate-800 transition-colors">
                                                <div className="flex items-center gap-3 whitespace-nowrap">
                                                    <div className="size-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                                        <span className="material-symbols-outlined text-[18px]">{product.icon}</span>
                                                    </div>
                                                    <span className="font-medium text-slate-900 dark:text-slate-100">{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-700 dark:text-slate-300">{product.category}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-700 dark:text-slate-300">{product.classification}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{product.purchasePrice}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">{product.sellingPrice}</td>
                                            <td className="px-6 py-4 text-sm font-mono text-slate-700 dark:text-slate-300">{product.batchNumber}</td>
                                            <td className={`px-6 py-4 text-sm whitespace-nowrap ${product.isExpired ? 'text-red-500 font-medium' : 'text-slate-700 dark:text-slate-300'}`}>
                                                {product.expiryDate}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{product.minStock}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{product.initialQty}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{product.shelfLoc}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500 italic min-w-[150px]">{product.notes}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-slate-500">
                                Showing <span className="font-medium">{filteredProducts.length === 0 ? 0 : startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredProducts.length)}</span> of <span className="font-medium">{filteredProducts.length}</span> products
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`size-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                                ? 'bg-primary text-white border border-primary'
                                                : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Low Stock Alert Banner */}
                <div className="mt-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="size-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-600 shrink-0">
                        <span className="material-symbols-outlined">warning</span>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-bold text-red-800 dark:text-red-400">Critical Stock Warning</h4>
                        <p className="text-xs text-red-700 dark:text-red-500">There are 12 items currently below reorder levels. Immediate action required for 3 items near expiry.</p>
                    </div>
                    <button className="px-4 py-2 w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors shadow">
                        Reorder Now
                    </button>
                </div>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    {/* Modal Content Container */}
                    <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Add New Product</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Fill in the details to add a new item to the inventory stock.</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            >
                                <span className="material-symbols-outlined text-2xl">close</span>
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="px-8 py-6 overflow-y-auto">
                            <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                {/* Full Width Field */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Product Name</label>
                                    <input className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none" placeholder="e.g. Paracetamol 500mg Tablets" type="text" />
                                </div>

                                {/* Left Column */}
                                <div className="flex flex-col gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                                        <div className="relative">
                                            <select defaultValue="" className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-4 pr-10 transition-all appearance-none cursor-pointer text-slate-900 dark:text-slate-100 outline-none">
                                                <option disabled value="">Select Category</option>
                                                <option value="antibiotics">Antibiotics</option>
                                                <option value="analgesics">Analgesics</option>
                                                <option value="antipyretics">Antipyretics</option>
                                                <option value="vitamins">Vitamins & Supplements</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Purchase Price</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                                <input className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-7 pr-4 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none" placeholder="0.00" type="number" step="0.01" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Selling Price</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                                <input className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-7 pr-4 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none" placeholder="0.00" type="number" step="0.01" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Expiry Date</label>
                                        <input className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 transition-all text-slate-900 dark:text-slate-100 outline-none" type="date" />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="flex flex-col gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Drug Classification</label>
                                        <div className="relative">
                                            <select defaultValue="" className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-4 pr-10 transition-all appearance-none cursor-pointer text-slate-900 dark:text-slate-100 outline-none">
                                                <option disabled value="">Select Classification</option>
                                                <option value="general">General</option>
                                                <option value="restricted">Restricted</option>
                                                <option value="narcotic">Narcotic</option>
                                                <option value="psychotropic">Psychotropic</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Batch Number</label>
                                        <input className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none" placeholder="e.g. BN-2023-001" type="text" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Minimum Stock</label>
                                            <input className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none" placeholder="10" type="number" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Initial Quantity</label>
                                            <input className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none" placeholder="100" type="number" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Shelf Location</label>
                                        <div className="relative">
                                            <input className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-4 pr-10 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none" placeholder="e.g. Row A - Shelf 3" type="text" />
                                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">inventory_2</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Note Field Full Width */}
                                <div className="md:col-span-2 mt-2">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Additional Notes (Optional)</label>
                                    <textarea className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:border-primary focus:ring-1 focus:ring-primary p-4 transition-all resize-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none" placeholder="Storage instructions or manufacturer details..." rows={2}></textarea>
                                </div>

                                {/* Modal Footer (Internal to form for standard submit behaviour) */}
                                <div className="md:col-span-2 mt-4 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 -mx-8 -mb-6 px-8 py-6 bg-slate-50 dark:bg-slate-900/50 rounded-b-xl">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2.5 rounded-lg font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-2.5 rounded-lg font-semibold text-white bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-xl">save</span>
                                        Save Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {/* Filter Modal Overlay */}
            {isFilterModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">filter_alt</span>
                                Advanced Filters
                            </h3>
                            <button
                                onClick={() => setIsFilterModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto space-y-6 flex-1">
                            {/* Filter Section 1 */}
                            <div>
                                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Price Range</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-slate-500">Min Price ($)</label>
                                        <input type="number" placeholder="0" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-slate-500">Max Price ($)</label>
                                        <input type="number" placeholder="1000" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Filter Section 2 */}
                            <div>
                                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Drug Classification</h4>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/50" />
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Prescription (Rx)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/50" />
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Over The Counter (OTC)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/50" />
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Controlled Substance</span>
                                    </label>
                                </div>
                            </div>

                            {/* Filter Section 3 */}
                            <div>
                                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Supplier</h4>
                                <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white">
                                    <option value="">All Suppliers</option>
                                    <option value="1">Global Pharma Inc.</option>
                                    <option value="2">MediLife Supplies</option>
                                    <option value="3">HealthCare Logistics</option>
                                </select>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 bg-slate-50 dark:bg-slate-800/50">
                            <button
                                onClick={() => setIsFilterModalOpen(false)}
                                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setIsFilterModalOpen(false)}
                                className="px-5 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-semibold transition-all shadow-sm shadow-primary/20"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
