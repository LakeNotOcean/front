import { useState } from "react";
import styled from "styled-components";
import { Customer, Order } from "./common/commonClasses";
import CustomerInfo from "./CustomerInfo";
import CustomerList from "./CustomerList";

const SearchDiv = styled.div`
    display: block;
	width: 350px;
	margin: 50px auto;
    padding: 10px;
    border: 3px solid black;
`;

const SearchForm = styled.form`

`;

const SearchLabel = styled.label`
    display: block;
`;

const SearchInput = styled.input`
    display: block;
`;

export default function CustomerSearch(props: {
    customers: Array<Customer> // TODO: change to something sane later?
}): JSX.Element {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [foundCustomers, setFoundCustomers] = useState(new Array<Customer>());
    let jsx = <></>;
    if (foundCustomers.length === 0) {
        jsx = <>No customers matching full name found.</>;
    }
    else if (foundCustomers.length === 1) {
        jsx = <CustomerInfo customer={foundCustomers[0]} orders={new Array<Order>()} />;
    }
    else {
        jsx = <CustomerList customers={foundCustomers}/>;
    }
    return <SearchDiv>
        <SearchForm onSubmit={
            (e) => {
                e.preventDefault();
                setFoundCustomers(
                    props.customers.filter(c => c.firstName === firstName && c.lastName === lastName)
                );
            }
        }>
            <SearchLabel htmlFor="firstName">Имя:</SearchLabel>
            <SearchInput type="text" name="firstName" onChange={(e) => setFirstName(e.target.value)}/>
            <SearchLabel htmlFor="lastName">Фамилия:</SearchLabel>
            <SearchInput type="text" name="lastName" onChange={(e) => setLastName(e.target.value)}/>
            <input type="submit" value="Искать" />
        </SearchForm>
        <div>{jsx}</div>
    </SearchDiv>;
}