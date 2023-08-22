import { create } from "zustand";

interface ProductState {
	list: number[];
	reset: (newProduct: number[]) => void;
	add: (newProduct: number) => void;
	remove: (removeProductId: number) => void;
}

export const useWishlistStore = create<ProductState>((set) => ({
	list: [],
	add: (newProduct) =>
		set((state) => ({
			list: [...state.list, newProduct],
		})),
	reset: (newProduct) =>
		set((state) => ({
			list: newProduct,
		})),
	remove: (removeProductId) => set((state) => ({ list: state.list.filter((item) => item !== removeProductId) })),
}));
