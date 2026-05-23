import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return {
          success: false,
          message: data.message || "Failed to create product",
        };
      }

      set((state) => ({
        products: [...state.products, data.data],
      }));

      return {
        success: true,
        message: "Product created successfully.",
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Server error",
      };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      if (!res.ok || !data.success) {
        console.log("Fetch failed:", data.message);
        return;
      }

      set({
        products: data.data || [],
      });

    } catch (error) {
      console.log("Error fetching products:", error);
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: state.products.filter((p) => p._id !== pid),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Server error" };
    }
  },

updateProduct: async (pid, updatedProduct) => {
  try {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });

    const data = await res.json();

    if (!res.ok || !data.success || !data.data) {
      return { success: false, message: data.message };
    }

    set((state) => ({
      products: state.products.map((p) =>
        p._id === pid ? data.data : p
      ),
    }));

    return { success: true, message: data.message };

  } catch (error) {
    return { success: false, message: "Server error" };
  }
},
}));