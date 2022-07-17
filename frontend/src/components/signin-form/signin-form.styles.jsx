import styled from 'styled-components';

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  h2 {
    margin: 10px 0;
  }
  @media screen and (max-width: 1050px) {
    width: 95%;
    margin: auto;
    h2,
    span {
      margin: auto;
    }
    h2 {
      font-size: 1.65em;
      text-align: center;
    }
    span {
      font-size: 1.05em;
      text-align: center;
    }
    button {
      width: 48%;
      font-size: 18px;  
    }
  }
  @media screen and (max-width: 800px) {
    width: 95%;
    margin: auto;
    h2,
    span {
      margin: auto;
    }
    h2 {
      font-size: 1.5em;
      text-align: center;
    }
    span {
      font-size: 1.05em;
      text-align: center;
    }
    form {
      margin: 25px 0px;
    }
  }
  @media screen and (max-width: 400px) {
    button {
      font-size: 14px;
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    justify-content: space-around;
    margin-top: -15px;
  }
`;
