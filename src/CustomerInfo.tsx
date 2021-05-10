import styled from 'styled-components'
import { Customer, Order } from './common/commonClasses'


const CustomerInfoDiv = styled.div`
    display: block;
	width: 300px;
	margin: 50px auto;
    padding: 10px;
    border: 3px solid black;
`;

const OrderDiv = styled.div`
    margin: 10px;
`;

export default function CustomerInfo(
    props: { customer: Customer, orders: Array<Order> } // TODO: make parameters sane
): JSX.Element {
    return <CustomerInfoDiv>
        Customer:
        <ul>
            {props.customer.format_li()}
        </ul>
        Orders:
        <ul>
            {props.orders.map(
                (order) => <OrderDiv>{order.format_li()}</OrderDiv>
            )}
        </ul>
    </CustomerInfoDiv>;
}