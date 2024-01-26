import styled from "styled-components";

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
  width: 50vh;
  border: 2px solid black;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 5px 5px 20px grey;
  background-color: white;
  font-size: 3vh;
  > span + span {
    margin-left: 10px;
  }
`;