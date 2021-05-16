import { useState } from "react";
import styled from "styled-components";
import { Div, Input, Label, Submit } from "./StyledForms";



function queryRevenue(orderId: number, start: string, end: string): string {
  // stringly typed, beautiful
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "/func", false);
  xmlHttp.setRequestHeader('Cache-Control', `no-cache, no-store, must-revalidate`);
  xmlHttp.setRequestHeader('Expires', `0`);
  xmlHttp.setRequestHeader("command", `sum_for_period`);
  xmlHttp.setRequestHeader("arg1", `${orderId}`);
  xmlHttp.setRequestHeader("arg2", `${start.replaceAll('-', '/')}`);
  xmlHttp.setRequestHeader("arg3", `${end.replaceAll('-', '/')}`);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}


enum Result {
  Idle,
  Success,
  ConnectionFailed,
}

function RevenueForm(props: {
  orderId: number,
  startDate: string,
  endDate: string,
  setRevenue: React.Dispatch<React.SetStateAction<string>>,
  setOrderId: React.Dispatch<React.SetStateAction<number>>,
  setStartDate: React.Dispatch<React.SetStateAction<string>>,
  setEndDate: React.Dispatch<React.SetStateAction<string>>,
  setResult: React.Dispatch<React.SetStateAction<Result>>,
}): JSX.Element {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        for(let i = 0; i < 3; ++i) {
          console.log(i);
          try {
            if (Number.isInteger(Number(props.orderId)) && Number(props.orderId) >= 1) { // no longer necessary?
              // console.log("submitted", (Number(props.orderId)).toString());
              const resp = queryRevenue(Number(props.orderId), props.startDate, props.endDate);
              if (!(resp && Object.keys(resp).length === 0 && resp.constructor === Object) && Number.isInteger(Number(resp))) {
                props.setRevenue(JSON.parse(resp).RESULT);
                props.setResult(Result.Success);
                return;
              }
              // console.log(resp);
            }
          }
          catch (error) {
            // fml
          }
        }
        props.setResult(Result.ConnectionFailed);
      }}
    >
      <div>
      <Label htmlFor="OrderId">Model
      </Label>
      <Input
        type="number"
        name="OrderId"
        min="1"
        required
        onChange={(e) => props.setOrderId(Number(e.target.value))}
      />
      </div>
      <div>
      <Label htmlFor="From">From
      </Label>
      <Input
        type="date"
        name="From"
        required
        onChange={(e) => props.setStartDate(e.target.value)}
      />
      </div>
      <div>
      <Label htmlFor="To">To
      </Label>
      <Input
        type="date"
        name="To"
        required
        onChange={(e) => props.setEndDate(e.target.value)}
      />
      </div>
      <Submit type="submit" value="Get Revenue" />
    </form>
  );
}


//orderId == orderType
export default function Revenue(): JSX.Element {
  const [revenue, setRevenue] = useState("");
  const [result, setResult] = useState(Result.Idle);

  const [orderId, setOrderId] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  let jsx = <></>;
  switch(result) {
    case Result.ConnectionFailed: jsx = <div><hr/>Connection Failed</div>; break;
    case Result.Success: jsx = <div><hr/><Rev>{revenue}</Rev>Revenue for period<br/><Span>from</Span>{startDate}<br/><Span>to</Span>{endDate} <br/>for Model {orderId}</div>;
  }
  return (
    <Div>
      <RevenueForm startDate={startDate} endDate={endDate} orderId={orderId} setResult={setResult} setRevenue={setRevenue} setOrderId={setOrderId} setStartDate={setStartDate} setEndDate={setEndDate}/>
      {jsx}
    </Div>
  );
}

const Span = styled.span`
  display: inline-block;
  font-family: monospace;
  width: 3em;
  background-color: lightgrey;
`;

const Rev = styled.div`
  font-size: 50px;
  color: green;
  font-family: monospace;
`;