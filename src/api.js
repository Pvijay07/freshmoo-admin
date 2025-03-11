import axios from "axios";

export const api = axios.create({
  baseURL: "https://app.freshmoo.in/api/",
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
    const response = await api.get("/admin/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await api.get(`/admin/getProduct/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const createProduct = async (product) => {
  try {
    const response = await api.post("/admin/createProduct", product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await api.put(`/admin/updateProduct/${id}`, product);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/admin/deleteProduct/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/admin/getProductsByCategory/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await api.post("/admin/createCategory",categoryData);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (id, category) => {
  try {
    const response = await api.put(`/admin/updateCategory/${id}`, category);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/admin/deleteCategory/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await api.get("/admin/orders");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
export const getCategories = async () => {
  try {
    const response = await api.get("/admin/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get("/admin/customers");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getDeliveryPartners = async () => {
  try {
    const response = await api.get("/admin/partners");
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
    const response = await api.put(`/admin/updateOrder/${id}`, order);
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const response = await api.put(`/admin/updateOrderStatus/${id}`, status);
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

export const getbanners = async () => {
  try {
    const response = await api.get("/admin/banners");
    return response.data;
  } catch (error) {
    console.error("Error fetching banners:", error);
    throw error;
  }
};

export const createBanner = async () => {
  try {
    const response = await api.post("/admin/createBanner");
    return response.data;
  } catch (error) {
    console.error("Error creating banner:", error);
    throw error;
  }
};

export const updateBanner = async (id, banner) => {
  try {
    const response = await api.put(`/admin/updateBanner/${id}`, banner);
    return response.data;
  } catch (error) {
    console.error("Error updating banner:", error);
    throw error;
  }
};

export const deleteBanner = async (id) => {
  try {
    const response = await api.delete(`/admin/deleteBanner/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting banner:", error);
    throw error;
  }
};

export const getCoupons = async () => {
  try {
    const response = await api.get("/admin/coupons");
    return response.data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw error;
  }
};

export const createCoupon = async () => {
  try {
    const response = await api.get("/admin/createCoupon");
    return response.data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw error;
  }
};

export const updateCoupon = async (id, coupon) => {
  try {
    const response = await api.get(`/admin/updateCoupon/${id}`, coupon);
    return response.data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw error;
  }
};

export const deleteCoupon = async (id) => {
  try {
    const response = await api.delete(`/admin/deleteCoupon/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw error;
  }
};
