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
import { Category, Customer} from './common/commonClasses';
import { IDataBaseController, IView } from './common/commonInterfaces';
import { NotifyType, SendType } from './common/enumTypes';
import styles from './styles/frontClass.module.css'

export class frontClass implements IView  {

    private _customerRef:RefObject<AddData>;
    private _orderRef:RefObject<AddData>;
    private _navBarRef:RefObject<NavbarClass>;
    private _dataBaseContr:IDataBaseController;

    constructor(dataBaseContr:IDataBaseController)
    {
        this._dataBaseContr=dataBaseContr;
        this._customerRef=createRef<AddData>();
        this._orderRef=createRef<AddData>();
        this._navBarRef=createRef<NavbarClass>();
    }
    render():void{  
      ReactDOM.render(
        <React.StrictMode>
          <Router>
            <Route exact path="/" component={MainPage}/>
            <Route exact path="/inputData" render={()=> (
            <section className={styles.AddData}>
              <AddData title={"Add Customer"} childProps={[{title:"ID",inputType:"number",errorMessage:"id exists/empty"},
                {title:"First Name",inputType:"string", errorMessage:"empty field"},
                {title:"Last Name",inputType:"string", errorMessage:"empty field"},
                {title:"Date of Birth",inputType:"date", errorMessage:"empty field"},
                {title:"Location",inputType:"string", errorMessage:"empty field"}]
              }  
              dataBaseContr={this._dataBaseContr} listOfNotifies={[NotifyType.idOfCustomers]} typeOfData={SendType.customer}
              ref={this._customerRef}
              />
            <AddData title={"Add Order"} childProps={[{title:"ID",inputType:"number",errorMessage:"id exists/empty"},
                {title:"Customer",inputType:"number",errorMessage:"id exists/empty"},
                {title:"Model",inputType:"number",errorMessage:"id exists/empty"},
                {title:"Order Date",inputType:"date",errorMessage:"empty field"},
                {title:"Delivery Date",inputType:"date",errorMessage:"empty field"},
                {title:"Delivery",inputType:"string",errorMessage:"empty field"}]
                }
                dataBaseContr={this._dataBaseContr} typeOfData={SendType.order}
                listOfNotifies={[NotifyType.idOfOrders, NotifyType.idOfModels, NotifyType.idOfCustomers]}
                ref={this._orderRef}
                /> 
                <Link to="/">return to main page</Link>
              </section>
            )}/>
            <Route exact path="/outputData" render={()=>(
              <div>
                <NavbarClass ref={this._navBarRef} dataBaseContr={this._dataBaseContr}/>
                <Footer />
                <Link to="/">return to main page</Link>
              </div>
            )}/>
         </Router>
        </React.StrictMode>,
        document.getElementById('root')
      );
    }

    updateIdOfCustomers(data:Set<number>):void{
        this._customerRef.current?.updateExist(0,data);
        this._orderRef.current?.updateExist(1,data);
        console.log("updateIdOfCustomers was called");
    }
    updateIdOfOrders(data:Set<number>):void{
        this._orderRef.current?.updateExist(0,data);
        console.log("updateIdOfOrders was called");
    }

    updateIdOfModels(data: Set<number>): void{
      this._orderRef.current?.updateExist(2,data);
      console.log("updateIdOfModels was called");
    }

    updateCustomers(data:Array<Customer>):void{
      console.log("updateCustomers in frontClass is called",data.length);
      this._navBarRef.current?.updateCustomers(data);
    }
    
    updateCategories(data:Array<Category>):void{
      this._navBarRef.current?.updateCategories(data);
    }
    
  }

