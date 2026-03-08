import { useState, useEffect } from 'react';
import { useHeader } from '../../layouts/HeaderContext';


export default function SuppliersPage() {
    const [suppliers, setSuppliers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const { setTitleContent, setActionButton } = useHeader();

    const totalPages = Math.ceil(suppliers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedSuppliers = suppliers.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await fetch('/api/suppliers.json');
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();
                setSuppliers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSuppliers();
    }, []);

    useEffect(() => {
        setTitleContent(
            <div className="min-w-0">
                <h2 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white truncate">Suppliers</h2>
            </div>
        );

        setActionButton(
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-1 sm:gap-2 bg-primary hover:bg-primary/90 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-semibold transition-all shadow-sm shadow-primary/20 shrink-0"
            >
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">add</span>
                <span className="hidden sm:inline">Add New Supplier</span>
            </button>
        );

        return () => {
            setTitleContent(null);
            setActionButton(null);
        };
    }, [setTitleContent, setActionButton]);

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-background-light dark:bg-background-dark -m-8">

            <div className="max-w-[1400px] mx-auto w-full space-y-6 p-8">
                {/* Search Bar */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center shadow-sm">
                    <div className="relative w-full max-w-2xl">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 text-sm outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-500"
                            placeholder="Search suppliers by name, contact person, or email..."
                            type="text"
                        />
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="size-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <span className="material-symbols-outlined text-3xl">groups</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-none">Total Suppliers</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">128</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="size-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                            <span className="material-symbols-outlined text-3xl">handshake</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-none">Active Partnerships</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">94</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="size-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                            <span className="material-symbols-outlined text-3xl">pending_actions</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-none">Pending Orders</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">12</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-none">Total Procurement</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">$42.5k</p>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                {isLoading ? (
                    <div className="flex items-center justify-center p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-center border border-red-200 dark:border-red-800">
                        <p>{error}</p>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/20">
                            <h3 className="font-bold text-slate-900 dark:text-white">Supplier List</h3>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsFilterModalOpen(true)}
                                    className="p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                                >
                                    <span className="material-symbols-outlined">filter_list</span>
                                </button>
                                <button className="p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors">
                                    <span className="material-symbols-outlined">file_download</span>
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30">
                                        <th className="px-6 py-4 font-semibold border-b border-slate-200 dark:border-slate-800">Supplier Name</th>
                                        <th className="px-6 py-4 font-semibold border-b border-slate-200 dark:border-slate-800">Contact Person</th>
                                        <th className="px-6 py-4 font-semibold border-b border-slate-200 dark:border-slate-800">Email</th>
                                        <th className="px-6 py-4 font-semibold border-b border-slate-200 dark:border-slate-800">Phone</th>
                                        <th className="px-6 py-4 font-semibold border-b border-slate-200 dark:border-slate-800">Address</th>
                                        <th className="px-6 py-4 font-semibold border-b border-slate-200 dark:border-slate-800 text-center">Status</th>
                                        <th className="px-6 py-4 font-semibold border-b border-slate-200 dark:border-slate-800 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {paginatedSuppliers.map(row => (
                                        <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">{row.initials}</div>
                                                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{row.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{row.contact}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{row.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{row.phone}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{row.address}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400'}`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button className="p-2 text-slate-400 hover:text-primary transition-colors" title="View History">
                                                        <span className="material-symbols-outlined text-xl">history</span>
                                                    </button>
                                                    <button className="p-2 text-slate-400 hover:text-primary transition-colors" title="Edit">
                                                        <span className="material-symbols-outlined text-xl">edit_note</span>
                                                    </button>
                                                    <button className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Delete">
                                                        <span className="material-symbols-outlined text-xl">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Showing {suppliers.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, suppliers.length)} of {suppliers.length} suppliers
                            </p>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="size-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`size-8 flex items-center justify-center rounded text-xs font-bold transition-colors ${currentPage === page
                                                ? 'bg-primary text-white'
                                                : 'border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    className="size-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    {/* Modal Container */}
                    <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-primary/10 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Add New Supplier</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Enter the details of the new supplier to add them to PharmaStock.</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        {/* Modal Content (Scrollable) */}
                        <div className="p-6 overflow-y-auto space-y-6">
                            <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Supplier Name */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Supplier Name</label>
                                        <input className="w-full h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400" placeholder="Enter company name" type="text" />
                                    </div>

                                    {/* Contact Person */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Primary Contact Person</label>
                                        <input className="w-full h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400" placeholder="Enter full name" type="text" />
                                    </div>

                                    {/* Tax ID / NPWP */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tax ID / NPWP</label>
                                        <input className="w-full h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400" placeholder="e.g. 01.234.567.8-901.000" type="text" />
                                    </div>

                                    {/* Phone Number */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">call</span>
                                            <input className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400" placeholder="+62..." type="tel" />
                                        </div>
                                    </div>

                                    {/* Email Address */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">mail</span>
                                            <input className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400" placeholder="example@supplier.com" type="email" />
                                        </div>
                                    </div>
                                </div>
                                {/* Physical Address */}
                                <div className="flex flex-col gap-2 mt-6">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Physical Address</label>
                                    <textarea className="w-full p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none resize-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400" placeholder="Enter complete business address" rows={3}></textarea>
                                </div>

                                {/* Modal Footer */}
                                <div className="mt-8 pt-6 border-t border-primary/10 flex justify-end items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-lg">save</span>
                                        Save Supplier
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
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">filter_alt</span>
                                Supplier Filters
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
                                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Status</h4>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/50" />
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Active</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/50" />
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Inactive</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/50" />
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Under Review</span>
                                    </label>
                                </div>
                            </div>

                            {/* Filter Section 2 */}
                            <div>
                                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Region</h4>
                                <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white">
                                    <option value="">All Regions</option>
                                    <option value="1">North America</option>
                                    <option value="2">Europe</option>
                                    <option value="3">Asia Pacific</option>
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
