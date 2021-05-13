/* eslint-disable no-mixed-operators */


import React, {Component,  RefObject} from 'react';
import { Customer, Order } from './common/commonClasses';
import { IDataBaseController } from './common/commonInterfaces';
import { NotifyType, SendType } from './common/enumTypes';
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
}

export interface InputState {
    isError:boolean;
    inputValue:string; 
}


export interface AddDataProps {
    childProps:Array<InputProps>;
    title:string;   
    dataBaseContr:IDataBaseController;
    listOfNotifies:Array<NotifyType>;
    typeOfData:SendType;
}

export interface AddDataState{
    displayAdd:boolean;
}

export class AddData extends Component<AddDataProps,AddDataState>{

    
    private _childElements:Array<RefObject<InputData>>;
    private _exist:Array<Set<number>>;

    constructor(props:AddDataProps){
        super(props)
        this.state={displayAdd:false}
        this.display=this.display.bind(this);
        this.checkData=this.checkData.bind(this);
        this.updateExist=this.updateExist.bind(this);
        //this.handleChange=this.handleChange.bind(this);
        this._childElements=[];
        this._exist=[];
        for (let i:number=0; i<this.props.childProps.length; ++i)
        {
            this._exist.push(new Set<number>());
            this._childElements.push(React.createRef<InputData>());
        }
    }

    componentDidMount(){
        this.props.dataBaseContr.notify(this.props.listOfNotifies);   
    }
    componentDidUpdate(){
        this.props.dataBaseContr.notify(this.props.listOfNotifies);
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
                    //onInputChange={this.handleChange}
                    ref={this._childElements[i]}
                    key={element.title}
                /> 
                ))}
                <button className={`${styles.addDataButton} ${styles.subButton}`} onClick={this.checkData}>submmit</button>
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
            if (this._exist[i].has(+(this._childElements[i].current?.state.inputValue || ""))
            || this._childElements[i].current?.state.inputValue==="")
            {
                isAccept=false;
                this._childElements[i].current?.displayError();
            }
            else
                this._childElements[i].current?.notDisplayError();
        }
        if (isAccept)
        {
            let output=new Map<string,string>();
            this._childElements.forEach((element)=>{
                output.set( element.current?.props.title || "",element.current?.state.inputValue || "");
            })
            this._childElements.forEach((element)=>{
                element.current?.clearInput();
            }); 
            this.sendData(output);

        }

    }
    updateExist(i:number,data:Set<number>):void{
        if (i>=this._exist.length)
            return;
        this._exist[i]=data;
        console.log(`data of ${this.props.title} was updated`);
    }
    private sendData(data:Map<string,string>):void{
        switch(this.props.typeOfData){
            case SendType.customer:
                this.props.dataBaseContr.notifyPushCustomer(new Customer(
                    +(data.get("ID") || 0),
                    data.get("First Name"), data.get("lastName"), data.get("Date of Birth"),data.get("Location")
                  ));
                  console.log("customer was send");
                break;
            case SendType.order:
                this.props.dataBaseContr.notifyPushOrder(new Order(
                    +(data.get("ID") || 0),
                    +(data.get("Customer") || 0), +(data.get("Model") || 0), data.get("Order Date"),data.get("Delivery Date"),
                  ));
                  console.log("order was send");
                  break;
        }
    }

}

 
export class InputData extends Component<InputProps,InputState>{

    
    constructor(props:InputProps,state:InputState){
        super(props)
        this.state=state;
        this.state={isError:false,inputValue:""};
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

}

