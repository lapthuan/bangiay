import requests from "./httpService";

const ServiceEmployee = {
    getAllEmployee: async () => {
        return requests.get(`/nhanvien`);
    },
    getAEmployee: async (id) => {
        return requests.get(`/nhanvien/${id}`);
    },
    createEmployee: async (body) => {
        return requests.post(`/nhanvien`, body);
    },
    loginEmployee: async (body) => {
        return requests.post(`/nhanvien/login`, body);
    },
    editEmployee: async (body, id) => {
        return requests.put(`/nhanvien/${id}`, body);
    },
    deleteEmployee: async (id) => {
        return requests.delete(`/nhanvien/${id}`);
    }

}

export default ServiceEmployee;