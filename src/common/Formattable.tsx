import styled from "styled-components";

// TODO: add styling
function __format_thead(obj: Object): JSX.Element {
  return <tr>
    {Object.keys(obj).map((key) => <td>{key}</td>)}
  </tr>;
}

function __format_tbody(obj: Object): JSX.Element {
  return <tr>
    {Object.values(obj).map((val) => <td>{val}</td>)}
  </tr>;
}

function __format_li(obj: Object): JSX.Element {
  return <>
    {Object.entries(obj).map((key, _) => <li>{`${key[0]}: ${key[1]}`}</li>)}
  </>;
}


// is horizontal li really necessary?
const HorizontalLi = styled.li`
  display: inline;
`;

function __format_li_horizontal(obj: Object): JSX.Element {
  return <>
    {Object.entries(obj).map((key, _) => <HorizontalLi>{`${key[0]}: ${key[1]}`}</HorizontalLi>)}
  </>;
}

export abstract class Formattable {
  format_li(): JSX.Element {
    return __format_li(this);
  }
  format_li_horizontal(): JSX.Element {
    return __format_li_horizontal(this);
  }
  format_thead(): JSX.Element {
    return __format_thead(this);
  }
  format_tbody(): JSX.Element {
    return __format_tbody(this);
  }
}