import styled from "styled-components";

export const Total = styled.div`
  color: gray;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
  width: 50vh;
  border: 2px solid #1d55ff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 5px 5px 20px grey;
  background-color: white;
  font-size: 3vh;
  > span + span {
    margin-left: 10px;
  }
`;
