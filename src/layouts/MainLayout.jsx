import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { HeaderProvider } from './HeaderContext';
import { ThemeProvider } from './ThemeContext';

export function MainLayout() {
    return (
        <ThemeProvider>
            <HeaderProvider>
                <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
                    <Sidebar />
                    <main className="flex-1 flex flex-col overflow-hidden">
                        <Header />
                        <div className="flex-1 overflow-y-auto p-8">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </HeaderProvider>
        </ThemeProvider>
    );
}
