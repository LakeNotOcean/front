import { Component } from 'react';
import styled from 'styled-components'
import { Category, Customer } from './common/commonClasses';
import { IFrontHandler } from './common/commonInterfaces';
import CustomerSearch from './CustomerSearch';
import logo from './logo.svg'
import PerItemRevenueInfo from './PerCategoryRevenueInfo';


const Bar = styled.nav`
    position: sticky;
    top: 0px;
    width: 100%;

    display: flex;
    justify-content: space-evenly;
    align-items: center;

    background-color: grey;
`;

const Logo = styled.img`
    width: 50px;
    height: 50px;
    background-color: lightgrey;
    border: solid black 3px;
    border-radius: 10px;
`;

const Links = styled.ol`
    padding-top: 2px;
    padding-bottom: 2px;
    list-style-type: none;
`;

const Button = styled.li`
    font-size: 2em;
    color: white;

    display: inline-block;

    border: solid 1px;
    padding-left: 2px;
    padding-right: 2px;
`;

// export default function Navbar(props: {
//     setView: (arg0: JSX.Element) => void;
// }): JSX.Element {
//     const alice = new Customer(
//         123, "Alice", "Alice", "27.18.2818", "Nowhere"
//     );
//     const bob = new Customer(
//         321, "Bob", "Bob", "27.18.2818", "Nowhere"
//     );
//     const customers = [alice, alice, bob];
//     const item = new Item(1,"wand", -3.14, -3.14);
//     const items = [item, item, item];
//     const category = new Category(1, "tudums");
//     const categories = [category, category];
//     return <Bar>
//         <Logo src={logo}/>
//         <Links>
//             <Button>Каталог</Button>
//             <Button>Корзина</Button>
//             <Button onClick={_ => props.setView(<CustomerSearch customers={customers}/>)}>Поиск клиента по имени</Button>
//             <Button onClick={_ => props.setView(<PerItemRevenueInfo categories={categories}/>)}>Прибыль по товарам</Button>
//         </Links>
//         <Links>
//             <Button>Вход</Button>
//             <Button>Регистрация</Button>
//         </Links>
//     </Bar>
// }

export interface NavBarProps{
    dataBaseContr:IFrontHandler;
}

interface NavBarState{
    isCustomSeach:boolean;
    isPerItemRev:boolean;
}


export class NavbarClass extends Component<NavBarProps,NavBarState>{

    private _dataCust:Array<Customer>;
    private _dataCategory:Array<Category>;

    constructor(props:NavBarProps){
        super(props)
        this.state={isCustomSeach:false,isPerItemRev:false}
        this._dataCust=new Array<Customer>();
        this._dataCategory=new Array<Category>();
        this.updateCustomers=this.updateCustomers.bind(this);
        this.updateCategories=this.updateCategories.bind(this);
        this.displayCustomSeach=this.displayCustomSeach.bind(this);
        this.displayPerItemRev=this.displayPerItemRev.bind(this);
    }

    componentDidMount(){
        console.log("component is mounted");
        //this.props.dataBaseContr.notify([NotifyType.listOfCust]);
    }
    componentDidUpdate(){
        console.log("component is mounted");
        //this.props.dataBaseContr.notify([NotifyType.listOfCust]);
    }

    updateCustomers(data:Array<Customer>):number{
        console.log("updateCustomers in NavBAr is called");
        this._dataCust=data;
        return 0;
    }

    updateCategories(data:Array<Category>):void{
        this._dataCategory=data;
    }
    render(){
        return(<Bar>
        <Logo src={logo}/>
        <Links>
            <Button>Каталог</Button>
            <Button>Корзина</Button>
            <Button onClick={this.displayCustomSeach}>Поиск клиента по имени</Button>
            <Button onClick={this.displayPerItemRev}>Прибыль по товарам</Button>
            {this.state.isCustomSeach?<CustomerSearch customers={this._dataCust}/>:null}
            {this.state.isPerItemRev?<PerItemRevenueInfo categories={this._dataCategory}/>:null}
        </Links>
        <Links>
            <Button>Вход</Button>
            <Button>Регистрация</Button>
        </Links>
    </Bar>)
    }
    displayCustomSeach():void{
        this.setState({isCustomSeach:!this.state.isCustomSeach});
    }
    displayPerItemRev():void{
        this.setState({isPerItemRev:!this.state.isPerItemRev});
    }

}