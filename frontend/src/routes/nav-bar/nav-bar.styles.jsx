import styled from 'styled-components';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/prefer-default-export
export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  @media screen and (max-width: 800px) {
    height: 40px;
    margin-bottom: 20px;
    font-size: 14px;
  }
  @media screen and (max-width: 400px) {
    height: 30px;
    margin-bottom: 15px;
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
  @media screen and (max-width: 800px) {
    padding: 10px 15px 10px 15px;
  }
  @media screen and (max-width: 400px) {
    padding: 0px 15px 0px 15px;
  }
`;

export const NavLinksContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media screen and (max-width: 800px) {
    width: 80%;
    padding-top: 15px;
  }
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bolder;
`;
