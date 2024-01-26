import styled from "styled-components";

export const Container = styled.div`
  padding: 50px;
  height: 100%;
  width: 80%;
  display: flex;
  justify-content: space-between;
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
