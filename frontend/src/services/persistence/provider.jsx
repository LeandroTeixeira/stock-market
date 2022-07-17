/* eslint-disable import/no-extraneous-dependencies */
/* disable  import/no-extraneous-dependencies */
import { node } from 'prop-types';
import React, {
  useMemo, useState, useEffect,
} from 'react';
import { GlobalContext, UserContext, ShopContext } from './contexts';
import globalData from '../data/globalData';
import defaultCartItem from '../utils';

// Data for User Context
let [currentUser, setCurrentUser] = [{}, (user) => { currentUser = user; }];

// Data for Global Context
let [dropdownIsOpen, setDropdownIsOpen] = [false, (value) => { dropdownIsOpen = value; }];
let [cartItems, setCart] = [[], (items) => { cartItems = items; }];
let [total, setTotal] = [0, (tot) => { total = tot; }];

const setCartItems = (items) => {
  setCart(items);
  localStorage.setItem('cart', JSON.stringify(items));
};

const toggleDropdown = () => { setDropdownIsOpen(!dropdownIsOpen); };

const addCartItem = (item) => {
  let updatedItem = cartItems.find((e) => e.id === item.id);
  if (updatedItem) {
    updatedItem.qtd += 1;
    setCartItems([...cartItems]);
  } else {
    updatedItem = { ...defaultCartItem, ...item };
    setCartItems([...cartItems, updatedItem]);
  }
  setTotal(total + item.price);
};

const removeCartItem = (item) => {
  const filteredCart = cartItems.filter((e) => e.id !== item.id);
  const newTotal = filteredCart.reduce(
    (acc, current) => acc + current.qtd * current.price,
    0,
  );
  setCartItems(filteredCart);
  setTotal(newTotal);
};

const decreaseCartItem = (item) => {
  const updatedItem = cartItems.find((e) => e.id === item.id);
  if (!updatedItem) return;
  if (updatedItem.qtd === 1) removeCartItem(item);
  else {
    updatedItem.qtd -= 1;
    setTotal(total - item.price);
    setCartItems([...cartItems]);
  }
};

// Data for Shop Context
let [categoriesMap, setCategoriesMap] = [
  [],
  (value) => {
    categoriesMap = value;
  },
];
const setShopContextData = () => ({
  categoriesMap,
  setCategoriesMap,
});

// Definition of the AuthListener and Unsubscribe function
// eslint-disable-next-line no-unused-vars
const AuthListener = async (user) => user;
// if (user) await createUserDocumentFromAuth(user);
// setCurrentUser(user);

const setAuthListener = () => {
  // const unsubscribe = onAuthStateChangeListener(AuthListener);
  // return unsubscribe;
};

// Provider used, combines all contexts into a single provider.
export default function Provider({ children }) {
  // Setting the auth listener and configuring the unsubscribe function to run at unmount
  useEffect(setAuthListener, []);
  [currentUser, setCurrentUser] = useState(null);

  const setUserContextData = () => ({
    currentUser,
    setCurrentUser,
  });
  const userContextData = useMemo(
    setUserContextData,
    [currentUser, setCurrentUser],
  );

  // Data for Global Context
  [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  [cartItems, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  [total, setTotal] = useState(() => (cartItems.reduce(
    (acc, current) => acc + current.qtd * current.price,
    0,
  )));

  const setGlobalContextData = () => ({
    ...globalData,
    dropdownIsOpen,
    setDropdownIsOpen,
    toggleDropdown,
    cartItems,
    setCartItems,
    addCartItem,
    removeCartItem,
    decreaseCartItem,
    total,
    setTotal,
  });
  const globalContextData = useMemo(setGlobalContextData, [
    globalData,
    dropdownIsOpen,
    setDropdownIsOpen,
    toggleDropdown,
    cartItems,
    setCartItems,
    addCartItem,
    removeCartItem,
    decreaseCartItem,
    total,
    setTotal,
  ]);

  // Data for Shop Context
  [categoriesMap, setCategoriesMap] = useState({});
  // useEffect(() => {
  //  addCollectionAndDocuments('categories', SHOP_DATA);
  // }, []);

  useEffect(() => {
    const getCategories = async () => {
      const categoryMap = 2; // await getCategoriesAndDocuments('categories');
      // console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };
    getCategories();
  }, []);

  const shopContextData = useMemo(setShopContextData, [
    categoriesMap,
    setCategoriesMap,
  ]);

  return (
    <UserContext.Provider value={userContextData}>
      <ShopContext.Provider value={shopContextData}>
        <GlobalContext.Provider value={globalContextData}>
          {children}
        </GlobalContext.Provider>
      </ShopContext.Provider>
    </UserContext.Provider>
  );
}

Provider.propTypes = {
  children: node,
};
Provider.defaultProps = {
  children: '',
};
