import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHeader } from '../layouts/HeaderContext';
import { useTheme } from '../layouts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { titleContent, actionButton, setIsMobileMenuOpen } = useHeader();
    const { theme, toggleTheme } = useTheme();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsNotificationsOpen(false);
                setIsHelpOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Configuration for the header content based on the current route
    const getHeaderConfig = () => {
        switch (location.pathname) {
            case '/':
                return { title: 'Dashboard', hasSearch: false };
            case '/products':
                return { title: 'Inventory', hasSearch: false };
            case '/stock':
                return { title: 'Stock Management', hasSearch: true, searchPlaceholder: 'Search stock records...' };
            case '/purchase':
                return { title: 'Purchase Orders', hasSearch: false };
            case '/suppliers':
                return { title: 'Suppliers', hasSearch: false };
            case '/transactions':
                return { title: 'Orders', hasSearch: false };
            case '/reports':
                return { title: 'Reports', hasSearch: false };
            case '/users':
                return { title: 'Users', hasSearch: false };
            default:
                return { title: '', hasSearch: false };
        }
    };

    const { title, hasSearch, searchPlaceholder } = getHeaderConfig();

    return (
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 flex-shrink-0 gap-2 md:gap-4">
            <div className="flex-1 min-w-0 max-w-md flex items-center h-full gap-2 md:gap-4">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex-shrink-0 transition-colors"
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>
                {titleContent && (
                    <div className="min-w-0 flex-shrink truncate relative top-[-1px]">
                        {titleContent}
                    </div>
                )}
                {hasSearch ? (
                    <div className="relative group w-full">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                        <input
                            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-slate-500 dark:placeholder:text-slate-400 transition-all outline-none text-slate-900 dark:text-slate-100"
                            placeholder={searchPlaceholder || "Search..."}
                            type="text"
                        />
                    </div>
                ) : (
                    !titleContent && <h2 className="text-xl font-bold text-slate-900 dark:text-white capitalize">{title}</h2>
                )}
            </div>

            {/* Right Side: Action Button and Utilities */}
            <div ref={dropdownRef} className="flex items-center gap-1 sm:gap-2">
                {/* Action Button (Moved Before Utilities) */}
                {actionButton && (
                    <div className="mr-1 pr-1 sm:pr-2 md:mr-2 md:pr-4 border-r border-slate-200 dark:border-slate-800">
                        {actionButton}
                    </div>
                )}

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-colors text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    <span className="material-symbols-outlined text-[20px] sm:text-[24px]">
                        {theme === 'light' ? 'dark_mode' : 'light_mode'}
                    </span>
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsHelpOpen(false); }}
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-colors ${isNotificationsOpen ? 'bg-primary/10 text-primary' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                        <span className="material-symbols-outlined text-[20px] sm:text-[24px]">notifications</span>
                        {/* Notification Badge */}
                        <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                    </button>

                    {/* Notifications Dropdown */}
                    {isNotificationsOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 py-2 z-50">
                            <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <h3 className="font-bold text-sm dark:text-white">Notifications</h3>
                                <button className="text-xs text-primary hover:underline">Mark all as read</button>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                <button className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800/50">
                                    <div className="flex gap-3">
                                        <div className="p-1.5 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-lg h-fit">
                                            <span className="material-symbols-outlined text-[16px]">warning</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold dark:text-slate-200">Low Stock Alert</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Paracetamol 500mg is below minimum threshold.</p>
                                            <p className="text-[10px] text-slate-400 mt-1">10 mins ago</p>
                                        </div>
                                    </div>
                                </button>
                                <button className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800/50">
                                    <div className="flex gap-3">
                                        <div className="p-1.5 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg h-fit">
                                            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold dark:text-slate-200">Delivery Arrived</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">PO-2023-089 from MediSupply Co. has been received.</p>
                                            <p className="text-[10px] text-slate-400 mt-1">2 hours ago</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div className="p-2 border-t border-slate-100 dark:border-slate-800 text-center">
                                <button className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">View All activity</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Help Menu */}
                <div className="relative">
                    <button
                        onClick={() => { setIsHelpOpen(!isHelpOpen); setIsNotificationsOpen(false); }}
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-colors ${isHelpOpen ? 'bg-primary/10 text-primary' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                        <span className="material-symbols-outlined text-[20px] sm:text-[24px]">help_outline</span>
                    </button>

                    {/* Help Dropdown */}
                    {isHelpOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 py-2 z-50">
                            <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                                <h3 className="font-bold text-sm dark:text-white">Help & Support</h3>
                            </div>
                            <div className="py-1">
                                <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">menu_book</span> Documentation
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">keyboard</span> Keyboard Shortcuts
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">support_agent</span> Contact Support
                                </button>
                            </div>
                            <div className="border-t border-slate-100 dark:border-slate-800 py-1 mt-1">
                                <p className="px-4 py-1 text-xs text-slate-400">Version 2.1.0</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Logout Button */}
                <button
                    onClick={() => {
                        logout();
                        navigate('/login');
                    }}
                    title="Logout"
                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ml-1"
                >
                    <span className="material-symbols-outlined text-[20px] sm:text-[24px]">logout</span>
                </button>

            </div>
        </header >
    );
}
