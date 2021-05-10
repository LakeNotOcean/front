import React from 'react';
import { RefObject } from 'react';
import { createRef } from 'react';
import ReactDOM from 'react-dom';
import {AddData} from './addData';
import { mainPage } from './mainPage';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";
import { NavbarClass } from './Navbar';
import Footer from './Footer';
import { Category, Customer } from './common/commonClasses';


export class frontClass{

    private _customerRef:RefObject<AddData>;
    private _orderRef:RefObject<AddData>;
    private _navBarRef:RefObject<NavbarClass>;

    constructor()
    {
        this._customerRef=createRef<AddData>();
        this._orderRef=createRef<AddData>();
        this._navBarRef=createRef<NavbarClass>();
    }
    render():void{  
      ReactDOM.render(
        <React.StrictMode>
          <Router>
            <Route exact path="/" component={mainPage}/>
            <Route exact path="/inputData" render={()=> (
            <div>
              <AddData title={"Add Customer"} childProps={[{title:"Id",inputType:"number",errorMessage:"id exists/empty"},
                {title:"First Name",inputType:"string", errorMessage:"empty field"},
                {title:"Last Name",inputType:"string", errorMessage:"empty field"},
                {title:"Date of Birth",inputType:"date", errorMessage:"empty field"},
                {title:"Location",inputType:"string", errorMessage:"empty field"}]
              }  
              sendData={this.sendCustomerData}
              ref={this._customerRef}
              />
            <AddData title={"Add Order"} childProps={[{title:"id",inputType:"number",errorMessage:"id exists/empty"},
                {title:"Customer",inputType:"number",errorMessage:"wrong id"},
                {title:"model",inputType:"number",errorMessage:"empty field"},
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
      data.forEach((key,value)=>{
        console.log(key,value);
      })
    }
    sendOrderData(data:Map<string,string>):void{
        data.forEach((key,value)=>{
          console.log(key,value);
        })
      }
    updateIdOfCustomers(data:Set<number>):void{
        this._customerRef.current?.updateExist(0,data);
        this._orderRef.current?.updateExist(1,data);
    }
    updateIdOfOrders(data:Set<number>):void{
        this._customerRef.current?.updateExist(0,data);
    }
    updateCustomers(data:Array<Customer>):void{
      this._navBarRef.current?.updateCustomers(data);
    }
    updateCategories(data:Array<Category>):void{
      this._navBarRef.current?.updateCategories(data);
    }
    
  }

