import styled from 'styled-components';

const AuthenticationContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 1300px;
  margin: 30px auto;
  @media screen and (max-width: 1050px) {
    flex-direction: column;
    width: 100%;
    gap: 80px;
  }
  @media screen and (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    gap:0px;
  }
`;

export default AuthenticationContainer;
