import styled from "styled-components";

export const Div = styled.div`
  display: block;
  width: 350px;
  margin: 50px auto;
  padding: 10px;
  border: 2px solid black;
  border-radius: 3px;

  font-family: Arial, Helvetica, sans-serif;
  font-size: xx-large;
`;

export const Label = styled.label`
  background-color: lightgrey;

  border: 2px solid black;
  border-radius: 3px;

  width: 80%;
`;

export const Input = styled.input`
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;

  display: block;
  padding: 0.5em;
  color: black;
  background-color: lightgrey;

  border: 2px solid black;
  border-radius: 3px;

  width: 80%;
  margin-bottom: 0.5em;

  &:hover {
    background-color: #ddd;
    outline-style: groove;
    outline-color: black;
    outline-offset: 1px;
  }
  &:focus {
    outline-style: groove;
    outline-color: black;
    outline-offset: 4px;
    background-color: #eee;
  }
`;

export const Submit = styled.input`
  background-color: grey;
  color: white;

  border: 2px solid black;
  border-radius: 3px;

  font-family: Arial, Helvetica, sans-serif;
  font-size: xx-large;

  &:hover {
    background-color: #333;
    /* border: 2px solid white; */
    outline-style: groove;
    outline-color: black;
    outline-offset: 1px;
  }
  &:active {
    background-color: #222;
    /* border: 2px solid white; */
    outline-style: groove;
    outline-color: black;
    outline-offset: 1px;
  }
`;
