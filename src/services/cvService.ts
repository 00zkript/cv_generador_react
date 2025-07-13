import axios from '@/plugins/axios';

const URL_API = import.meta.env.VITE_API_URL_BASE;
const URL = URL_API + '/cvs';

async function index() {
    const response = await axios.get(`${URL}`);
    return response.data;
}

async function paginate(page = 1, perPage = 10) {
    const response = await axios.get(`${URL}/paginate`, {
        params: { page, per_page: perPage },
    });
    return response.data;
}

async function show(id: number) {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
}

async function store<T>(data: T) {
    const response = await axios.post(`${URL}/`, data);
    return response.data;
}

async function update<T>(id: number, data: T) {
    const response = await axios.put(`${URL}/${id}`, data);
    return response.data;
}

async function destroy(id: number) {
    const response = await axios.delete(`${URL}/${id}`);
    return response.data;
}

async function duplicate(id: number) {
    const response = await axios.post(`${URL}/${id}/duplicate`);
    return response.data;
}

function pdf(id: number) {
    return `${URL}/${id}/pdf`;
}

export default {
    index,
    paginate,
    show,
    store,
    update,
    destroy,
    duplicate,
    pdf,
};
