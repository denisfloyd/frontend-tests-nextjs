import create from 'zustand';

const initialState = {
  open: false,
  products: [],
};

export const useCartStore = create((set) => ({
  state: {
    open: false,
    products: [],
    ...initialState,
  },
  actions: {
    toggle: () =>
      set((store) => ({
        state: { ...store.state, open: !store.state.open },
      })),
    reset: () => set((store) => ({ state: { ...initialState } })),
    add: (product) =>
      set((store) => {
        return {
          state: { open: true, products: [...store.state.products, product] },
        };
      }),
  },
}));
