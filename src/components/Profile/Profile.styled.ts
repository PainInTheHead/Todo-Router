import { Button } from "antd";
import styled from "styled-components";

// export const StyledButton = styled(Button)`
//   background-color: gray;
//   color: white;
//   &:hover {
//     background-color: black;
//     color: white;
//     border:1px solid black;
//   }
// `;

export const Container = styled.div`
  padding: 50px;
  height: 100%;
  width: 80%;
  display: flex;
  justify-content: space-between;

  .test {
    background-color: gray;
    color: white;
    &:hover {
      background-color: black;
    }
  }
  .aboutUser {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    height: 100%px;
    .avatar {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
      Button{
        background-color:gray;
        color: white;
      }
      Button:hover{
        background-color:black;
        color: white;
        border: 1px solid white;
      }
    }
    .info {
      ul {
        li {
          margin: 0 10px;
          flex: 1;
        }
      }
    }
  }

  .aboutTodos {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    li {
      margin: 0 10px;
      flex: 1;
    }
  }
`;
