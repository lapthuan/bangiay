import requests from "./httpService";

const ServiceCuaHang = {
    getAllCuaHang: async () => {
        return requests.get(`/cuahang`);
    },


}

export default ServiceCuaHang;