import { createContext, useContext, useState } from 'react';

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
    const [titleContent, setTitleContent] = useState(null);
    const [actionButton, setActionButton] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <HeaderContext.Provider value={{
            titleContent, setTitleContent,
            actionButton, setActionButton,
            isMobileMenuOpen, setIsMobileMenuOpen
        }}>
            {children}
        </HeaderContext.Provider>
    );
}

export function useHeader() {
    return useContext(HeaderContext);
}
