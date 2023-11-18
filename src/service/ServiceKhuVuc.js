import requests from "./httpService";

const ServicekhuVuc = {
    getAllkhuVuc: async () => {
        return requests.get(`/khuvuc`);
    },
    getkhuVuc: async (id) => {
        return requests.get(`/khuvuc/${id}`);
    },
    createkhuVuc: async (body) => {
        return requests.post(`/khuvuc`, body);
    },
    editkhuVuc: async (body, id) => {
        return requests.put(`/khuvuc/${id}`, body);
    },
    deletekhuVuc: async (id) => {
        return requests.delete(`/khuvuc/${id}`);
    }
}

export default ServicekhuVuc;