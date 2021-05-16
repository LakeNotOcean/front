import { useState } from "react";
import styled from "styled-components";
import { Div, Input, Label, Submit } from "./StyledForms";

function queryOrder(orderId: number): any {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", '/func', false );
  xmlHttp.setRequestHeader('Cache-Control', `no-cache, no-store, must-revalidate`);
  xmlHttp.setRequestHeader('Expires', `0`);
  xmlHttp.setRequestHeader('command', `order_info`);
  // console.log("order id:", orderId.toString());
  xmlHttp.setRequestHeader('arg1', `${orderId}`);
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

enum Result {
  NoOrder,
  ConnectionFailed,
  Success,
  Idle
}


function SearchForm(
  props: {
    orderId: number,
    setOrderId: React.Dispatch<React.SetStateAction<number>>,
    setOrder: React.Dispatch<React.SetStateAction<{}>>,
    setResult: React.Dispatch<React.SetStateAction<Result>>,
  }
): JSX.Element {
  return <form
    onSubmit={(e) => {
      e.preventDefault();

      // if ('' !== orderId && Number.isInteger(Number(orderId)) && Number(orderId) >= 0) {
        // console.log("submitted", (Number(orderId)).toString());

        // why the hell ???
        // funnily enough JSON can be {} and {RESULT:[]}
        for(let i=0; i < 5; ++i) {
            console.log(i);
            try {
              const resp = queryOrder(Number(props.orderId));
              if (!(resp && Object.keys(resp).length === 0 && resp.constructor === Object)) {
                const json = JSON.parse(resp).RESULT;
                console.log(json);
                if (json.length > 0) {
                  props.setOrder(json[0]);
                  props.setResult(Result.Success);
                  return;
                }
                else {
                  props.setResult(Result.NoOrder);
                  return;
                }
              }
            }
            catch(error) {
              //
            }
        }
        props.setResult(Result.ConnectionFailed);
        return;
      // }
      // else {
      //   props.setResult(Result.InvalidId);
      // }
    }}
  >
  <div>
  <Label htmlFor="OrderId">Order Id
  </Label>
  <Input
    type="number"
    name="OrderId"
    required
    min="1"
    onChange={(e) => props.setOrderId(Number(e.target.value))}
  />
  </div>
  <div>
  <Submit type="submit" value="Find Order" />
  </div>
</form>;
}

function DisplayOrder(props: {order: any}): JSX.Element {
  return <div>
    <hr/>
    {/* <ul> */}
      <Li key="orderId">Order Id: {props.order.id_order}</Li>
      <Li key="customer">Customer: {props.order.customer}</Li>
      <Li key="type">Model: {props.order.type}</Li>
      <Li key="dateOfDelivery">Date of delivery: {props.order.date_of_delivery}</Li>
      <Li key="dateOfOrder">Date of order: {props.order.date_of_order}</Li>
      <Li key="deliveryType">Delivery Type: {props.order.delivery_type}</Li>
    {/* </ul> */}
  </div>;
}

export default function OrderSearch(): JSX.Element {
  const [order, setOrder] = useState({});
  const [orderId, setOrderId] = useState(1);
  const [result, setResult] = useState(Result.Idle);
  let jsx = <></>;
  switch(result) {
    case Result.Success: jsx = <DisplayOrder order={order}/>; break;
    case Result.NoOrder: jsx = <div><hr/>No order with id={orderId}</div>; break;
    case Result.ConnectionFailed: jsx = <div><hr/>Connection Failed</div>; break;
    // case Result.InvalidId: jsx = <>Invalid Id</>; break;
  }
  return (
    <Div>
      <SearchForm orderId={orderId} setOrderId={setOrderId} setOrder={setOrder} setResult={setResult}/>
      {jsx}
    </Div>
  );
}


const Li = styled.span`
  display: block;

  border: 2px solid black;
	border-radius: 3px;

  list-style-type: none;
  background-color: lightgrey;
`;