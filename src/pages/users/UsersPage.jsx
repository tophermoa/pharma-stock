import { useState, useEffect } from 'react';
import { useHeader } from '../../layouts/HeaderContext';


const getRoleBadgeClasses = (role) => {
    switch (role) {
        case 'Admin':
            return 'bg-primary/10 text-primary border-primary/20';
        case 'Pharmacist':
            return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800';
        case 'Cashier':
            return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
        case 'Owner':
            return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800';
        default:
            return 'bg-slate-100 text-slate-600 border-slate-200';
    }
};

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Dropdown states
    const [selectedRole, setSelectedRole] = useState('All Roles');
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('Status: Active');
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

    const { setTitleContent, setActionButton } = useHeader();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users.json');
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        setTitleContent(
            <div className="min-w-0 flex flex-col gap-1">
                <h2 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight truncate">User Management</h2>
            </div>
        );

        setActionButton(
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-1 sm:gap-2 bg-primary hover:bg-primary/90 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-semibold transition-all shadow-sm shadow-primary/20 shrink-0"
            >
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">person_add</span>
                <span className="hidden sm:inline">Add New User</span>
            </button>
        );

        return () => {
            setTitleContent(null);
            setActionButton(null);
        };
    }, [setTitleContent, setActionButton]);

    // Filtering logic
    const filteredUsers = users.filter(user => {
        const matchesRole = selectedRole === 'All Roles' || user.role === selectedRole;

        let matchesStatus = true;
        if (selectedStatus === 'Status: Active') {
            matchesStatus = user.status === 'Active';
        } else if (selectedStatus === 'Status: Inactive') {
            matchesStatus = user.status === 'Inactive';
        } else if (selectedStatus === 'Status: Suspended') {
            matchesStatus = user.status === 'Suspended';
        }
        // 'Status: All' means matchesStatus remains true

        return matchesRole && matchesStatus;
    });

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-background-light dark:bg-background-dark -m-8">
            <div className="flex-1 p-8 space-y-6">

                {/* Search Bar */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center shadow-sm mb-6">
                    <div className="relative w-full max-w-2xl">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 text-sm outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-500"
                            placeholder="Search pharmacy users..."
                            type="text"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-6 relative">
                    {/* Role Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                            onBlur={() => setTimeout(() => setIsRoleDropdownOpen(false), 200)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-primary transition-colors focus:outline-none"
                        >
                            <span className="material-symbols-outlined text-base">filter_list</span>
                            {selectedRole}
                            <span className="material-symbols-outlined text-base">expand_more</span>
                        </button>

                        {isRoleDropdownOpen && (
                            <div className="absolute top-full left-0 z-10 mt-1 w-48 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg py-1 overflow-hidden">
                                {['All Roles', 'Admin', 'Pharmacist', 'Cashier', 'Owner'].map((role) => (
                                    <button
                                        key={role}
                                        onClick={() => {
                                            setSelectedRole(role);
                                            setIsRoleDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedRole === role
                                            ? 'bg-primary/10 text-primary font-medium'
                                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Status Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                            onBlur={() => setTimeout(() => setIsStatusDropdownOpen(false), 200)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-primary transition-colors focus:outline-none"
                        >
                            <span className="material-symbols-outlined text-base">radio_button_checked</span>
                            {selectedStatus}
                            <span className="material-symbols-outlined text-base">expand_more</span>
                        </button>

                        {isStatusDropdownOpen && (
                            <div className="absolute top-full left-0 z-10 mt-1 w-48 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg py-1 overflow-hidden">
                                {['Status: All', 'Status: Active', 'Status: Inactive', 'Status: Suspended'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => {
                                            setSelectedStatus(status);
                                            setIsStatusDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedStatus === status
                                            ? 'bg-primary/10 text-primary font-medium'
                                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="ml-auto text-sm text-slate-500">
                        Showing {filteredUsers.length} results
                    </div>
                </div>

                {/* Table */}
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
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Name</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Role</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Last Login</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                    {filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                                No users match the selected filters.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((user, index) => (
                                            <tr
                                                key={user.id}
                                                className={`hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${index === filteredUsers.length - 1 ? 'border-none' : ''}`}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            className="w-10 h-10 rounded-full object-cover"
                                                            alt={`${user.name} avatar`}
                                                            src={user.avatar}
                                                        />
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400">{user.joined}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getRoleBadgeClasses(user.role)}`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{user.lastLogin}</p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                                            <span className="material-symbols-outlined text-lg">edit</span>
                                                        </button>
                                                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                            <span className="material-symbols-outlined text-lg">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )))}
                                </tbody>
                            </table>
                        </div>

                        {/* Table Footer / Pagination */}
                        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
                            <p className="text-xs text-slate-500 dark:text-slate-400">Page 1 of 1</p>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-xs font-medium text-slate-400 cursor-not-allowed">Previous</button>
                                <button className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-primary transition-colors">Next</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal Overlay */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                        {/* Modal Card */}
                        <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden mt-16">
                            {/* Modal Header */}
                            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-2xl">person_add</span>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Add New User</h3>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            {/* Modal Body */}
                            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                                {/* Profile Picture Upload Section */}
                                <div className="flex flex-col items-center justify-center pb-4 mb-2">
                                    <div className="relative group cursor-pointer">
                                        <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary">
                                            <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors">person</span>
                                        </div>
                                        <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-lg border-2 border-white dark:border-slate-900" type="button">
                                            <span className="material-symbols-outlined text-sm">photo_camera</span>
                                        </button>
                                    </div>
                                    <div className="mt-3 text-center">
                                        <button className="text-primary hover:text-primary/80 text-sm font-semibold flex items-center gap-1.5 mx-auto" type="button">
                                            <span className="material-symbols-outlined text-lg">upload</span>
                                            Upload Photo
                                        </button>
                                        <p className="text-slate-400 text-[11px] mt-1">JPG, PNG or GIF. Max 2MB</p>
                                    </div>
                                </div>
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person</span>
                                        <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400" placeholder="e.g. Michael Jordan" type="text" />
                                    </div>
                                </div>
                                {/* Role Selection */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Role</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">badge</span>
                                        <select defaultValue="" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                                            <option disabled value="">Select a role</option>
                                            <option value="owner">Owner</option>
                                            <option value="admin">Admin</option>
                                            <option value="pharmacist">Pharmacist</option>
                                            <option value="cashier">Cashier</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                    </div>
                                </div>
                                {/* Password Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                                            <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400" placeholder="••••••••" type="password" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Confirm Password</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock_reset</span>
                                            <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400" placeholder="••••••••" type="password" />
                                        </div>
                                    </div>
                                </div>
                                {/* Modal Footer Actions */}
                                <div className="flex items-center justify-end gap-3 pt-6 mt-2 border-t border-slate-100 dark:border-slate-800">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                        type="button"
                                    >
                                        Cancel
                                    </button>
                                    <button className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]" type="submit">
                                        Save User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
