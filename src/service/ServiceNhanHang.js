import requests from "./httpService";

const ServiceNhanHang = {
    getAllNhanHang: async () => {
        return requests.get(`/nhanhang`);
    },
    getANhanHang: async (id) => {
        return requests.get(`/nhanhang/${id}`);
    },
    createNhanHang: async (body) => {
        return requests.post(`/nhanhang`, body);
    },
    editNhanHang: async (body) => {
        return requests.put(`/nhanhang`, body);
    },
    deleteNhanHang: async (id) => {
        return requests.delete(`/nhanhang/${id}`);
    }
}

export default ServiceNhanHang;