import { useState } from "react";
import styled from "styled-components";
import { validate } from "./net";
import { Div, Input, Label, Submit } from "./StyledForms";

function queryRevenue(orderId: number, start: string, end: string): XMLHttpRequest {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "/func", false);
  xmlHttp.setRequestHeader(
    "Cache-Control",
    `no-cache, no-store, must-revalidate`
  );
  xmlHttp.setRequestHeader("Expires", `0`);
  xmlHttp.setRequestHeader("command", `sum_for_period`);
  xmlHttp.setRequestHeader("arg1", `${orderId}`);
  xmlHttp.setRequestHeader("arg2", `${start.replaceAll("-", "/")}`);
  xmlHttp.setRequestHeader("arg3", `${end.replaceAll("-", "/")}`);
  xmlHttp.send(null);
  return xmlHttp;
  // return xmlHttp.responseText;
}

enum Result {
  Idle,
  DateOrderError,
  Success,
  ConnectionFailed,
}

function RevenueForm(props: {
  orderId: number;
  startDate: string;
  endDate: string;
  setRevenue: React.Dispatch<React.SetStateAction<number>>;
  setOrderId: React.Dispatch<React.SetStateAction<number>>;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  setResult: React.Dispatch<React.SetStateAction<Result>>;
}): JSX.Element {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (new Date(props.startDate) > new Date(props.endDate)) {
          props.setResult(Result.DateOrderError);
        }
        for (let i = 0; i < 3; ++i) {
          console.log(i);
          try {
              const resp = queryRevenue(
                Number(props.orderId),
                props.startDate,
                props.endDate
              );

              if (
                validate(resp)
              ) {
                const json = JSON.parse(resp.responseText).RESULT;
                if (json !== null && json !== '') {
                  const num = Number(json);
                  if (!isNaN(num)) {
                    props.setRevenue(num);
                    props.setResult(Result.Success);
                    return;
                  }
                }
              }
          } catch (error) {
            // fml
          }
        }
        props.setResult(Result.ConnectionFailed);
      }}
    >
      <div>
        <Label htmlFor="OrderId">Model</Label>
        <Input
          type="number"
          name="OrderId"
          min="1"
          max={Math.pow(2, 31) - 1}
          required
          onChange={(e) => props.setOrderId(Number(e.target.value))}
        />
      </div>
      <div>
        <Label htmlFor="From">From</Label>
        <Input
          type="date"
          name="From"
          required
          onChange={(e) => props.setStartDate(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="To">To</Label>
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
  const [revenue, setRevenue] = useState(NaN);
  const [result, setResult] = useState(Result.Idle);

  const [orderId, setOrderId] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  let jsx = <></>;
  switch (result) {
    case Result.DateOrderError: jsx = <div>Dates should be ordered correctly!</div>; break;
    case Result.ConnectionFailed:
      jsx = (
        <div>
          <hr />
          Connection Failed
        </div>
      );
      break;
    case Result.Success:
      jsx = (
        <div>
          <hr />
          <Rev>{revenue}</Rev>Revenue for period
          <br />
          <Span>from</Span>
          {startDate}
          <br />
          <Span>to</Span>
          {endDate} <br />
          for Model {orderId}
        </div>
      );
  }
  return (
    <Div>
      <RevenueForm
        startDate={startDate}
        endDate={endDate}
        orderId={orderId}
        setResult={setResult}
        setRevenue={setRevenue}
        setOrderId={setOrderId}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
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
