import api from "./api";

export const deviceService = {
  getBrands: (category = "mobile") =>
    api.get(`/devices/brands?category=${category}`),
  getModels: (brand, category = "mobile") =>
    api.get(`/devices/models?brand=${brand}&category=${category}`),
  getDevice: (slug) => api.get(`/devices/${slug}`),
<<<<<<< HEAD
  calculatePrice: (data) => api.post('/devices/calculate-price', data),
  searchDevices: (query) => api.get(`/devices/search?q=${encodeURIComponent(query)}`),
=======
  calculatePrice: (data) => api.post("/devices/calculate-price", data),
  searchDevices: (query, category = "all") =>
    api.get(`/devices/search?q=${query}&category=${category}`),
>>>>>>> cc78380c34e54be990bee668e880ef0036fb2728
};
