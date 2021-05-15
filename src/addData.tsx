/* eslint-disable no-mixed-operators */


import React, {Component,  RefObject} from 'react';
import { Category, Customer, Item, Order } from './common/commonClasses';
import { IFrontHandler } from './common/commonInterfaces';
import { idType,  SendType } from './common/enumTypes';
import styles from './styles/addDataElement.module.css'

// export interface InputPropsCallBack{
//     title:string;
//     inputType:string;
//     errorMessage:string;
//     inInputChange:(inputStr:string)=>void;
// }

export interface InputProps{
    title:string;
    inputType:string;
    errorMessage:string;
    type:idType
}

export interface InputState {
    isError:boolean;
    inputValue:string; 
    isDisabled:boolean;
}


export interface AddDataProps {
    childProps:Array<InputProps>;
    title:string;   
    dataBaseContr:IFrontHandler;
    typeOfData:SendType;
}

export interface AddDataState{
    displayAdd:boolean;
    isWait:boolean;
}

export class AddData extends Component<AddDataProps,AddDataState>{

    
    private _childElements:Array<RefObject<InputData>>;
    private _childElementsWithId:Map<idType,RefObject<InputData>>;

    constructor(props:AddDataProps){
        super(props)
        this.state={displayAdd:false, isWait:false}
        this.display=this.display.bind(this);
        this.checkData=this.checkData.bind(this);
        this._childElements=[];
        this._childElementsWithId=new Map();
        for (let i:number=0; i<this.props.childProps.length; ++i)
        {
            let ref=React.createRef<InputData>();
            this._childElements.push(ref);
            if (this.props.childProps[i].type!==idType.none)
                this._childElementsWithId.set(this.props.childProps[i].type,ref);
        }
    }

    componentDidMount(){
         
    }
    componentDidUpdate(){
        
    }

    render(){   
        return(
            <div className={styles.addDataElement}>
            <h1>{this.props.title} </h1>
            <button className={styles.addDataButton} onClick={this.display}>open fields</button>
            {this.state.displayAdd?
            <div className={styles.dataFields}>
                {this.props.childProps.map((element:InputProps,i) => (      
                <InputData title={element.title}
                    inputType={element.inputType}
                    errorMessage={element.errorMessage}
                    type={element.type}
                    ref={this._childElements[i]}
                    key={element.title}
                /> 
                ))}
                <button className={`${styles.addDataButton} ${styles.subButton}`} onClick={this.checkData}
                disabled={this.state.isWait?true:false}>submit</button>
                {this.state.isWait?<p>waiting</p>:null}
            </div>:
            null}   
            </div>
        );
    }
    
    display():void {
        this.setState({displayAdd:!this.state.displayAdd});
    }
    checkData():void{
        let isAccept:boolean=true;
        for (let i:number=0; i<this._childElements.length; ++i)
        {
            this._childElements[i].current?.notDisplayError();
            if (this._childElements[i].current?.state.inputValue==="")
            {
                isAccept=false;
                this._childElements[i].current?.displayError();
            }
            else
                this._childElements[i].current?.notDisplayError();
        }
        if (isAccept)
        {
            for (let i=0;i<this._childElements.length; ++i)
                this._childElements[i].current?.disable();
            this.setState({isWait:true});
            let output=new Map<string,string>();
            this._childElements.forEach((element)=>{
                output.set( element.current?.props.title || "",element.current?.state.inputValue || "");
            }) 
            this.sendData(output);

        }

    }

    idCheck(isIdAccepted:Map<idType,boolean>):void{
        let isAccept:boolean=true;
        isIdAccepted.forEach((value,key)=>{
            if (value===false)
            {
                isAccept=false;
                this._childElementsWithId.get(key)?.current?.displayError();
            }
        })
        if (isAccept)
            this._childElements.forEach((element)=>{
                element.current?.clearInput();
            });
        this.stopWaiting();
    }

    stopWaiting():void{
        this._childElements.forEach((el)=>{
            el.current?.notDisable();
        })
        this.setState({isWait:false});
    }

    private sendData(data:Map<string,string>):void{
        switch(this.props.typeOfData){
            case SendType.customer:
                this.props.dataBaseContr.notifyPushCustomer(new Customer(
                    +(data.get("ID") || 0),
                    data.get("First Name"), data.get("lastName"), data.get("Date of Birth"),data.get("Location")
                  ));
                break;
            case SendType.order:
                this.props.dataBaseContr.notifyPushOrder(new Order(
                    +(data.get("ID") || 0),
                    +(data.get("Customer") || 0), +(data.get("Model") || 0), data.get("Order Date"),data.get("Delivery Date"),
                  ));
                  break;
            case SendType.model:
                this.props.dataBaseContr.notifyPushModel(new Item(+(data.get("ID") || 0),
                data.get("Name"),+(data.get("Price") || 0),+(data.get("Category") || 0),
                +(data.get("Storage") || 0)
                ));
                break;
            case SendType.category:
                this.props.dataBaseContr.notifyPushCategory(new Category(+(data.get("ID") || 0),
                data.get("Name")
                ));
                break;
        }
    }

}

 
export class InputData extends Component<InputProps,InputState>{

    
    constructor(props:InputProps,state:InputState){
        super(props)
        this.state=state;
        this.state={isError:false,inputValue:"",isDisabled:false};
        this.handleChange=this.handleChange.bind(this);
        this.displayError=this.displayError.bind(this);
        this.notDisplayError=this.notDisplayError.bind(this);
        this.clearInput=this.clearInput.bind(this);
    }

    handleChange(e:React.FormEvent<HTMLInputElement>):void{
        this.setState({inputValue:e.currentTarget.value})
        //this.props.onInputChange(e.currentTarget.value);
    }

    componentDidMount(){
        this.handleChange=this.handleChange.bind(this);
        this.displayError=this.displayError.bind(this);
        this.notDisplayError=this.notDisplayError.bind(this);
        this.clearInput=this.clearInput.bind(this);
        console.log("component was mounted");
    }

    render(){
        return (
            <div className={styles.inputFields}>
            <div className={styles.inputInfo}>
                <h2>{this.props.title}</h2>
                {this.state.isError?<h2 className={styles.errorMes}>{this.props.errorMessage}</h2>:null}
            </div>
            <input  placeholder={"get "+this.props.title} type={this.props.inputType} value={this.state.inputValue}
                disabled={this.state.isDisabled?true: false}    
                className={`${styles.inputField}`} style={{borderColor:this.state.isError?'red':'black'}}
                onChange={this.handleChange}/>
            </div>)
    }
    displayError():void{
       this.setState({isError:true}); 
    }
    notDisplayError():void{
        this.setState({isError:false});
    }
    clearInput():void{
        this.setState({inputValue:""});
    }
    disable():void{
        this.setState({isDisabled:true});
    }
    notDisable():void{
        this.setState({isDisabled:false});
    }

}


