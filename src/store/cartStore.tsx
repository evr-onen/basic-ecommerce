import { create } from "zustand";
import { defaultProducts } from "@/constants/product";
interface ProductState {
	cartProducts: CartProductsType[];
	add: (newProduct: CartProductsType) => void;
	remove: (removeProductId: number) => void;
	update: (updateProduct: CartProductsType) => void;
	reset: (allCartProducts: CartProductsType[]) => void;
}

export type CartProductsType = {
	id: number;
	name: string;
	category: string;
	price: string;
	cartQuantity: number;
	images: string[];
};

export const useCartStore = create<ProductState>((set) => ({
	cartProducts: [],
	add: (newProduct) =>
		set((state) => ({
			cartProducts: [...state.cartProducts, newProduct],
		})),
	remove: (removeProductId) =>
		set((state) => ({ cartProducts: state.cartProducts.filter((item) => item.id !== removeProductId) })),
	update: (updateProduct) => {
		set((state) => {
			const productIndex = state.cartProducts.findIndex((product) => product.id === updateProduct.id);
			const allProducts = state.cartProducts;
			allProducts[productIndex] = updateProduct;
			return { cartProducts: allProducts };
		});
	},
	// update: (updateProduct) => {
	// 	set((state) => {
	// 		const updatedProducts = state.cartProducts.map((product) =>
	// 			product.id === updateProduct.id ? updateProduct : product
	// 		);
	// 		return { cartProducts: updatedProducts };
	// 	});
	// },
	reset: (newProduct: CartProductsType[]) =>
		set((state) => ({
			cartProducts: newProduct,
		})),
}));
