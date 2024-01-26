import styled from "styled-components";

export const Container = styled.div`
width: 500px;
margin: 30vh auto;
  border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 1px 10px 0 #1f1f26;
  .btn-group {
    display: flex;
    width: 100%;
    margin-bottom: 40px;
    border-bottom: 1px solid black;
    button {
      border: none;
      height: 30px;
      width: 100%;
      cursor: pointer;
      font-size: 15px;
    }

    .active {
      background-color: #0062f3;
      color: white;
    }
  }

  .logholder {
    padding: 30px;
    button {
      background-color: #0062f3;
    }
  }
`;
