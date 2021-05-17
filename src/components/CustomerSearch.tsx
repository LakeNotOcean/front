import { useState } from "react";
import styled from "styled-components";
import { validate } from "./net";
import { Div, Input, Label, Submit } from "./StyledForms";

function queryCustomerOrders(customerId: number): XMLHttpRequest {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "/func", false);
  xmlHttp.setRequestHeader(
    "Cache-Control",
    `no-cache, no-store, must-revalidate`
  );
  xmlHttp.setRequestHeader("Expires", `0`);
  xmlHttp.setRequestHeader("command", `customer_orders`);
  xmlHttp.setRequestHeader("arg1", `${customerId}`);
  xmlHttp.send(null);
  return xmlHttp;
}

// const axios = require('axios');

// async function queryOrdersAsyncImpl(customerId: number) {
//   const resp = await axios.get('/func', {
//     headers: {
//       'Cache-Control': 'no-cache, no-store, must-revalidate',
//       "Expires": '0',
//       "command": `customer_orders`,
//       "arg1": `${customerId},`
//     }
// }

// async function queryOrdersAsync(customerId: number) {
//   for(let i = 0; i < 5; ++i) {
//     try {
//         return await queryOrdersAsyncImpl()
//       });
//     } catch {}
//   }
// }

function DisplayOrder(props: { order: any }): JSX.Element {
  return (
    <tr>
      <Td>{props.order.id_order}</Td>
      <Td>{props.order.customer}</Td>
      <Td>{props.order.type}</Td>
      <Td>{props.order.date_of_delivery}</Td>
      <Td>{props.order.date_of_order}</Td>
      <Td>{props.order.delivery_type}</Td>
    </tr>
  );
}

function DisplayCustomerOrders(props: { orders: any }): JSX.Element {
  return (
    <TableDiv>
      <Table>
        <thead>
          <tr>
            <Th>Order Id</Th>
            <Th>Customer</Th>
            <Th>Type</Th>
            <Th>Date of delivery</Th>
            <Th>Date of order</Th>
            <Th>Delivery Type</Th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((order: any) => (
            <DisplayOrder order={order} />
          ))}
        </tbody>
      </Table>
    </TableDiv>
  );
}

enum Result {
  Idle,
  NoCustomer,
  NoOrders,
  ConnectionFailed,
  Success,
}

function CustomerSearchForm(props: {
  setCustomerId: React.Dispatch<React.SetStateAction<number>>;
  setOrders: React.Dispatch<React.SetStateAction<{}>>;
  setResult: React.Dispatch<React.SetStateAction<Result>>;
}): JSX.Element {
  const [customerId, setCustomerId] = useState(1);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        for (let i = 0; i < 5; ++i) {
          console.log(i);
          try {
            const resp = queryCustomerOrders(customerId);
            // console.log(resp);
            if (
              validate(resp)
            ) {
              const json = JSON.parse(resp.responseText).RESULT;
              // console.log(json);
              if (Array.isArray(json) && json.length > 0) {
                props.setOrders(json);
                props.setResult(Result.Success);
                return;
              } else {
                props.setResult(Result.NoOrders);
                props.setCustomerId(customerId);
                return;
              }
            }
          } catch (error) {}
        }
        props.setResult(Result.ConnectionFailed);
      }}
    >
      <Label htmlFor="CustomerId">Customer Id</Label>
      <Input
        type="number"
        name="CustomerId"
        required
        min="1"
        max={Math.pow(2, 31) - 1}
        onChange={(e) => {
          setCustomerId(Number(e.target.value));
        }}
      />
      <Submit type="submit" value="Find Customer Orders" />
    </form>
  );
}

export default function CustomerSearch(): JSX.Element {
  const [customerId, setCustomerId] = useState(1);
  const [orders, setOrders] = useState({});
  const [result, setResult] = useState(Result.Idle);
  let jsxFail = <></>;
  let jsxSuccess = <></>;
  switch (result) {
    case Result.NoCustomer:
      jsxFail = <div>No customer with the given id</div>;
      break;
    case Result.NoOrders:
      jsxFail = <div>No orders for the given customer id={customerId}</div>;
      break;
    case Result.ConnectionFailed:
      jsxFail = <div>Connection Failed</div>;
      break;
    case Result.Success:
      jsxSuccess = <DisplayCustomerOrders orders={orders} />;
      break;
  }
  return (
    <div>
      <Div>
        <CustomerSearchForm
          setCustomerId={setCustomerId}
          setOrders={setOrders}
          setResult={setResult}
        />
      {jsxFail}
      </Div>
      {jsxSuccess}
    </div>
  );
}

const TableDiv = styled.div`
  /* display: block;
  margin-top: auto;

  padding: 10px;
  border: 3px solid black;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px; */
`;

const Table = styled.table`
  margin-left: auto;
  margin-right: auto;
  border: 3px solid black;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid black;
`;

const Td = styled.td`
  border: 1px solid black;
`;
