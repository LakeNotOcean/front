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
  display: block;
  padding: 0.5em;
	color: black;
	background-color: lightgrey;

  border: 2px solid black;
	border-radius: 3px;

	width: 80%;
	margin-bottom: 0.5em;
`;

export const Submit = styled.input`
  background-color: grey;
  color: white;

  border: 2px solid black;
	border-radius: 3px;

  font-family: Arial, Helvetica, sans-serif;
  font-size: xx-large;
`;