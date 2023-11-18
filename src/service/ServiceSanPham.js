import requests from "./httpService";

const ServiceSanPham = {
    getAllSanPham: async () => {
        return requests.get(`/sanpham`);
    },
    getSanPham: async (id) => {
        return requests.get(`/sanpham/${id}`);
    },
    createSanPham: async (body) => {
        return requests.post(`/sanpham`, body);
    },
    editSanPham: async (body, id) => {
        return requests.put(`/sanpham/`, body);
    },
    deleteSanPham: async (id) => {
        return requests.delete(`/sanpham/${id}`);
    }
}

export default ServiceSanPham;