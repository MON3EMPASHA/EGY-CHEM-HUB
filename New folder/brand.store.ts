import create from "zustand";
import axios from "axios";

// Define the state and actions for managing brands
interface Brand {
  _id: string;
  name: string;
  description: string;
  website: string;
  logo: string;
  createdAt: string;
}

interface BrandStore {
  brands: Brand[];
  brand: Brand | null;
  loading: boolean;
  error: string | null;

  getAllBrands: () => void;
  getBrandById: (id: string) => void;
  createBrand: (brandData: Omit<Brand, "_id" | "createdAt">) => void;
  updateBrand: (
    id: string,
    brandData: Omit<Brand, "_id" | "createdAt">
  ) => void;
  deleteBrand: (id: string) => void;
}

const useBrandStore = create<BrandStore>((set) => ({
  brands: [],
  brand: null,
  loading: false,
  error: null,

  // Get all brands
  getAllBrands: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/api/brands");
      set({ brands: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Get a single brand by ID
  getBrandById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/api/brands/${id}`);
      set({ brand: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Create a new brand
  createBrand: async (brandData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/api/brands", brandData);
      set({ brands: [...get().brands, response.data], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Update an existing brand
  updateBrand: async (id: string, brandData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`/api/brands/${id}`, brandData);
      set({
        brands: get().brands.map((brand) =>
          brand._id === id ? response.data : brand
        ),
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Delete a brand
  deleteBrand: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/api/brands/${id}`);
      set({
        brands: get().brands.filter((brand) => brand._id !== id),
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useBrandStore;
