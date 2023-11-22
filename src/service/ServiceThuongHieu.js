import requests from "./httpService";

const ServiceThuongHieu = {
    getAllThuongHieu: async () => {
        return requests.get(`/thuonghieu`);
    },
    getThuongHieu: async (id) => {
        return requests.get(`/thuonghieu/${id}`);
    },
    createThuongHieu: async (body) => {
        return requests.post(`/thuonghieu`, body);
    },
    editThuongHieu: async (body, id) => {
        return requests.put(`/thuonghieu/`, body);
    },
    deleteThuongHieu: async (id) => {
        return requests.delete(`/thuonghieu/${id}`);
    }
}

export default ServiceThuongHieu;