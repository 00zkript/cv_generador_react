import api from '@/plugins/axios';
import { Cv, PaginatedCvs } from '@/types/Cv';

const URL_API = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3000';
const URL = URL_API + '/cvs';

async function index(page = 1, limit = 10): Promise<PaginatedCvs> {
    const response = await api.get<PaginatedCvs>(URL, {
        params: { page, limit },
    });
    return response.data;
}

async function show(id: number): Promise<Cv> {
    const response = await api.get<Cv>(`${URL}/${id}`);
    return response.data;
}

async function store<T>(data: T) {
    const response = await api.post(URL, data);
    return response.data;
}

async function update<T>(id: number, data: T) {
    const response = await api.put(`${URL}/${id}`, data);
    return response.data;
}

async function destroy(id: number) {
    const response = await api.delete(`${URL}/${id}`);
    return response.data;
}

export interface GenerateCvData {
    title?: string;
    target_role: string;
    target_company: string;
    job_description: string;
}

export interface GenerateCvResponse {
    cv_id: number;
    version_id: number;
    target_role: string;
    target_company: string;
    generated_data: Record<string, unknown>;
    created_at: string;
}

async function generate(data: GenerateCvData): Promise<GenerateCvResponse> {
    const response = await api.post<GenerateCvResponse>(`${URL}/generate`, data);
    return response.data;
}

function pdf(id: number, versionId?: number) {
    const params = versionId ? `?versionId=${versionId}` : '';
    return `${URL}/${id}/pdf${params}`;
}

export default {
    index,
    show,
    store,
    update,
    destroy,
    generate,
    pdf,
};
