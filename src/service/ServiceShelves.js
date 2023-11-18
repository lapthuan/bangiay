import requests from "./httpService";

const ServiceShelves = {
    getAllShelves: async () => {
        return requests.get(`/kehang`);
    },
    getShelves: async (id) => {
        return requests.get(`/kehang/${id}`);
    },
    createShelves: async (body) => {
        return requests.post(`/kehang`, body);
    },
    editShelves: async (body, id) => {
        return requests.put(`/kehang/${id}`, body);
    },
    deleteShelves: async (id) => {
        return requests.delete(`/kehang/${id}`);
    }
}

export default ServiceShelves;