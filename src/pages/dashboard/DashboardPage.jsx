import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = React.useState({
        monthlySalesData: [],
        expiringProducts: []
    });
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('/api/dashboard.json');
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();
                setDashboardData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-background-light dark:bg-background-dark -m-8">
            <div className="flex-1 p-8 space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">inventory</span>
                            </div>
                            <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">+2.4%</span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Products</p>
                        <h3 className="text-2xl font-bold mt-1 dark:text-white">1,240</h3>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-500">
                                <span className="material-symbols-outlined">warning</span>
                            </div>
                            <span className="text-xs font-bold text-orange-600 bg-orange-100 dark:bg-orange-500/20 dark:text-orange-400 px-2 py-1 rounded-full">Action Required</span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Low Stock</p>
                        <h3 className="text-2xl font-bold mt-1 dark:text-white">12</h3>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-500">
                                <span className="material-symbols-outlined">event_busy</span>
                            </div>
                            <span className="text-xs font-bold text-red-600 bg-red-100 dark:bg-red-500/20 dark:text-red-400 px-2 py-1 rounded-full">Urgent</span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Expiring Soon</p>
                        <h3 className="text-2xl font-bold mt-1 dark:text-white">8</h3>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-500">
                                <span className="material-symbols-outlined">payments</span>
                            </div>
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-500">vs yesterday</span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Daily Sales</p>
                        <h3 className="text-2xl font-bold mt-1 dark:text-white">$4,250.00</h3>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Chart Area and Expiring Table */}
                    <div className="xl:col-span-2 space-y-8">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h3 className="text-lg font-bold dark:text-white">Monthly Sales Performance</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Overview of revenue trends for the current year</p>
                                </div>
                                <select className="text-sm border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-primary outline-none">
                                    <option>Last 6 Months</option>
                                    <option>Last Year</option>
                                </select>
                            </div>

                            <div className="h-[280px] w-full mt-4">
                                {isLoading ? (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                ) : error ? (
                                    <div className="w-full h-full flex items-center justify-center text-red-500">{error}</div>
                                ) : (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={dashboardData.monthlySalesData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                                tickFormatter={(value) => `$${value / 1000}k`}
                                            />
                                            <Tooltip
                                                cursor={{ fill: 'transparent' }}
                                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                                                itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                                                formatter={(value) => [`$${value}`, 'Revenue']}
                                                labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                                            />
                                            <Bar
                                                dataKey="sales"
                                                fill="#3b82f6"
                                                radius={[6, 6, 0, 0]}
                                                maxBarSize={60}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                            <div className="h-6 mt-4"></div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <h3 className="text-lg font-bold dark:text-white">Recent Expiring Products</h3>
                                <button className="text-sm font-medium text-primary hover:underline">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                {isLoading ? (
                                    <div className="flex items-center justify-center p-8">
                                        <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                ) : error ? (
                                    <div className="p-4 text-center text-red-500">{error}</div>
                                ) : (
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-slate-800">
                                            <tr>
                                                <th className="px-6 py-4 uppercase text-xs tracking-wider">Product Name</th>
                                                <th className="px-6 py-4 uppercase text-xs tracking-wider">Batch ID</th>
                                                <th className="px-6 py-4 uppercase text-xs tracking-wider">Expiry Date</th>
                                                <th className="px-6 py-4 uppercase text-xs tracking-wider">Status</th>
                                                <th className="px-6 py-4 uppercase text-xs tracking-wider">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {dashboardData.expiringProducts.map((product) => (
                                                <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                    <td className="px-6 py-4 font-medium dark:text-white">{product.name}</td>
                                                    <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">{product.batch}</td>
                                                    <td className="px-6 py-4 dark:text-slate-300">{product.expiry}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1.5 rounded-full text-xs font-bold ${product.statusColors} dark:bg-opacity-20`}>
                                                            {product.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button className="text-primary font-bold hover:underline">{product.action}</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar / Quick Actions */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-lg font-bold mb-6 dark:text-white">Quick Actions</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <button
                                    onClick={() => navigate('/transactions')}
                                    className="w-full flex items-center justify-between p-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined">add_shopping_cart</span>
                                        <span>Add New Sale</span>
                                    </div>
                                    <span className="material-symbols-outlined text-sm opacity-50">arrow_forward_ios</span>
                                </button>

                                <button className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 rounded-xl font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined">input</span>
                                        <span>Stock In (Inward)</span>
                                    </div>
                                    <span className="material-symbols-outlined text-sm opacity-50 text-slate-400">arrow_forward_ios</span>
                                </button>

                                <button className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 rounded-xl font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined">description</span>
                                        <span>Generate Report</span>
                                    </div>
                                    <span className="material-symbols-outlined text-sm opacity-50 text-slate-400">arrow_forward_ios</span>
                                </button>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-lg font-bold mb-4 dark:text-white">Stock Alerts</h3>
                            <div className="space-y-4">
                                <div className="flex gap-4 items-start p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[20px]">priority_high</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold dark:text-slate-200">Metformin 500mg</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Stock Level: 5 units remaining</p>
                                        <button className="text-xs text-primary font-bold mt-3 hover:underline">Reorder Now</button>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[20px]">schedule</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold dark:text-slate-200">Vitamin D3 2000IU</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Expiring in 14 days</p>
                                        <button className="text-xs text-primary font-bold mt-3 hover:underline">Mark for Sale</button>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-6 text-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors py-2">
                                View All Notifications
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
