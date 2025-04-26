import axios from "@/plugins/axios";

const URL_API = import.meta.env.VITE_API_URL_BASE;
const URL = URL_API+'/cvs';

async function index() {
    try {
        const response = await axios.get(`${URL}`);
        return response.data;       
    } catch (error) {
        console.error('Error de servidor',error);
        throw error;
    }
}

async function show(id:number) {
    try {
        const response = await axios.get(`${URL}/${id}`);
        return response.data;       
    } catch (error) {
        console.error('Error de servidor',error);
        throw error;
    }
}

async function store<T,>(data: T) {
    try {
        const response = await axios.post(`${URL}/`, data );
        return response.data;       
    } catch (error) {
        console.error('Error de servidor',error);
        throw error;
    }
}

async function update<T,>(id : number, data: T) {
    try {
        const response = await axios.put(`${URL}/${id}`, data );
        return response.data;       
    } catch (error) {
        console.error('Error de servidor',error);
        throw error;
    }
}

async function destroy(id : number) {
    try {
        const response = await axios.delete(`${URL}/${id}`);
        return response.data;       
    } catch (error) {
        console.error('Error de servidor',error);
        throw error;
    }
}

async function duplicate(id : number) {
    try {
        const response = await axios.post(`${URL}/${id}/duplicate`);
        return response.data;       
    } catch (error) {
        console.error('Error de servidor',error);
        throw error;
    }
}

function pdf(id : number) {
    return `${URL}/${id}/pdf`
}

export default { 
    index, 
    show, 
    store, 
    update, 
    destroy, 
    duplicate,
    pdf,
};