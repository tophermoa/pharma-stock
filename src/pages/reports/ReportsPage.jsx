import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ReportsPage() {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [activeTab, setActiveTab] = useState('Sales Report');
    const [activeFilter, setActiveFilter] = useState('30 Days');

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch('/api/reports.json');
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();
                setTransactions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReports();
    }, []);

    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTransactions = transactions.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-background-light dark:bg-background-dark -m-8">
            <div className="flex-1 p-8 space-y-6">
                {/* Tabs */}
                <div className="border-b border-slate-200 dark:border-slate-800 flex overflow-x-auto whitespace-nowrap gap-8 mb-6 scrollbar-hide">
                    {['Sales Report', 'Purchase Report', 'Stock Report', 'Expired Products Report'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 px-1 border-b-2 text-sm transition-colors ${activeTab === tab
                                ? 'border-primary text-primary font-semibold'
                                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Filters & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex overflow-x-auto whitespace-nowrap items-center gap-2 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                        {['Today', '7 Days', '30 Days'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeFilter === filter
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                        <button
                            onClick={() => setActiveFilter('Custom')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center gap-1 transition-colors ${activeFilter === 'Custom'
                                ? 'bg-primary text-white shadow-sm'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                                }`}
                        >
                            Custom <span className="material-symbols-outlined text-sm leading-none">calendar_month</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
                            <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                            Export PDF
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
                            <span className="material-symbols-outlined text-green-600">table_view</span>
                            Export Excel
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'Sales Report' && (
                    <>
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <span className="material-symbols-outlined text-primary">payments</span>
                                    </div>
                                    <span className="text-green-600 text-xs font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">+12.5%</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Revenue</p>
                                <h3 className="text-2xl font-bold mt-1 dark:text-white">$45,280.00</h3>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <span className="material-symbols-outlined text-blue-500">shopping_bag</span>
                                    </div>
                                    <span className="text-red-600 text-xs font-bold bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">-2.4%</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Orders</p>
                                <h3 className="text-2xl font-bold mt-1 dark:text-white">1,240</h3>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                                        <span className="material-symbols-outlined text-emerald-500">trending_up</span>
                                    </div>
                                    <span className="text-green-600 text-xs font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">+8.1%</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Gross Profit</p>
                                <h3 className="text-2xl font-bold mt-1 dark:text-white">$12,850.00</h3>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-purple-500/10 rounded-lg">
                                        <span className="material-symbols-outlined text-purple-500">analytics</span>
                                    </div>
                                    <span className="text-green-600 text-xs font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">+1.2%</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Avg Order Value</p>
                                <h3 className="text-2xl font-bold mt-1 dark:text-white">$36.50</h3>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="font-bold dark:text-white">Sales Trends</h4>
                                    <select className="text-xs border-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 rounded-lg py-1 px-2 focus:ring-primary outline-none">
                                        <option>Weekly View</option>
                                        <option>Monthly View</option>
                                    </select>
                                </div>

                                <div className="h-72 mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart
                                            data={[
                                                { name: 'Mon', sales: 12000 },
                                                { name: 'Tue', sales: 18000 },
                                                { name: 'Wed', sales: 15000 },
                                                { name: 'Thu', sales: 22000 },
                                                { name: 'Fri', sales: 14000 },
                                                { name: 'Sat', sales: 28000 },
                                                { name: 'Sun', sales: 20000 },
                                            ]}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#64748b', fontSize: 12 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#64748b', fontSize: 12 }}
                                                tickFormatter={(value) => `$${value / 1000}k`}
                                                dx={-10}
                                            />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                                                formatter={(value) => [`$${value}`, 'Sales']}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="sales"
                                                stroke="#3b82f6"
                                                strokeWidth={3}
                                                dot={{ r: 4, strokeWidth: 2 }}
                                                activeDot={{ r: 6 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                                <div>
                                    <h4 className="font-bold mb-6 dark:text-white">Revenue by Category</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-xs mb-1 dark:text-slate-300">
                                                <span>Prescription Meds</span>
                                                <span className="font-bold">62%</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="bg-primary h-full w-[62%]"></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-xs mb-1 dark:text-slate-300">
                                                <span>OTC Products</span>
                                                <span className="font-bold">24%</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="bg-blue-400 h-full w-[24%]"></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-xs mb-1 dark:text-slate-300">
                                                <span>Medical Equipment</span>
                                                <span className="font-bold">10%</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="bg-purple-400 h-full w-[10%]"></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-xs mb-1 dark:text-slate-300">
                                                <span>Others</span>
                                                <span className="font-bold">4%</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="bg-slate-300 dark:bg-slate-600 h-full w-[4%]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                                    <p className="text-xs text-slate-500">Most profitable category this month</p>
                                    <p className="text-sm font-bold text-primary mt-1">Cardiovascular Meds</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Transactions Table */}
                        {isLoading ? (
                            <div className="flex items-center justify-center p-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : error ? (
                            <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-center border border-red-200 dark:border-red-800">
                                <p>{error}</p>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                                    <h4 className="font-bold dark:text-white">Recent Sales Transactions</h4>
                                    <button className="text-sm text-primary font-medium hover:underline">View All</button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left min-w-[700px]">
                                        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                            <tr>
                                                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Date</th>
                                                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Transaction ID</th>
                                                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Customer/Type</th>
                                                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Items</th>
                                                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Total Amount</th>
                                                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {paginatedTransactions.map((trx) => (
                                                <tr key={trx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap dark:text-slate-300">{trx.date}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-primary">{trx.id}</td>
                                                    <td className="px-6 py-4 text-sm dark:text-slate-300">{trx.customer}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{trx.items}</td>
                                                    <td className="px-6 py-4 text-sm font-bold dark:text-white">{trx.amount}</td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${trx.statusColor}`}>
                                                            {trx.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <p className="text-xs text-slate-500">
                                        Showing {transactions.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, transactions.length)} of {transactions.length} results
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="p-1.5 border border-slate-200 dark:border-slate-800 rounded hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-sm text-slate-400">chevron_left</span>
                                        </button>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`size-7 flex items-center justify-center rounded text-xs font-bold transition-colors ${currentPage === page
                                                    ? 'bg-primary text-white'
                                                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-300'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages || totalPages === 0}
                                            className="p-1.5 border border-slate-200 dark:border-slate-800 rounded hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-sm text-slate-400">chevron_right</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'Purchase Report' && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 text-center shadow-sm">
                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-3xl">local_shipping</span>
                        </div>
                        <h3 className="text-xl font-bold dark:text-white mb-2">Purchase Report Example</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
                            This section will display data regarding your procurement, such as total purchase volume, supplier performance metrics, and recent purchase orders.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
                            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Purchases</p>
                                <p className="text-lg font-bold dark:text-white">$12,450</p>
                            </div>
                            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Pending Orders</p>
                                <p className="text-lg font-bold dark:text-white">14</p>
                            </div>
                            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Top Supplier</p>
                                <p className="text-lg font-bold dark:text-white">MediSupply Co.</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Stock Report' && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 text-center shadow-sm">
                        <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-3xl">inventory_2</span>
                        </div>
                        <h3 className="text-xl font-bold dark:text-white mb-2">Stock Report Example</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
                            Monitor your current inventory levels, track low stock items, and analyze inventory valuation to optimize your stock hold.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
                            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Items in Stock</p>
                                <p className="text-lg font-bold dark:text-white">8,432</p>
                            </div>
                            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/20">
                                <p className="text-xs text-amber-600 dark:text-amber-400 mb-1">Low Stock Alerts</p>
                                <p className="text-lg font-bold text-amber-700 dark:text-amber-300">24 Items</p>
                            </div>
                            <div className="p-4 rounded-xl border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/20">
                                <p className="text-xs text-red-600 dark:text-red-400 mb-1">Out of Stock</p>
                                <p className="text-lg font-bold text-red-700 dark:text-red-300">5 Items</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Expired Products Report' && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 text-center shadow-sm">
                        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-3xl">warning</span>
                        </div>
                        <h3 className="text-xl font-bold dark:text-white mb-2">Expired Products Recommendation</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
                            Keep track of products nearing expiration to minimize losses and ensure compliance with safety standards.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
                            <div className="p-4 rounded-xl border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/20">
                                <p className="text-xs text-red-600 dark:text-red-400 mb-1">Already Expired</p>
                                <p className="text-lg font-bold text-red-700 dark:text-red-300">12 items</p>
                            </div>
                            <div className="p-4 rounded-xl border border-orange-200 dark:border-orange-800/50 bg-orange-50 dark:bg-orange-900/20">
                                <p className="text-xs text-orange-600 dark:text-orange-400 mb-1">Expires in &lt; 30 Days</p>
                                <p className="text-lg font-bold text-orange-700 dark:text-orange-300">45 items</p>
                            </div>
                            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/20">
                                <p className="text-xs text-amber-600 dark:text-amber-400 mb-1">Expires in 30-90 Days</p>
                                <p className="text-lg font-bold text-amber-700 dark:text-amber-300">128 items</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
