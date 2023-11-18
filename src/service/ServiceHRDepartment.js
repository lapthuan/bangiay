import requests from "./httpService";

const ServiceHRDepartment = {
    getAllHRDepartment: async () => {
        return requests.get(`/bophan`);
    },
    getHRDepartment: async (id) => {
        return requests.get(`/bophan/${id}`);
    },
    createHRDepartment: async (body) => {
        return requests.post(`/bophan`, body);
    },
    editHRDepartment: async (body, id) => {
        return requests.put(`/bophan/${id}`, body);
    },
    deleteHRDepartment: async (id) => {
        return requests.delete(`/bophan/${id}`);
    }
}

export default ServiceHRDepartment;