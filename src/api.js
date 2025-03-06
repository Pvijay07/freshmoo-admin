import axios from "axios";

const api = axios.create({
  baseURL: "http://your-api-url.com",
});

export const login = async (username, password) => {
  try {
    const response = await api.post("/login", {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get("/api/getProducts");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await api.get(`/api/getProduct/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const createProduct = async (product) => {
  try {
    const response = await api.post("/api/createProduct", product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await api.put(`/api/updateProduct/${id}`, product);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/api/deleteProduct/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/api/getProductsByCategory/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

export const createCategory = async () => {
  try {
    const response = await api.post("/api/createCategory");
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (id, category) => {
  try {
    const response = await api.put(`/api/updateCategory/${id}`, category);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/api/deleteCategory/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await api.get("/api/orders");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get("/api/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getDeliveryPartners = async () => {
  try {
    const response = await api.get("/api/deliveryPartners");
    return response.data;
  } catch (error) {
    console.error("Error fetching delivery partners:", error);
    throw error;
  }
};

export const updateDeliveryPartner = async (id, deliveryPartner) => {
  try {
    const response = await api.put(
      `/api/updateDeliveryPartner/${id}`,
      deliveryPartner
    );
    return response.data;
  } catch (error) {
    console.error("Error updating delivery partner:", error);
    throw error;
  }
};

export const updateOrder = async (id, order) => {
  try {
    const response = await api.put(`/api/updateOrder/${id}`, order);
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const response = await api.put(`/api/updateOrderStatus/${id}`, status);
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

export const getbanners = async () => {
  try {
    const response = await api.get("/api/banners");
    return response.data;
  } catch (error) {
    console.error("Error fetching banners:", error);
    throw error;
  }
};

export const createBanner = async () => {
  try {
    const response = await api.post("/api/createBanner");
    return response.data;
  } catch (error) {
    console.error("Error creating banner:", error);
    throw error;
  }
};

export const updateBanner = async (id, banner) => {
  try {
    const response = await api.put(`/api/updateBanner/${id}`, banner);
    return response.data;
  } catch (error) {
    console.error("Error updating banner:", error);
    throw error;
  }
};

export const deleteBanner = async (id) => {
  try {
    const response = await api.delete(`/api/deleteBanner/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting banner:", error);
    throw error;
  }
};

export const getCoupons = async () => {
  try {
    const response = await api.get("/api/coupons");
    return response.data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw error;
  }
};

export const createCoupon = async () => {
  try {
    const response = await api.get("/api/createCoupon");
    return response.data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw error;
  }
};

export const updateCoupon = async (id, coupon) => {
  try {
    const response = await api.get(`/api/updateCoupon/${id}`, coupon);
    return response.data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw error;
  }
};

export const deleteCoupon = async (id) => {
  try {
    const response = await api.delete(`/api/deleteCoupon/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw error;
  }
};
