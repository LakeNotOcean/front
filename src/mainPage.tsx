import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {  IDataBaseController} from './common/commonInterfaces';


export interface mainPageProps{
    dataBase:IDataBaseController;
}

export class mainPage extends Component<mainPageProps>{
    render(){
    return(
        <div>
            <h3>Welcome to the store database</h3>
            <small>Main Page</small>
            <Link to="/inputData" onClick={__=>{
                this.props.dataBase.notifyGetIdOfCustomers();
                this.props.dataBase.notifyGetIdOfOrders()}}>Add some data</Link>
            <Link to="/outputData" onClick={_=>{
                this.props.dataBase.notifyGetListOfCustomers();}}>Find some data</Link>
        </div>)
    }
}
