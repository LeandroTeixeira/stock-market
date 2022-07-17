import styled from 'styled-components';

export const SignUpContainer = styled.div`
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
      width: 100%;
      font-size: 20px;
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
      font-size: 0.9em;
      text-align: center;
      margin-bottom: 10px;
    }
    button {
      width: 100%;
      font-size: 20px;
    }
    form {
      margin: 25px 0px;
    }
  }
  
`;

export const Message = styled.div`
  margin-top: -10px;
  margin-bottom: 30px;
  font-weight: 550;
  text-align: center;
  font-size: 0.9em;
  @media screen and (max-width: 1050px) {
    font-size: 1em;
    font-weight: 750;
  }
  @media screen and (max-width: 800px) {
    margin-top: -15px;
  }
  @media screen and (max-width: 600px) {
    margin-top: -25px;
  }
`;

export const SignInButton = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Error = styled(Message)`
  color: red;
`;

export const Success = styled(Message)`
color:green;
`;
