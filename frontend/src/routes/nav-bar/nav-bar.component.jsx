// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import {
  NavigationContainer, LogoContainer, NavLink, NavLinksContainer,
} from './nav-bar.styles';
import { ReactComponent as TableLogo } from '../../assets/table-icon.svg';

// import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
// import { GlobalContext, UserContext } from '../../services/persistence/contexts';
// import { signOutUser } from '../../services/authentication/firebase.utils';
// import CartIcon from '../../components/cart-icon/cart-icon.component';
// import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

export default function NavBar() {
  // const { currentUser } = useContext(UserContext);
  // const { dropdownIsOpen } = useContext(GlobalContext);
  // const handleSignOut = async () => {
  //   await signOutUser();
  // };

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <TableLogo style={{ height: '100px', alignContent: 'left' }} />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">SHOP</NavLink>
          {/* {currentUser ? (
            <NavLink to="/" aria-hidden="true" onClick={handleSignOut}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon /> */}
        </NavLinksContainer>
        {/* {dropdownIsOpen && <CartDropdown />} */}
      </NavigationContainer>
      <Outlet />
    </>
  );
}
