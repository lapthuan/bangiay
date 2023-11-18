import requests from "./httpService";

const ServiceCoupon = {
    getAllCoupon: async () => {
        return requests.get(`/giamgia`);
    },
    getACoupon: async (id) => {
        return requests.get(`/giamgia/${id}`);
    },
    createCoupon: async (body) => {
        return requests.post(`/giamgia`, body);
    },
    editCoupon: async (body) => {
        return requests.put(`/giamgia`, body);
    },
    deleteCoupon: async (id) => {
        return requests.delete(`/giamgia/${id}`);
    }
}

export default ServiceCoupon;