import styled from "styled-components";

export enum NavBarState {
  Revenue,
  CustomerSearch,
  OrderSearch,
}

export default function NavBar(props: {
  setNavBarState: React.Dispatch<React.SetStateAction<NavBarState>>;
}): JSX.Element {
  return (
    <Bar>
      <Links>
        <Button onClick={(_) => props.setNavBarState(NavBarState.Revenue)}>
          Revenue
        </Button>
        <Button onClick={(_) => props.setNavBarState(NavBarState.CustomerSearch)}>
          Find Customer
        </Button>
        <Button onClick={(_) => props.setNavBarState(NavBarState.OrderSearch)}>
          Find Order
        </Button>
      </Links>
    </Bar>
  );
}

const Bar = styled.nav`
  position: sticky;
  top: 0px;
  width: 100%;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  background-color: grey;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  background-color: lightgrey;
  border: solid black 3px;
  border-radius: 10px;
`;

const Links = styled.ol`
  padding-top: 2px;
  padding-bottom: 2px;
  list-style-type: none;
`;

const Button = styled.li`
  font-size: 2em;
  color: white;

  font-family: Arial, Helvetica, sans-serif;
  font-size: xx-large;

  display: inline-block;

  border: solid 1px;
  padding-left: 2px;
  padding-right: 2px;
`;
