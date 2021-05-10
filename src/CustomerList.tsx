import styled from 'styled-components'
import { Customer } from './common/commonClasses'

export default function CustomerList(props: {
    customers: Array<Customer>
}): JSX.Element {
    let jsx = <></>;
    if (props.customers.length > 0) {
        jsx = props.customers[0].format_thead()
    }
    return <table>
        <thead>
            {jsx}
        </thead>
        <tbody>{
            props.customers.map(
                (customer) => customer.format_tbody()
            )
        }</tbody>
    </table>;
}