import api from '@/plugins/axios';
import type { Cv, PaginatedCvs, CvContentData, CreateCvData, UpdateCvData, GenerateCvData, GenerateCvResponse } from '@/types/Cv';

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

async function store(data: CreateCvData) {
    const response = await api.post(URL, data);
    return response.data;
}

async function update(id: number, data: UpdateCvData) {
    const response = await api.put(`${URL}/${id}`, data);
    return response.data;
}

async function destroy(id: number) {
    const response = await api.delete(`${URL}/${id}`);
    return response.data;
}

async function generate(data: GenerateCvData): Promise<GenerateCvResponse> {
    const response = await api.post<GenerateCvResponse>(`${URL}/generate`, data);
    return response.data;
}

async function addVersion(id: number, content: CvContentData) {
    const response = await api.post(`${URL}/${id}/versions`, { content_json: content });
    return response.data;
}

function pdf(id: number, versionId?: number) {
    const params = versionId ? `?versionId=${versionId}` : '';
    return `${URL}/${id}/pdf${params}`;
}

export type { Cv, PaginatedCvs, CvContentData, CreateCvData, UpdateCvData, GenerateCvData, GenerateCvResponse };
export default {
    index,
    show,
    store,
    update,
    destroy,
    generate,
    addVersion,
    pdf,
};
