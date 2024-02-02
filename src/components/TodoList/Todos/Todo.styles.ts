import styled from "styled-components";
import Pagination from "antd/lib/pagination";

export interface ComponentProps {
  done: string;
  isedit: string;
}

export const TodosWrap = styled.ul`
  list-style-type: none;
`;

export const PaginationStyled = styled.div`
  position: absolute;
  margin-top: 10px;
  bottom: 1%;
  left: 50%;
  transform: translateX(-50%);
`;

export const TodoWrapper = styled.span<ComponentProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: gray;
  position: relative;
  list-style-type: none;
  width: 100%;
  box-shadow: 1px 5px 6px 0 #1f1f26;
  padding: 10px;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  margin: 15px auto;
  background-color: white;

  text-decoration: ${(props) => (props.done === "true" ? "line-through" : "")};
  box-shadow: ${(props) =>
    props.done === "true"
      ? "1px 5px 1px 0 #c2ffbc"
      : props.isedit === "true"
      ? "1px 5px 1px 0 #4681ee"
      : ""};

  .todo-wrapper {
    display: flex;
    align-items: center;
    width: 80%;
  }

  input {
    font-size: 20px;
    color: black;
    width: 100%;
    border: none;
    outline: none;
    font-size: 20px;
  }

  button {
    position: relative;
    display: inline-block;
    width: 3vh;
    height: 3vh;
    height: 3vh;
    margin-right: 4px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    background-color: #ffffff;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
    }
  }
`;

export const SpinWrapper = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  left: 50%;
  bottom: 20%;
  transform: translate(-50%, -50%);
`;
