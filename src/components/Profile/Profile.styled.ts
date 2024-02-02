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
  width: 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .test {
    background-color: gray;
    color: white;
    &:hover {
      background-color: black;
    }
  }
  .avatar {
    display: flex;
    flex-direction: column;
    .btn {
      margin: 30px 0;
      width: 100%;
    }
  }
  .aboutTodos {
    .list {
      padding: 0;
      list-style: none;
    }
    .list li {
      height: 70px;
      padding: 20px 30px;
      background: linear-gradient(to left, #efefef 0%, #fff, #efefef);
      border: 2px solid #83a2ff;
      border-radius: 10px;
      color: #506a6b;
      box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.2);
      margin-bottom: 5px;
      text-align: center;
      font-size: 20px;
      background-size: 100% 100%;
      z-index: 1;
    }

    .list li:not(:last-child) {
      margin-bottom: 30px;
    }
    .list li:hover {
      border: 2px solid #1d55ff;
    }
    .list li:before {
      content: "";
      position: absolute;
      width: 0;
      height: 100%;
      top: 50%;
      left: 50%;
      background: linear-gradient(to left, #e2f0fa 0%, #fff, #e2f0fa);
      opacity: 0;
      -webkit-transform: translateX(-50%) translateY(-50%);
      -moz-transform: translateX(-50%) translateY(-50%);
      -ms-transform: translateX(-50%) translateY(-50%);
      transform: translateX(-50%) translateY(-50%);
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      transition: all 0.3s;
      z-index: -1;
    }
    .list li:hover:before {
      width: 100%;
      opacity: 1;
    }
  }
`;
