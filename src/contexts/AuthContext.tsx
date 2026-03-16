import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { AuthResponse, LoginData, RegisterData } from '@/services/authService';

interface User {
    id: number;
    email: string;
    name: string | null;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem(STORAGE_KEY);
        const storedUser = localStorage.getItem(USER_KEY);

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (data: LoginData) => {
        const response: AuthResponse = await authService.login(data);
        localStorage.setItem(STORAGE_KEY, response.access_token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        setToken(response.access_token);
        setUser(response.user);
    };

    const register = async (data: RegisterData) => {
        const response: AuthResponse = await authService.register(data);
        localStorage.setItem(STORAGE_KEY, response.access_token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        setToken(response.access_token);
        setUser(response.user);
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoading,
                login,
                register,
                logout,
                isAuthenticated: !!token && !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
