import { NavLink } from 'react-router-dom';
import { useHeader } from '../layouts/HeaderContext';

const navItems = [
    { icon: 'dashboard', label: 'Dashboard', path: '/' },
    { icon: 'inventory_2', label: 'Inventory', path: '/products' },
    { icon: 'local_shipping', label: 'Suppliers', path: '/suppliers' },
    { icon: 'shopping_cart', label: 'Orders', path: '/transactions' },
    { icon: 'bar_chart', label: 'Reports', path: '/reports' },
    { icon: 'group', label: 'Users', path: '/users' },
];

export function Sidebar() {
    const { isMobileMenuOpen, setIsMobileMenuOpen } = useHeader();

    return (
        <>
            {/* Mobile Backdrop Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <aside
                className={`
                    w-64 flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full
                    fixed inset-y-0 left-0 z-50 md:relative md:z-0
                    transform transition-transform duration-300 ease-in-out
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                `}
            >
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary rounded-lg p-1.5 text-white flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl">medical_services</span>
                        </div>
                        <div>
                            <h1 className="text-slate-900 dark:text-white font-bold text-lg leading-tight">PharmaStock</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-xs">Inventory System</p>
                        </div>
                    </div>
                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                                    ? 'bg-primary/10 text-primary font-bold'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium'
                                }`
                            }
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="text-sm">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                        <img
                            className="w-10 h-10 rounded-full object-cover"
                            alt="User profile avatar"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2RN3snql4zrdbE_XwPGK_0ok7bhlkhIHbgVSLX4kvzaPCtmEcZachZR0uolHLJ6mLAx6mx9_C8MKMqG9g_fp3eP_hquc4LTPnhWqV6KPlnzWZYUnYBroF2gFU-_fnfxIRoLSTAoYy4oBiNA1buVArD8jguu6Sstr52QvOvC7wVrH4QaI262lkDhD3SlxlDdotzXwjGka4EYCOBDc-lJILlzBARWF0-9tkq6fTSbh1CscSKBXavCWM6fU_h11a0y2tbOAFp2Pwc8oi"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Dr. Sarah L.</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Administrator</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
