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
import { IFrontHandler } from './common/commonInterfaces';
import { idType, SendType } from './common/enumTypes';
import styles from './styles/frontClass.module.css';


export class frontClass  {

    private _customerRef:RefObject<AddData>;
    private _orderRef:RefObject<AddData>;
    private _modelRef:RefObject<AddData>;
    private _catRef:RefObject<AddData>;
    private _dataBaseContr:IFrontHandler;

    constructor(dataBaseContr:IFrontHandler)
    {
        this._dataBaseContr=dataBaseContr;
        this._customerRef=createRef<AddData>();
        this._orderRef=createRef<AddData>();
        this._modelRef=createRef<AddData>();
        this._catRef=createRef<AddData>();
    }
    render():void{  
      ReactDOM.render(
        <React.StrictMode>
          <Router>
            <Route exact path="/" component={MainPage}/>
            <Route exact path="/inputData" render={()=> (
            <div className={styles.addData}>
              <div className={styles.addDataElements}>
              <AddData title={"Add Customer"} childProps={[{title:"ID",inputType:"number",errorMessage:"id exists/empty",type:idType.customer},
                {title:"First Name",inputType:"string", errorMessage:"empty field",type:idType.none},
                {title:"Last Name",inputType:"string", errorMessage:"empty field",type:idType.none},
                {title:"Date of Birth",inputType:"date", errorMessage:"empty field",type:idType.none},
                {title:"Location",inputType:"string", errorMessage:"empty field",type:idType.none}]
              }  
              dataBaseContr={this._dataBaseContr}  typeOfData={SendType.customer}
              ref={this._customerRef}
              />
            <AddData title={"Add Order"} childProps={[{title:"ID",inputType:"number",errorMessage:"id exists/empty",type:idType.order},
                {title:"Customer",inputType:"number",errorMessage:"id exists/empty",type:idType.customer},
                {title:"Model",inputType:"number",errorMessage:"id exists/empty",type:idType.model},
                {title:"Order Date",inputType:"date",errorMessage:"empty field",type:idType.none},
                {title:"Delivery Date",inputType:"date",errorMessage:"empty field",type:idType.none},
                {title:"Delivery",inputType:"string",errorMessage:"empty field",type:idType.none}]
                }
                dataBaseContr={this._dataBaseContr} typeOfData={SendType.order}
                ref={this._orderRef}
                />
              <AddData title={"Add Model"} childProps={[{title:"ID",inputType:"number",errorMessage:"id exists/empty",type:idType.model},
                {title:"Name",inputType:"string",errorMessage:"empty field",type:idType.none},
                {title:"Price",inputType:"number",errorMessage:"empty field",type:idType.none},
                {title:"Category",inputType:"number",errorMessage:"id exists/empty",type:idType.category},
                {title:"storage",inputType:"number",errorMessage:"empty field",type:idType.none}]
                }
                dataBaseContr={this._dataBaseContr} typeOfData={SendType.model}
                ref={this._modelRef}
              /> 
              <AddData title={"Add Category"} childProps={[{title:"ID",inputType:"number",errorMessage:"id exists/empty",type:idType.category},
                {title:"Name",inputType:"string",errorMessage:"empty field",type:idType.none}]
                }
                dataBaseContr={this._dataBaseContr} typeOfData={SendType.category}
                ref={this._catRef}
              />  
              </div>
              <Link to="/" className={styles.link}>return to main page</Link>
              </div>
            )}/>
            <Route exact path="/outputData" render={()=>(
              <div>
                <h1>output data</h1>
                <Link to="/">return to main page</Link>
              </div>
            )}/>
         </Router>
        </React.StrictMode>,
        document.getElementById('root')
      );
    }
    idCheck(result:Map<idType,boolean>, type:SendType):void{
      switch(type){
        case SendType.customer:
          this._customerRef.current?.idCheck(result);
          break;
        case SendType.order:
          this._orderRef.current?.idCheck(result);
          break;
        case SendType.model:
          this._modelRef.current?.idCheck(result);
          break;
        case SendType.category:
          this._catRef.current?.idCheck(result);
          break;
      }
    }
    
    // updateIdOfCustomers(data:Set<number>):void{
    //     this._customerRef.current?.updateExist(0,data);
    //     this._orderRef.current?.updateExist(1,data);
    //     console.log("updateIdOfCustomers was called");
    // }
    // updateIdOfOrders(data:Set<number>):void{
    //     this._orderRef.current?.updateExist(0,data);
    //     console.log("updateIdOfOrders was called");
    // }

    // updateIdOfModels(data: Set<number>): void{
    //   this._orderRef.current?.updateExist(2,data);
    //   this._modelRef.current?.updateExist(0,data);
    //   console.log("updateIdOfModels was called");
    // }
    // updateIdOfCategories(data:Set<number>):void{
    //   this._modelRef.current?.updateExist(3,data);
    //   this._catRef.current?.updateExist(0,data);
    // }
    
  }

