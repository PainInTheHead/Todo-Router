import styled from "styled-components";

export const NavButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;

  button {
    display: flex;
    justify-content: center;
    padding: 10px;
    width: 50%;
    border: none;
    border-radius: 15px;
    text-decoration: none;
    color: white;
    background: #7C7C93;
    box-shadow: 0 5px 0 #1F1F26;
    margin: 0 5px;

    &:hover {
      background: grey;
      box-shadow: none;
      position: relative;
      top: 5px;
    }
  }
`;

