import React from 'react';
import { RefObject } from 'react';
import { createRef } from 'react';
import ReactDOM from 'react-dom';
import {AddData} from './addData';
import { MainPage } from './mainPage';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";
import { NavbarClass } from './Navbar';
import Footer from './Footer';
import { Category, Customer , Order} from './common/commonClasses';
import { IDataBaseController, IView } from './common/commonInterfaces';


export class frontClass implements IView {

    private _customerRef:RefObject<AddData>;
    private _orderRef:RefObject<AddData>;
    private _navBarRef:RefObject<NavbarClass>;
    private _dataBase:IDataBaseController;

    constructor(dataBase:IDataBaseController)
    {
        this._dataBase=dataBase;
        this._customerRef=createRef<AddData>();
        this._orderRef=createRef<AddData>();
        this._navBarRef=createRef<NavbarClass>();
    }
    render():void{  
      ReactDOM.render(
        <React.StrictMode>
          <Router>
            <Route exact path="/" render={()=>(
            <MainPage dataBase={this._dataBase}/>
              )}/> 
            <Route exact path="/inputData" render={()=> (
            <div>
              <AddData title={"Add Customer"} childProps={[{title:"ID",inputType:"number",errorMessage:"id exists/empty"},
                {title:"First Name",inputType:"string", errorMessage:"empty field"},
                {title:"Last Name",inputType:"string", errorMessage:"empty field"},
                {title:"Date of Birth",inputType:"date", errorMessage:"empty field"},
                {title:"Location",inputType:"string", errorMessage:"empty field"}]
              }  
              sendData={this.sendCustomerData}
              ref={this._customerRef}
              />
            <AddData title={"Add Order"} childProps={[{title:"ID",inputType:"number",errorMessage:"id exists/empty"},
                {title:"Customer",inputType:"number",errorMessage:"wrong id"},
                {title:"Model",inputType:"number",errorMessage:"empty field"},
                {title:"Order Date",inputType:"date",errorMessage:"empty field"},
                {title:"Delivery Date",inputType:"date",errorMessage:"empty field"},
                {title:"Delivery",inputType:"string",errorMessage:"empty field"}]
                }
                sendData={this.sendOrderData}
                ref={this._orderRef}
                /> 
                <Link to="/">return to main page</Link>
              </div>
            )}/>
            <Route exact path="/outputData" render={()=>(
              <div>
                <NavbarClass ref={this._navBarRef}/>
                <Footer />
                <Link to="/">return to main page</Link>
              </div>
            )}/>
         </Router>
        </React.StrictMode>,
        document.getElementById('root')
      );
    }
    
    sendCustomerData(data:Map<string,string>):void{
      this._dataBase.notifyPushCustomer(new Customer(
        +(data.get("ID") || 0),
        data.get("First Name"), data.get("lastName"), data.get("Date of Birth"),data.get("Location")
      ));
    }
    sendOrderData(data:Map<string,string>):void{
      this._dataBase.notifyPushOrder(new Order(
        +(data.get("ID") || 0),
        +(data.get("Customer") || 0), +(data.get("Model") || 0), data.get("Order Date"),data.get("Delivery Date"),
      ));
    }

    updateIdOfCustomers(data:Set<number>):void{
        this._customerRef.current?.updateExist(0,data);
        this._orderRef.current?.updateExist(1,data);
    }
    updateIdOfOrders(data:Set<number>):void{
        this._customerRef.current?.updateExist(0,data);
    }

    updateIdOfModels(data: Set<number>): void{
      
    }

    updateCustomers(data:Array<Customer>):void{
      this._navBarRef.current?.updateCustomers(data);
    }
    updateCategories(data:Array<Category>):void{
      this._navBarRef.current?.updateCategories(data);
    }
    
  }

