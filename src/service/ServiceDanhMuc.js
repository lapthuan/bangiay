import requests from "./httpService";

const ServiceDanhMuc  = {
    getAllDanhMuc: async () => {
        return requests.get(`/danhmuc`);
    },
    getALDanhMuc: async (id) => {
        return requests.get(`/danhmuc/${id}`);
    },
    createDanhMuc: async (body) => {
        return requests.post(`/danhmuc`, body);
    },
    editDanhMuc: async (body) => {
        return requests.put(`/danhmuc`, body);
    },
    deleteDanhMuc: async (id) => {
        return requests.delete(`/danhmuc/${id}`);
    }
}

export default ServiceDanhMuc ;