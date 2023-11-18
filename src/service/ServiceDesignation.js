import requests from "./httpService";

const ServiceDesignation = {
    getAllDesignation: async () => {
        return requests.get(`/chucvu`);
    },
    getADesignation: async (id) => {
        return requests.get(`/chucvu/${id}`);
    },
    createDesignation: async (body) => {
        return requests.post(`/chucvu`, body);
    },
    editDesignation: async (body, id) => {
        return requests.put(`/chucvu/${id}`, body);
    },
    deleteDesignation: async (id) => {
        return requests.delete(`/chucvu/${id}`);
    }
}

export default ServiceDesignation;