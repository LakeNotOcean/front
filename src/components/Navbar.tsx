import styled from "styled-components";

export enum NavBarState {
  Revenue,
  CustomerSearch,
  OrderSearch,
}

export default function NavBar(props: {
  navBarState: NavBarState,
  setNavBarState: React.Dispatch<React.SetStateAction<NavBarState>>;
}): JSX.Element {
  return (
    <Bar>
      <Links>
        <Button
          selected={props.navBarState === NavBarState.Revenue}
          onClick={(_) => props.setNavBarState(NavBarState.Revenue)}
        >
          Revenue
        </Button>
        <Button
          selected={props.navBarState === NavBarState.CustomerSearch}
          onClick={(_) => props.setNavBarState(NavBarState.CustomerSearch)}
        >
          Find Customer
        </Button>
        <Button
          selected={props.navBarState === NavBarState.OrderSearch}
          onClick={(_) => props.setNavBarState(NavBarState.OrderSearch)}
        >
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

// const Logo = styled.img`
//   width: 50px;
//   height: 50px;
//   background-color: lightgrey;
//   border: solid black 3px;
//   border-radius: 10px;
// `;

const Links = styled.ol`
  padding-top: 2px;
  padding-bottom: 2px;
  list-style-type: none;
`;

const Button = styled.li<{selected: boolean}>`
  font-size: 2em;
  color: ${props => props.selected ? "white" : "white"};
  background-color: ${props => props.selected ? "#444" : "grey"};
  cursor: default;

  font-family: Arial, Helvetica, sans-serif;
  font-size: xx-large;

  display: inline-block;

  border: solid 1px;
  padding-left: 2px;
  padding-right: 2px;
  &:hover {
    color: white;
    background-color: #555;
  }
`;
