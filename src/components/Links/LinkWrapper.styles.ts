import styled, { createGlobalStyle } from "styled-components";





export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-size: 16px;
    line-height: 1.5;
    background-color: #fff;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 100vh;
  width: 100%;
  color: black;
  header {
    .link-btn {
      color: black;
    }
    .link-btn::after {
      color: black;
    }
    a {
      color: gray;
    }
    a:hover {
      color: #b3b3b3;
    }
    a.active {
      color: black;
    }
    height: 70px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border: 2px solid #29203c;
    border-radius: 4px;
    background-color: white;
    .avatar-btn {
      border-radius: 50%;
      cursor: pointer;
      border: 1px solid black;
    }
    .avatar-btn:hover {
      border: 1px solid #62e200;
    }
  }

  main {
    display: flex;
    flex: 1;
    overflow: auto;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: whitesmoke;
  }

  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    display: flex;
    justify-content: space-evenly;
    border: 2px solid #29203c;
    border-radius: 4px;
    background-color: white;
  }
`;
