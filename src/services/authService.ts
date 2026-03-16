import axios from '@/plugins/axios';

const URL_API = import.meta.env.VITE_API_URL_BASE;
const URL = URL_API + '/auth';

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name?: string;
    lastname?: string;
}

export interface AuthResponse {
    access_token: string;
    user: {
        id: number;
        email: string;
        name: string | null;
    };
}

async function login(data: LoginData): Promise<AuthResponse> {
    const response = await axios.post(`${URL}/login`, data);
    return response.data;
}

async function register(data: RegisterData): Promise<AuthResponse> {
    const response = await axios.post(`${URL}/register`, data);
    return response.data;
}

export default {
    login,
    register,
};
