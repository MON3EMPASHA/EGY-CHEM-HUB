import { create } from "zustand";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  brand: string;
  onSale: boolean;
}

interface Review {
  rating: number;
  comment: string;
}

interface ProductStore {
  products: Product[];
  product: Product | null;
  topProducts: Product[];
  newProducts: Product[];
  saleProducts: Product[];
  categoryProducts: Product[];
  brandProducts: Product[];
  loading: boolean;
  error: string | null;

  getAllProducts: () => Promise<void>;
  getProductById: (id: string) => Promise<void>;
  createProduct: (data: Partial<Product>) => Promise<void>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  getTopProducts: () => Promise<void>;
  getNewProducts: () => Promise<void>;
  applySaleToProduct: (id: string, saleData: any) => Promise<void>;
  getProductsOnSale: () => Promise<void>;
  addProductReview: (id: string, review: Review) => Promise<void>;
  filterProducts: (filters: any) => Promise<void>;
  getProductsByCategoryId: (categoryId: string) => Promise<void>;
  getProductsByBrandId: (brandId: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  product: null,
  topProducts: [],
  newProducts: [],
  saleProducts: [],
  categoryProducts: [],
  brandProducts: [],
  loading: false,
  error: null,

  getAllProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/api/products");
      set({ products: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getProductById: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/api/products/${id}`);
      set({ product: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createProduct: async (data) => {
    set({ loading: true });
    try {
      await axios.post("/api/products", data);
      await useProductStore.getState().getAllProducts();
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updateProduct: async (id, data) => {
    set({ loading: true });
    try {
      await axios.put(`/api/products/${id}`, data);
      await useProductStore.getState().getAllProducts();
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`/api/products/${id}`);
      await useProductStore.getState().getAllProducts();
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  searchProducts: async (query) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/api/products/search?name=${query}`);
      set({ products: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getTopProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/api/products/top");
      set({ topProducts: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getNewProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/api/products/new");
      set({ newProducts: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  applySaleToProduct: async (id, saleData) => {
    set({ loading: true });
    try {
      await axios.put(`/api/products/sale/${id}`, saleData);
      await useProductStore.getState().getAllProducts();
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getProductsOnSale: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/api/products/sale");
      set({ saleProducts: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  addProductReview: async (id, review) => {
    set({ loading: true });
    try {
      await axios.post(`/api/products/${id}/review`, review);
      await useProductStore.getState().getProductById(id);
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  filterProducts: async (filters) => {
    set({ loading: true });
    try {
      const res = await axios.post("/api/products/filter", filters);
      set({ products: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getProductsByCategoryId: async (categoryId) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/api/products/category/${categoryId}`);
      set({ categoryProducts: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getProductsByBrandId: async (brandId) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/api/products/brand/${brandId}`);
      set({ brandProducts: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
