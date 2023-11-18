import requests from "./httpService";

const ServiceBranch  = {
    getAllBranch: async () => {
        return requests.get(`/chinhanh`);
    },
    getBranch: async (id) => {
        return requests.get(`/chinhanh/${id}`);
    },

}

export default ServiceBranch ;