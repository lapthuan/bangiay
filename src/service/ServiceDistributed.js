import requests from "./httpService";

const ServiceDistributed = {
    PhanTanNgang: async (body) => {
        return requests.post(`/phantan`, body);
    },
    ShowTable: async (database) => {
        return requests.get(`/mysql/showtable/${database}`);
    },
    ShowColumn: async (table) => {
        return requests.get(`/mysql/showcolumn/${table}`);
    },
    LoginMysql: async (body) => {
        return requests.post(`/mysql/login`, body);
    },
}

export default ServiceDistributed;