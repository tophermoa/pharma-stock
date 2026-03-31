import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect to requested page or dashboard if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    const handleLogin = (e) => {
        e.preventDefault();
        login(); // Trigger mock login
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center font-display relative">
            <style>
                {`
                .medical-pattern {
                    background-color: #f6f7f8;
                    background-image: radial-gradient(#137fec 0.5px, transparent 0.5px), radial-gradient(#137fec 0.5px, #f6f7f8 0.5px);
                    background-size: 20px 20px;
                    background-position: 0 0, 10px 10px;
                    opacity: 0.05;
                }
                .dark .medical-pattern {
                    background-color: #101922;
                    background-image: radial-gradient(#137fec 0.5px, transparent 0.5px), radial-gradient(#137fec 0.5px, #101922 0.5px);
                }
                `}
            </style>

            {/* Background Decoration */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 medical-pattern"></div>
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full max-w-md px-6 py-12">
                {/* Main Card */}
                <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">

                    {/* Header Image/Logo Section */}
                    <div className="relative h-48 bg-primary/5 flex flex-col items-center justify-center p-6 border-b border-slate-100 dark:border-slate-800">
                        <div className="mb-4 bg-primary text-white p-3 rounded-xl shadow-lg shadow-primary/30">
                            <span className="material-symbols-outlined text-4xl block">medication</span>
                        </div>
                        <h1 className="text-[#111418] dark:text-slate-100 text-3xl font-black tracking-tight">PharmaStock</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1 uppercase tracking-wider">Inventory Management System</p>
                    </div>

                    <div className="p-8">
                        {/* Welcome Text */}
                        <div className="mb-8 text-center">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Welcome Back</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Please enter your details to access your dashboard</p>
                        </div>

                        <form className="space-y-5" onSubmit={handleLogin}>
                            {/* Username Input */}
                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2">Username or Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <span className="material-symbols-outlined text-xl">person</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="admin@pharmastock.com"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white transition-all outline-none"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold">Password</label>
                                    <a href="#" className="text-primary text-xs font-bold hover:underline">Forgot Password?</a>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <span className="material-symbols-outlined text-xl">lock</span>
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white transition-all outline-none"
                                    />
                                    <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-xl">visibility</span>
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember-me"
                                    name="remember-me"
                                    className="h-4 w-4 text-primary border-slate-300 dark:border-slate-700 rounded focus:ring-primary"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 dark:text-slate-400 font-medium">
                                    Keep me signed in
                                </label>
                            </div>

                            {/* Sign In Button */}
                            <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group">
                                <span>Sign In to Dashboard</span>
                                <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                            </button>
                        </form>

                        {/* Footer Links */}
                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Need technical assistance? <a href="#" className="text-primary font-bold hover:underline">Contact Support</a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Versioning and Legal */}
                <div className="mt-8 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700">
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">verified_user</span> Secure SSL Encrypted
                        </span>
                        <span className="w-px h-3 bg-slate-300 dark:bg-slate-600"></span>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">v.1.0.0</span>
                    </div>
                    <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-semibold">© 2026 PharmaStock Inc.</p>
                </div>
            </div>

            {/* Decorative Image Elements */}
            <div className="hidden lg:block fixed top-20 right-20 w-32 h-32 opacity-20 rotate-12">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd0UrOVbHqqJDuk-O4goHenLs7sin0yKHbg3y9S1QBiQdNppJB535xSXvZqBKUhS70O4j8tEFiylxl60n2YqBVgu69ZtKpeaggYxfEzpJamBdMACWg8TF1ktnohIjeSDj1sWWLpywcIG3ctnhYqDUfyt3eJTNkoZC1DN15WQXyLFwErpAktrrJFYk_qIWbtWR5Nyi5-iQCVFBbjyo75zNbCHd1-4cZv6ShZAjYIZyouV-sF6mtwr2E8o7htH3e_82BNPrzby7c0X9m" data-alt="Abstract medical molecule representation icon" className="w-full h-full grayscale brightness-0 dark:invert" />
            </div>

            <div className="hidden lg:block fixed bottom-20 left-20 w-40 h-40 opacity-10 -rotate-12">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsJakLXcRl4XG_RlogNP8hxIUUwkcYoK2IlOd1ZPL0KcU7j3l0PaSlt7GYCUqt1jeM1V3rFfVLoNBYgDNtv1DyN1xaLRFLT4b3jnZs6c5HdnqQ_ra9s0-2rLCkIED9tZZiQpFEA1gDVHVIUOHDRC73PxVKFJoODVijAQN9N9VuFuigKzEiJ4abt4pcG_1l4KCtQH_iIEXz0-SpWyBE7VYfsQ9IbRzL77R-GRs7z8SeazZ-iSXnA41dfbm6HHkMsVZf_6Y57saALR2y" data-alt="Medical cross pattern geometric illustration" className="w-full h-full grayscale brightness-0 dark:invert" />
            </div>
        </div>
    );
}
