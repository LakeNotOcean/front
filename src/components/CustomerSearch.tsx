import { useState } from "react";
import styled from "styled-components";
import { Div, Input, Label, Submit } from "./StyledForms";


function queryCustomerOrders(customerId: number): any {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", '/func', false );
  xmlHttp.setRequestHeader('Cache-Control', `no-cache, no-store, must-revalidate`);
  xmlHttp.setRequestHeader('Expires', `0`);
  xmlHttp.setRequestHeader('command', `customer_orders`);
  xmlHttp.setRequestHeader('arg1', `${customerId}`);
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

function DisplayOrder(props: {order: any}): JSX.Element {
  return <tr>
    <Td>{props.order.id_order}</Td>
    <Td>{props.order.customer}</Td>
    <Td>{props.order.type}</Td>
    <Td>{props.order.date_of_delivery}</Td>
    <Td>{props.order.date_of_order}</Td>
    <Td>{props.order.delivery_type}</Td>
  </tr>;
}

function DisplayCustomerOrders(props: {orders: any}): JSX.Element {
  return <TableDiv>
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
        {props.orders.map(
          (order: any) => <DisplayOrder order={order}/>
        )}
      </tbody>
    </Table>
  </TableDiv>;
}

enum QueryState {
  Idle,
  NoCustomer,
  NoOrders,
  ConnectionFailed,
  Success,
}

function CustomerSearchForm(props: {
  setOrders: React.Dispatch<React.SetStateAction<{}>>,
  setQueryState: React.Dispatch<React.SetStateAction<QueryState>>,
}): JSX.Element {
  const [customerId, setCustomerId] = useState(1);
  return <form
    onSubmit={(e) => {
      e.preventDefault();
      for(let i = 0; i < 5; ++i) {
        console.log(i);
        try {
          const resp = queryCustomerOrders(customerId);
          // console.log(resp);
          if (!(resp && Object.keys(resp).length === 0 && resp.constructor === Object)) {
            const json = JSON.parse(resp).RESULT;
            // console.log(json);
            if (Array.isArray(json) && json.length > 0) {
              props.setOrders(json);
              props.setQueryState(QueryState.Success);
              return;
            }
            else {
              props.setQueryState(QueryState.NoOrders);
              return;
            }
          }
          else {
            props.setQueryState(QueryState.NoCustomer);
            return;
          }
        }
        catch (error) {

        }
      }
      props.setQueryState(QueryState.ConnectionFailed);
    }}
  >
    <Label htmlFor="CustomerId">Customer Id</Label>
    <Input type="number" name="CustomerId" required min="1"
    onChange={(e) => {
      setCustomerId(Number(e.target.value))
    }}
    />
    <Submit type="submit" value="Find Customer Orders" />
  </form>;
}


export default function CustomerSearch(): JSX.Element {
  const [orders, setOrders] = useState({});
  const [queryState, setQueryState] = useState(QueryState.Idle);
  let jsx = <></>;
  switch(queryState) {
    case QueryState.NoCustomer: jsx = <div>No customer with a given customer id</div>; break;
    case QueryState.NoOrders: <div>No customer with a given customer id</div>; break;
    case QueryState.NoOrders: <div>Connection Failed</div>; break;
    case QueryState.Success: jsx = <DisplayCustomerOrders orders={orders}/>; break;
  }
  return <div>
    <Div>
      <CustomerSearchForm setOrders={setOrders} setQueryState={setQueryState}/>
    </Div>
    {jsx}
  </div>;
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