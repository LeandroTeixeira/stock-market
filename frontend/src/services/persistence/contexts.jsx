import { createContext } from 'react';

export const GlobalContext = createContext({
  categories: [],
  cartItems: [],
  total: 0,
  dropdownIsOpen: false,
  setDropdownIsOpen: () => null,
  toggleDropdown: () => null,
  addCartItem: () => null,
  decreaseCartItem: () => null,
  removeCartItem: () => null,
  getCartItem: () => null,
  setTotal: () => null,
});

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const ShopContext = createContext({
  categoriesMap: [],
  setCategoriesMap: () => null,
});
