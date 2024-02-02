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

  .Spin{
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
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
      cursor: pointer;
      background-color: white;
      border: none;
      color: black;
      height: 60px;
      width: 60px;
    }
    .link-btn::after {
      color: black;
    }
    a {
      text-decoration: none;
      color: gray;
    }
    a:hover {
      color: #b3b3b3;
    }
    a.active {
      color: gray;
    }
    height: 70px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-bottom: 2px solid #1d55ff;
    background-color: white;
    .avatar-btn {
      border-radius: 50%;
      cursor: pointer;
      border: 1px solid #5580ff;
    }
    .avatar-btn:hover {
      border: 1px solid #1d55ff;
    }
  }

  main {
    display: flex;
    flex: 1;
    overflow: auto;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
  }

  footer {
    color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    display: flex;
    justify-content: space-evenly;
    border-top: 2px solid #1d55ff;
    background-color: white;
  }
`;
