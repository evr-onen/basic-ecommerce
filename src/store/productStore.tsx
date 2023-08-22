import { create } from "zustand";
import { defaultProducts } from "@/constants/product";
interface ProductState {
	products: ProductType[];
	add: (newProduct: ProductType) => void;
	remove: (removeProductId: number) => void;
	update: (updateProduct: ProductType) => void;
}
type OptionType = { id: number; label: string };
export type ProductType = {
	id: number;
	name: string;
	category: OptionType;
	price: string;
	quantity: number;
	images: string[];
};

export const useProductStore = create<ProductState>((set) => ({
	products: defaultProducts,
	add: (newProduct) =>
		set((state) => ({
			products: [...state.products, newProduct],
		})),
	remove: (removeProductId) =>
		set((state) => ({ products: state.products.filter((item) => item.id !== removeProductId) })),
	update: (updateProduct) => {
		set((state) => {
			const updatedProducts = state.products.map((product) =>
				product.id === updateProduct.id ? updateProduct : product
			);
			return { products: updatedProducts };
		});
	},
}));
